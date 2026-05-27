import type { Metadata } from 'next';
import { DynamicLink } from 'fumadocs-core/dynamic-link';
import { SylCodeBlock } from '@/lib/highlight-syl';
import { Reveal, CodeShowcase, type ShowcaseTab } from './page.client';

export const metadata: Metadata = {
  title: 'Syl',
  description:
    'Syl is a hardware description language with compile-time width, port, and driver checks.',
};

const examples = {
  driver: {
    file: 'arbiter.syl',
    code: `cell Arbiter(
    req_a: in Bit,
    req_b: in Bit,
) -> grant: Bit {
    grant := req_a
    grant := req_b
}`,
    diag: [
      { text: 'error[E_DRIVER_OVERLAP]: multiple drivers for signal \'grant\'', kind: 'error' },
      { text: '  ┌─ arbiter.syl:5:5', kind: 'path' },
      { text: '  │', kind: 'plain' },
      { text: '5 │   grant := req_a', kind: 'code' },
      { text: '  │   ----- first driver here', kind: 'hint' },
      { text: '6 │   grant := req_b', kind: 'code' },
      { text: '  │   ----- second driver here', kind: 'error' },
    ],
  },
  domain: {
    file: 'cross_domain.syl',
    code: `cell Sync<A: Domain, B: Domain>(
    clk_a: in Clock<A>,
    clk_b: in Clock<B>,
    d: in Bit,
) -> q: Bit {
    reg r1: Bit reset(clk_b, 0)
    next r1 := d

    reg r2: Bit reset(clk_a, 0)
    next r2 := r1
    q := r2
}`,
    diag: [
      { text: 'error[E_DOMAIN]: clock domain mismatch', kind: 'error' },
      { text: '  ┌─ cross_domain.syl:6:30', kind: 'path' },
      { text: '  │', kind: 'plain' },
      { text: '6 │   reg r1: Bit reset(clk_b, 0)', kind: 'code' },
      { text: '  │                        ^^^^^ domain B', kind: 'error' },
      { text: '7 │   next r1 := d', kind: 'code' },
      { text: '  │               ^ signal \'d\' belongs to domain A', kind: 'error' },
      { text: '  │', kind: 'plain' },
      { text: '  = use an explicit synchronizer primitive to cross domains', kind: 'hint' },
    ],
  },
  type: {
    file: 'mux.syl',
    code: `cell Mux4(
    sel: in UInt<2>,
    a: in UInt<8>,
    b: in UInt<8>,
    c: in UInt<8>,
    d: in UInt<16>,
) -> out: UInt<8> {
    out := select {
        sel eq 0 => a,
        sel eq 1 => b,
        sel eq 2 => c,
        default  => d,
    }
}`,
    diag: [
      { text: 'error[E_TYPE_MISMATCH]: branch type mismatch in select', kind: 'error' },
      { text: '  ┌─ mux.syl:12:21', kind: 'path' },
      { text: '  │', kind: 'plain' },
      { text: '12│         default  => d,', kind: 'code' },
      { text: '  │                     ^ expected UInt<8>, found UInt<16>', kind: 'error' },
      { text: '  │', kind: 'plain' },
      { text: '  = all branches must have the same type', kind: 'hint' },
    ],
  },
} as const;

const copy = {
  en: {
    tagline: 'Syl is hardware description with compile-time checks.',
    subtitle: 'The compiler catches width mismatches, driver conflicts, and clock domain violations before simulation.',
    cta: 'Get started',
    docs: 'Why Syl?',
    tabs: [
      {
        id: 'driver',
        label: 'Multi-driver',
        description:
          'Chisel silently resolves conflicts with last-connect semantics. Verilog gives you X in simulation. Syl rejects it at compile time.',
      },
      {
        id: 'domain',
        label: 'Clock domains',
        description:
          'Cross-domain bugs traditionally require expensive CDC tools. Syl encodes domains in the type system and catches violations statically.',
      },
      {
        id: 'type',
        label: 'Type safety',
        description:
          'Every branch in a select must agree on type and width. No silent truncation, no implicit extension.',
      },
    ] satisfies ShowcaseTab[],
    install: 'cargo install sylc',
    paths: [
      {
        label: 'I use Chisel / SpinalHDL / Verilog — what\'s different?',
        href: '/docs/migration/from-chisel',
      },
      {
        label: 'I\'m new — show me the language',
        href: '/docs/language',
      },
    ],
    footer: 'Syl is in early development. Standard library and some features are still being built.',
  },
  zh: {
    tagline: 'Syl 是自带编译期检查的硬件描述语言。',
    subtitle: '编译器在仿真之前捕获位宽不匹配、驱动冲突和跨时钟域违规。',
    cta: '开始使用',
    docs: '为什么选 Syl？',
    tabs: [
      {
        id: 'driver',
        label: '多驱动冲突',
        description:
          'Chisel 用 last-connect 语义静默覆盖冲突。Verilog 在仿真时给你 X。Syl 在编译期直接拒绝。',
      },
      {
        id: 'domain',
        label: '时钟域',
        description:
          '跨域 bug 传统上需要昂贵的 CDC 工具。Syl 把域编码进类型系统，静态捕获违规。',
      },
      {
        id: 'type',
        label: '类型安全',
        description:
          'select 的每个分支必须类型和位宽一致。没有静默截断，没有隐式扩展。',
      },
    ] satisfies ShowcaseTab[],
    install: 'cargo install sylc',
    paths: [
      {
        label: '我用 Chisel / SpinalHDL / Verilog — 有什么不同？',
        href: '/zh/docs/migration/from-chisel',
      },
      {
        label: '我是新用户 — 带我看语言',
        href: '/zh/docs/language',
      },
    ],
    footer: 'Syl 处于早期开发阶段。标准库和部分功能仍在实现中。',
  },
} as const;

function SylLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="10" fill="#1b5e20" />
      <path d="M8 12h10l4-4h22" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.3" />
      <path d="M8 36h6l2 2h28" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.3" />
      <path d="M30 8v10l-4 4v22" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.3" />
      <circle cx="8" cy="12" r="1.5" fill="#fff" fillOpacity="0.4" />
      <circle cx="8" cy="36" r="1.5" fill="#fff" fillOpacity="0.4" />
      <circle cx="30" cy="8" r="1.5" fill="#fff" fillOpacity="0.4" />
      <path d="M26 4L12 26h10l-4 18 16-22h-10l4-18z" fill="#fff" />
    </svg>
  );
}

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const t = lang === 'zh' ? copy.zh : copy.en;
  const isChinese = lang === 'zh';


  return (
    <main className="relative flex w-full flex-1 flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_20%_15%,rgba(27,94,32,0.12),transparent_42%),radial-gradient(circle_at_85%_25%,rgba(59,130,246,0.07),transparent_32%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 pt-14 sm:pt-20">
        {/* Hero */}
        <section className="flex flex-col items-center text-center">
          <SylLogo className="mb-6 h-16 w-16" />
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          {t.tagline}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-fd-muted-foreground sm:text-lg">
          {t.subtitle}
        </p>
        <div className="mt-8">
          <DynamicLink
            href={isChinese ? '/zh/docs' : '/docs'}
            className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-6 py-2.5 text-sm font-medium text-fd-primary-foreground shadow-sm transition-all hover:brightness-110"
          >
            {t.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </DynamicLink>
        </div>
      </section>

      {/* Code showcase with tabs */}
      <Reveal className="mt-16 sm:mt-20">
        <CodeShowcase tabs={t.tabs as unknown as ShowcaseTab[]}>
          {(['driver', 'domain', 'type'] as const).map((key) => (
            <ExamplePanel key={key} example={examples[key]} />
          ))}
        </CodeShowcase>
      </Reveal>

      {/* Install + next steps */}
      <Reveal delay={120} className="mt-20">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Install */}
          <div className="overflow-hidden rounded-lg border bg-fd-card">
            <div className="flex items-center gap-2 border-b px-4 py-2">
              <span className="text-xs font-medium text-fd-muted-foreground">Terminal</span>
            </div>
            <div className="flex flex-col justify-between gap-2 p-4 sm:flex-row sm:items-center">
              <code className="text-sm font-mono text-fd-foreground">{t.install}</code>
              <span className="text-xs text-fd-muted-foreground">Requires Rust toolchain</span>
            </div>
          </div>
          {/* Paths */}
          <div className="flex flex-col gap-3">
            {t.paths.map((p) => (
              <DynamicLink
                key={p.href}
                href={p.href}
                className="group flex flex-1 items-center gap-3 rounded-lg border bg-fd-card px-4 py-3 text-sm transition-all hover:bg-fd-accent"
              >
                <span className="flex-1">{p.label}</span>
                <svg className="h-4 w-4 shrink-0 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </DynamicLink>
            ))}
          </div>
        </div>
      </Reveal>

      <footer className="mt-20 border-t pt-8 pb-2 text-center text-xs text-fd-muted-foreground/50">
        {t.footer}
      </footer>
      </div>
    </main>
  );
}

async function ExamplePanel({
  example,
}: {
  example: (typeof examples)[keyof typeof examples];
}) {
  return (
    <div className="grid lg:grid-cols-2">
      {/* Source */}
      <div className="min-h-[280px] border-b lg:border-b-0 lg:border-r">
        <div className="flex items-center border-b px-4 py-2">
          <span className="text-xs font-medium text-fd-muted-foreground">
            {example.file}
          </span>
        </div>
        <SylCodeBlock code={example.code} />
      </div>
      {/* Diagnostic */}
      <div className="min-h-[280px] bg-fd-secondary/30">
        <div className="flex items-center border-b px-4 py-2">
          <span className="text-xs font-medium text-fd-muted-foreground">
            sylc
          </span>
        </div>
        <pre className="overflow-x-auto p-4 text-[13px] leading-6 font-mono">
          {example.diag.map((line, i) => (
            <DiagLine key={i} text={line.text} kind={line.kind} />
          ))}
        </pre>
      </div>
    </div>
  );
}

function DiagLine({ text, kind }: { text: string; kind: string }) {
  const color: Record<string, string> = {
    error: 'text-red-500 dark:text-red-400',
    hint: 'text-fd-muted-foreground',
    path: 'text-cyan-600 dark:text-cyan-400',
    code: 'text-fd-foreground',
    plain: 'text-fd-muted-foreground/60',
  };
  return (
    <span className={`block ${color[kind] ?? 'text-fd-muted-foreground'}`}>
      {text}
      {'\n'}
    </span>
  );
}
