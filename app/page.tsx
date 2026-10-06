"use client";

import { useEffect, useState } from "react";

type Category = "all" | "System Design" | "DSA" | "Databases";

const articles = [
  {
    category: "System Design",
    level: "Intermediate",
    levelClass: "bg-primary-fixed text-on-primary-fixed-variant",
    title: "Designing a URL Shortener",
    desc: "Detailed breakdown of Base62 encoding, distributed token generation servers, Redis cache eviction strategies, and high-throughput write scaling.",
    date: "Oct 24, 2024",
    read: "8 min read",
    tag: "Mermaid Spec",
    tagClass: "text-accent-link",
  },
  {
    category: "DSA",
    level: "Intermediate",
    levelClass: "bg-primary-fixed text-on-primary-fixed-variant",
    title: "Binary Search: Beyond the Basics",
    desc: "Translating discrete monotonicity predicates into clean interval searches without edge-case off-by-one errors or integer overflow bugs.",
    date: "Oct 21, 2024",
    read: "10 min read",
    tag: "O(log n)",
    tagClass: "text-accent-link",
  },
  {
    category: "Databases",
    level: "Beginner",
    levelClass: "bg-[#dcfce7] text-on-primary-fixed-variant",
    title: "SQL vs NoSQL: The Pragmatic Guide",
    desc: "De-mystifying the CAP theorem and making objective structural trade-offs between strict relational schemas and document stores.",
    date: "Oct 18, 2024",
    read: "12 min read",
    tag: "",
    tagClass: "",
  },
  {
    category: "System Design",
    level: "Advanced",
    levelClass: "bg-[#f3e8ff] text-on-primary-fixed-variant",
    title: "Load Balancing: Algorithms & Trade-offs",
    desc: "Evaluating Maglev hashing, power-of-two-random-choices, weighted least connections, and graceful degradation during network partitions.",
    date: "Oct 14, 2024",
    read: "15 min read",
    tag: "",
    tagClass: "",
  },
  {
    category: "DSA",
    level: "Advanced",
    levelClass: "bg-[#f3e8ff] text-on-primary-fixed-variant",
    title: "Dynamic Programming States",
    desc: "A methodical system for identifying optimal substructure, crafting irreducible state tuples, and reducing space complexity via rolling arrays.",
    date: "Oct 10, 2024",
    read: "14 min read",
    tag: "O(n²)",
    tagClass: "text-accent-link",
  },
  {
    category: "Databases",
    level: "Advanced",
    levelClass: "bg-[#f3e8ff] text-on-primary-fixed-variant",
    title: "How B-Tree Indexing Works",
    desc: "Deep dive into node page splits, fill factors, leaf linked-lists, and why B+ trees dominate traditional rotational and flash memory architectures.",
    date: "Oct 05, 2024",
    read: "11 min read",
    tag: "",
    tagClass: "",
  },
];

const searchIndex = [
  {
    icon: "hub",
    title: "Designing a URL Shortener",
    sub: "System Design • Distributed ID Generation",
    meta: "8 min read",
  },
  {
    icon: "code",
    title: "Binary Search: Beyond the Basics",
    sub: "DSA • Monotonic Predicates • O(log n)",
    meta: "10 min read",
  },
  {
    icon: "database",
    title: "How B-Tree Indexing Works",
    sub: "Databases • Page Splits • Flash Storage",
    meta: "11 min read",
  },
];

export default function Home() {
  const [category, setCategory] = useState<Category>("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered =
    category === "all"
      ? articles
      : articles.filter((a) => a.category === category);

  const searchResults = searchIndex.filter((s) =>
    `${s.title} ${s.sub}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 bg-surface text-text-primary">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-glass-bg backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-11 max-w-[1024px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-space-xs text-text-primary hover:opacity-75 transition-opacity"
          >
            <span className="material-symbols-outlined text-[20px]">
              deployed_code
            </span>
            <span className="font-label-eyebrow text-label-eyebrow tracking-tight hidden sm:inline-block">
              Systems &amp; Algorithms
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-space-lg">
            <a
              href="#"
              className="text-text-primary font-label-eyebrow text-label-eyebrow"
            >
              Home
            </a>
            {["System Design", "DSA", "Databases", "Topics", "About"].map(
              (l) => (
                <a
                  key={l}
                  href="#articles"
                  className="font-label-eyebrow text-label-eyebrow text-text-secondary hover:text-text-primary transition-colors"
                >
                  {l}
                </a>
              )
            )}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-haspopup="dialog"
              className="flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-alt rounded-full text-text-secondary hover:text-text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">
                search
              </span>
              <span className="font-label-caption text-label-caption text-text-tertiary hidden sm:inline">
                ⌘K
              </span>
            </button>
            <button
              aria-label="Toggle appearance"
              type="button"
              className="icon-btn"
            >
              <span className="material-symbols-outlined text-[18px]">
                light_mode
              </span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-11 bg-surface">
        <div className="flex flex-col w-full">
          {/* Hero */}
          <section className="w-full py-20 md:py-28 flex flex-col items-center justify-center text-center px-margin md:px-margin-tablet relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-alt mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label-eyebrow text-label-eyebrow normal-case tracking-normal text-text-secondary">
                Engineering Chronicles · Fall 2024 edition
              </span>
            </div>
            <h1 className="font-hero text-[36px] leading-[40px] md:text-hero tracking-tight text-text-primary max-w-4xl mx-auto">
              Think in systems.
            </h1>
            <p className="font-body-lead text-body-lead text-text-secondary max-w-2xl mx-auto mt-4 mb-8">
              Deep technical dives into distributed architectures, algorithmic
              rigor, and database internals.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href="#articles" className="btn-primary w-full sm:w-auto">
                Start reading ›
              </a>
              <a
                href="#articles"
                className="font-body-sm text-body-sm font-medium text-accent-link hover:underline inline-flex items-center gap-1 group"
              >
                <span>Browse topics</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  ›
                </span>
              </a>
            </div>
            <div className="mt-16 pt-8 w-full max-w-3xl grid grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <span className="font-headline-card text-[22px] md:text-headline-card text-text-primary">
                  99.999%
                </span>
                <span className="font-label-caption text-label-caption text-text-tertiary mt-1">
                  Consensus Target
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-headline-card text-[22px] md:text-headline-card text-text-primary">
                  O(log n)
                </span>
                <span className="font-label-caption text-label-caption text-text-tertiary mt-1">
                  Theoretical Bound
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-headline-card text-[22px] md:text-headline-card text-text-primary">
                  &lt;1.2ms
                </span>
                <span className="font-label-caption text-label-caption text-text-tertiary mt-1">
                  LSM MemTable Sync
                </span>
              </div>
            </div>
          </section>

          {/* Tile 1: System Design */}
          <section className="w-full bg-surface-pure py-20 px-margin md:px-margin-tablet lg:px-margin-desktop my-3">
            <div className="max-w-[1024px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col items-start text-left">
                <span className="font-label-eyebrow text-label-eyebrow tracking-widest text-text-tertiary uppercase mb-2">
                  SYSTEM DESIGN
                </span>
                <h2 className="font-headline-section text-[28px] leading-[32px] md:text-headline-section text-text-primary tracking-tight mb-4">
                  Distributed Systems. Uncompromised.
                </h2>
                <p className="font-body-default text-body-default text-text-secondary mb-8">
                  From consensus algorithms and Paxos variations to
                  multi-region fault tolerance, zero-downtime replication
                  pipelines, and raft cluster consensus state machines.
                </p>
                <div className="flex items-center gap-6">
                  <a
                    href="#articles"
                    className="font-body-sm text-body-sm font-medium text-accent-link hover:underline inline-flex items-center gap-1 group"
                  >
                    <span>Explore System Design</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      ›
                    </span>
                  </a>
                  <a
                    href="#articles"
                    className="font-body-sm text-body-sm font-medium text-accent-link hover:underline inline-flex items-center gap-1 group"
                  >
                    <span>Read URL Shortener post</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      ›
                    </span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-7 w-full bg-surface-alt rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-error inline-block" />
                    <span className="w-3 h-3 rounded-full bg-tertiary inline-block" />
                    <span className="w-3 h-3 rounded-full bg-primary inline-block" />
                    <span className="font-code-inline text-label-caption text-text-tertiary ml-2">
                      raft-cluster-topology.spec
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface text-text-secondary font-label-caption text-label-caption">
                    Active Quorum (3/5)
                  </span>
                </div>
                <div className="w-full bg-surface-pure rounded-xl p-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-accent-link">
                        <span className="material-symbols-outlined text-[20px]">
                          router
                        </span>
                      </div>
                      <div>
                        <div className="font-label-eyebrow text-label-eyebrow text-text-primary">
                          Ingress / Anycast L4 Proxy
                        </div>
                        <div className="font-label-caption text-label-caption text-text-tertiary">
                          BGP Anycast Routing • 80 Gbps
                        </div>
                      </div>
                    </div>
                    <span className="font-code-inline text-label-caption text-accent-link">
                      p99: 0.38ms
                    </span>
                  </div>
                  <div className="w-full flex items-center justify-center py-1">
                    <div className="w-px h-6 bg-surface-variant relative flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-text-tertiary">
                        south
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-surface-alt flex flex-col items-center text-center">
                      <span className="material-symbols-outlined text-accent-link text-[20px]">
                        dns
                      </span>
                      <span className="font-label-caption text-label-caption font-medium text-text-primary mt-1">
                        Leader (Node 01)
                      </span>
                      <span className="font-label-caption text-[11px] text-text-tertiary">
                        Term #42 • Lease OK
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-alt flex flex-col items-center text-center">
                      <span className="material-symbols-outlined text-text-secondary text-[20px]">
                        storage
                      </span>
                      <span className="font-label-caption text-label-caption font-medium text-text-primary mt-1">
                        Replica (Node 02)
                      </span>
                      <span className="font-label-caption text-[11px] text-text-tertiary">
                        Lag: 4 entries
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-alt flex flex-col items-center text-center">
                      <span className="material-symbols-outlined text-text-secondary text-[20px]">
                        storage
                      </span>
                      <span className="font-label-caption text-label-caption font-medium text-text-primary mt-1">
                        Replica (Node 03)
                      </span>
                      <span className="font-label-caption text-[11px] text-text-tertiary">
                        Lag: 0 entries
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tile 2: DSA dark */}
          <section className="w-full bg-surface-dark text-on-primary py-20 px-margin md:px-margin-tablet lg:px-margin-desktop my-3">
            <div className="max-w-[1024px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col items-start text-left">
                <span className="font-label-eyebrow text-label-eyebrow tracking-widest text-accent-link-dark uppercase mb-2">
                  DSA
                </span>
                <h2 className="font-headline-section text-[28px] leading-[32px] md:text-headline-section text-on-primary tracking-tight mb-4">
                  Algorithmic Precision.
                </h2>
                <p className="font-body-default text-body-default text-text-tertiary mb-8">
                  Master complex bounds, dynamic programming state vectors, and
                  asymptotic amortized proofs with crystal-clear mathematical
                  proofs.
                </p>
                <div className="flex items-center gap-6">
                  <a
                    href="#articles"
                    className="font-body-sm text-body-sm font-medium text-accent-link-dark hover:underline inline-flex items-center gap-1 group"
                  >
                    <span>Explore DSA</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      ›
                    </span>
                  </a>
                  <a
                    href="#articles"
                    className="font-body-sm text-body-sm font-medium text-accent-link-dark hover:underline inline-flex items-center gap-1 group"
                  >
                    <span>Read Binary Search Deep Dive</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      ›
                    </span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-7 w-full bg-[#161617] rounded-2xl p-6 md:p-8 shadow-xl">
                <div className="flex items-center justify-between pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34c759]" />
                    <span className="font-code-inline text-label-caption text-text-tertiary">
                      binary_search_predicate.rs
                    </span>
                  </div>
                  <span className="font-code-inline text-label-caption px-2 py-0.5 rounded-full bg-[#242426] text-accent-link-dark">
                    O(log n) Time • O(1) Aux
                  </span>
                </div>
                <div className="font-code-inline text-code-inline text-[#e4e2e4] leading-relaxed bg-[#0b0b0c] p-5 rounded-xl overflow-x-auto">
                  <p>
                    <span className="text-[#ff7b72]">pub fn</span>{" "}
                    <span className="text-[#79c0ff]">partition_point</span>
                    {"<"}
                    <span className="text-[#79c0ff]">P</span>
                    {">("}
                    <span className="text-[#ff7b72]">mut</span> left:{" "}
                    <span className="text-[#79c0ff]">usize</span>,{" "}
                    <span className="text-[#ff7b72]">mut</span> right:{" "}
                    <span className="text-[#79c0ff]">usize</span>,{" "}
                    <span className="text-[#ff7b72]">mut</span> pred:{" "}
                    <span className="text-[#79c0ff]">P</span>) -&gt;{" "}
                    <span className="text-[#79c0ff]">usize</span>
                  </p>
                  <p className="text-text-tertiary">
                    {"  "}where <span className="text-[#79c0ff]">P</span>:{" "}
                    <span className="text-[#79c0ff]">FnMut</span>(
                    <span className="text-[#79c0ff]">usize</span>) -&gt;{" "}
                    <span className="text-[#79c0ff]">bool</span>,
                  </p>
                  <p>{"{"}</p>
                  <p>
                    {"  "}
                    <span className="text-[#ff7b72]">while</span> left &lt;
                    right {"{"}
                  </p>
                  <p>
                    {"    "}
                    <span className="text-[#ff7b72]">let</span> mid = left +
                    (right - left) / <span className="text-[#79c0ff]">2</span>;{" "}
                    <span className="text-text-tertiary">
                      {"// Overflow-safe"}
                    </span>
                  </p>
                  <p>
                    {"    "}
                    <span className="text-[#ff7b72]">if</span> pred(mid) {"{"}
                  </p>
                  <p>
                    {"      "}left = mid +{" "}
                    <span className="text-[#79c0ff]">1</span>;
                  </p>
                  <p>
                    {"    "} <span className="text-[#ff7b72]">else</span> {"{"}
                  </p>
                  <p>{"      "}right = mid;</p>
                  <p>{"    }"}</p>
                  <p>{"  }"}</p>
                  <p>{"  "}left</p>
                  <p>{"}"}</p>
                </div>
                <div className="mt-4 flex items-center justify-between text-label-caption text-text-tertiary">
                  <span>Invariant: ∀i &lt; left: pred(i) == true</span>
                  <span className="text-accent-link-dark flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      verified
                    </span>{" "}
                    Verified Zero-Copy
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Tile 3: Databases */}
          <section className="w-full bg-surface-alt py-20 px-margin md:px-margin-tablet lg:px-margin-desktop my-3">
            <div className="max-w-[1024px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col items-start text-left">
                <span className="font-label-eyebrow text-label-eyebrow tracking-widest text-text-tertiary uppercase mb-2">
                  DATABASES
                </span>
                <h2 className="font-headline-section text-[28px] leading-[32px] md:text-headline-section text-text-primary tracking-tight mb-4">
                  Storage Engines Decoded.
                </h2>
                <p className="font-body-default text-body-default text-text-secondary mb-8">
                  LSM-trees, B+ Trees, Write-Ahead Logging (WAL),
                  memory-mapped segments, and distributed ACID isolation
                  guarantees.
                </p>
                <div className="flex items-center gap-6">
                  <a
                    href="#articles"
                    className="font-body-sm text-body-sm font-medium text-accent-link hover:underline inline-flex items-center gap-1 group"
                  >
                    <span>Explore Databases</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      ›
                    </span>
                  </a>
                  <a
                    href="#articles"
                    className="font-body-sm text-body-sm font-medium text-accent-link hover:underline inline-flex items-center gap-1 group"
                  >
                    <span>Read SQL vs NoSQL</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      ›
                    </span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-7 w-full bg-surface-pure rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-6">
                  <span className="font-label-eyebrow text-label-eyebrow normal-case text-text-primary font-medium tracking-normal">
                    LSM-Tree Flush Hierarchy
                  </span>
                  <span className="font-label-caption text-label-caption text-text-tertiary">
                    Sequential Disk I/O
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-surface-alt flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-button-primary" />
                      <div>
                        <p className="font-body-sm text-body-sm font-medium text-text-primary">
                          RAM: Active MemTable (Skiplist)
                        </p>
                        <p className="font-label-caption text-label-caption text-text-tertiary">
                          Concurrent lock-free skiplist • In-memory volatile
                        </p>
                      </div>
                    </div>
                    <span className="font-code-inline text-label-caption text-text-primary font-medium">
                      32 MB
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-alt flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
                      <div>
                        <p className="font-body-sm text-body-sm font-medium text-text-primary">
                          Level 0: Immutable SSTables
                        </p>
                        <p className="font-label-caption text-label-caption text-text-tertiary">
                          Key ranges overlap • Bloom Filter assisted lookups
                        </p>
                      </div>
                    </div>
                    <span className="font-code-inline text-label-caption text-text-primary font-medium">
                      128 MB
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-alt flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-text-tertiary" />
                      <div>
                        <p className="font-body-sm text-body-sm font-medium text-text-primary">
                          Level 1: Compacted Tier
                        </p>
                        <p className="font-label-caption text-label-caption text-text-tertiary">
                          Strict non-overlapping partitioned ranges
                        </p>
                      </div>
                    </div>
                    <span className="font-code-inline text-label-caption text-text-primary font-medium">
                      1.2 GB
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Articles */}
          <section
            id="articles"
            className="w-full py-20 px-margin md:px-margin-tablet lg:px-margin-desktop max-w-[1024px] mx-auto"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="font-headline-section text-[28px] leading-[32px] md:text-headline-section text-text-primary tracking-tight">
                  Latest Articles.
                </h2>
                <p className="font-body-default text-body-default text-text-secondary mt-1">
                  Fresh insights from our engineering workbench.
                </p>
              </div>
              <div className="mt-6 md:mt-0 flex items-center gap-2 p-1 bg-surface-alt rounded-full overflow-x-auto">
                {(
                  ["all", "System Design", "DSA", "Databases"] as Category[]
                ).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={`btn-filter ${
                      category === c
                        ? "bg-text-primary text-on-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {c === "all" ? "All" : c}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a) => (
                <article
                  key={a.title}
                  className="flex flex-col justify-between bg-surface-pure rounded-[24px] p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-surface-alt text-text-secondary font-label-caption text-[11px] font-medium uppercase tracking-wider">
                        {a.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full font-label-caption text-[11px] font-medium ${a.levelClass}`}
                      >
                        {a.level}
                      </span>
                    </div>
                    <h3 className="font-headline-card text-[22px] leading-[26px] md:text-headline-card text-text-primary tracking-tight mb-2">
                      {a.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-text-secondary line-clamp-3 mb-6">
                      {a.desc}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-label-caption text-text-tertiary mb-4 flex-wrap">
                      <span>{a.date}</span>
                      <span>•</span>
                      <span>{a.read}</span>
                      {a.tag ? (
                        <>
                          <span>•</span>
                          <span
                            className={`font-code-inline ${a.tagClass}`}
                          >
                            {a.tag}
                          </span>
                        </>
                      ) : null}
                    </div>
                    <a
                      href="#"
                      className="font-body-sm text-body-sm font-medium text-accent-link hover:underline inline-flex items-center gap-1 group"
                    >
                      <span>Read essay</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        ›
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Newsletter */}
          <section className="w-full bg-surface-alt py-20 px-margin md:px-margin-tablet lg:px-margin-desktop my-6">
            <div className="max-w-[720px] mx-auto text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-surface-pure flex items-center justify-center text-accent-link shadow-sm mb-6">
                <span className="material-symbols-outlined text-[24px]">
                  mark_email_read
                </span>
              </div>
              <h2 className="font-headline-section text-[28px] leading-[32px] md:text-headline-section text-text-primary tracking-tight mb-3">
                Delivered to your terminal.
              </h2>
              <p className="font-body-default text-body-default text-text-secondary max-w-lg mb-8">
                No promotional noise. One comprehensive engineering deep dive
                every alternate Tuesday morning.
              </p>
              <form
                className="w-full max-w-md flex flex-col sm:flex-row items-center gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
              >
                <input
                  required
                  type="email"
                  placeholder="your.email@organization.com"
                  className="w-full px-5 py-3 rounded-full bg-surface-pure text-text-primary font-body-sm text-body-sm placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                />
                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              {subscribed && (
                <div className="mt-4 text-accent-link font-body-sm text-body-sm">
                  Welcome aboard. The first technical memo is on its way.
                </div>
              )}
              <span className="font-label-caption text-label-caption text-text-tertiary mt-4">
                Unsubscribe at any time with one-click header tokens.
              </span>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-alt py-10">
        <div className="max-w-[1024px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter-desktop pb-8">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-eyebrow text-label-eyebrow text-text-primary">
                Topics
              </span>
              {[
                "System Design",
                "Data Structures",
                "Algorithms",
                "Distributed DBs",
                "Storage Engines",
              ].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="font-label-caption text-label-caption text-text-secondary hover:text-text-primary transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-eyebrow text-label-eyebrow text-text-primary">
                Resources
              </span>
              {[
                "Interactive Diagrams",
                "Complexity Cheat Sheet",
                "Roadmaps",
                "RSS Feed",
              ].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="font-label-caption text-label-caption text-text-secondary hover:text-text-primary transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-eyebrow text-label-eyebrow text-text-primary">
                Architecture
              </span>
              {["MDX Pipeline", "Zero-Code Config", "Next.js"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="font-label-caption text-label-caption text-text-secondary hover:text-text-primary transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-eyebrow text-label-eyebrow text-text-primary">
                About
              </span>
              {["Philosophy", "Author", "GitHub", "Privacy"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="font-label-caption text-label-caption text-text-secondary hover:text-text-primary transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-caption text-label-caption text-text-tertiary">
            <p>Copyright © 2025 Systems &amp; Code Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-text-primary transition-colors">
                Privacy Policy
              </a>
              <span className="text-text-tertiary">|</span>
              <a href="#" className="hover:text-text-primary transition-colors">
                Terms of Use
              </a>
              <span className="text-text-tertiary">|</span>
              <a href="#" className="hover:text-text-primary transition-colors">
                Legal
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Search modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-start justify-center pt-24 px-4">
          <div className="w-full max-w-2xl bg-surface-pure rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center px-4 py-3 bg-surface-alt">
              <span className="material-symbols-outlined text-text-tertiary mr-3 text-[20px]">
                search
              </span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search topics, algorithms, or papers... (ESC to close)"
                type="text"
                className="w-full bg-transparent text-text-primary font-body-default text-body-default focus:outline-none placeholder:text-text-tertiary"
              />
              <button
                aria-label="Close search"
                className="icon-btn"
                onClick={() => setSearchOpen(false)}
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>
            <div className="max-h-[360px] overflow-y-auto p-4 space-y-2">
              {searchResults.map((r) => (
                <a
                  key={r.title}
                  href="#articles"
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-alt transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-text-secondary text-[20px]">
                      {r.icon}
                    </span>
                    <div>
                      <p className="font-body-sm text-body-sm font-medium text-text-primary group-hover:text-accent-link">
                        {r.title}
                      </p>
                      <p className="font-label-caption text-label-caption text-text-tertiary">
                        {r.sub}
                      </p>
                    </div>
                  </div>
                  <span className="font-label-caption text-label-caption text-text-tertiary">
                    {r.meta}
                  </span>
                </a>
              ))}
              {searchResults.length === 0 && (
                <p className="p-4 font-body-sm text-body-sm text-text-tertiary text-center">
                  No results for “{query}”
                </p>
              )}
            </div>
            <div className="p-3 bg-surface-alt flex items-center justify-between text-label-caption text-text-tertiary">
              <span>
                Navigation:{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-surface shadow-sm font-code-inline">
                  ↑
                </kbd>{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-surface shadow-sm font-code-inline">
                  ↓
                </kbd>{" "}
                to navigate
              </span>
              <span>
                Select:{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-surface shadow-sm font-code-inline">
                  ↵
                </kbd>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
