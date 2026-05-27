import type { Metadata } from 'next';
import { DynamicLink } from 'fumadocs-core/dynamic-link';
import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';
import {
  AnimatedTerminal,
  RevealGroup,
  CircuitLines,
} from './page.client';

export const metadata: Metadata = {
  title: 'Syl',
  description:
    'Syl is a hardware description language. Write digital logic, the compiler checks types and connections at compile time, outputs SystemVerilog.',
};

const copy = {
  en: {
    subtitle: 'Hardware description language with compile-time checks.',
    intro:
      'Syl is a hardware description language built for static analyzability. You write digital logic, the compiler checks widths, ports, and drivers before simulation. Output is standard SystemVerilog.',
    cta: 'Get started',
    ctaSecondary: 'Quick start',
    codePanelTitle: 'counter.syl',
    code: `cell Counter<W: Nat = 16, D: Domain>(
    clk: in Clock<D>,
    rst: in Reset<D>,
    enable: in Bit,
) -> value: UInt<W> {
    reg count: UInt<W> reset(rst, 0)

    signal count_next: UInt<W> :=
        select {
            enable => count + 1,
            default => count,
        }

    next count := count_next
    value := count
}`,
    features: [
      {
        title: 'Compile-time checks',
        body: 'Width mismatches, unconnected ports, multi-driver conflicts — caught before simulation.',
      },
      {
        title: 'Standard output',
        body: 'Syl emits SystemVerilog. The same simulators and synthesis tools still work.',
      },
      {
        title: 'One tool, no runtime',
        body: 'Install sylc via cargo. No JVM, no Scala, no host language runtime.',
      },
    ],
    paths: [
      {
        title: 'Try the compiler',
        body: 'Install sylc, compile the example designs, see the SystemVerilog output.',
        href: '/docs',
        cta: 'Quick start',
      },
      {
        title: 'What is Syl?',
        body: 'Read the overview and how Syl differs from Verilog, Chisel, and SpinalHDL.',
        href: '/docs/introduction/what-is-syl',
        cta: 'Read overview',
      },
      {
        title: 'Reference',
        body: 'CLI flags, type system, grammar, and diagnostic codes.',
        href: '/docs/reference/cli',
        cta: 'Browse reference',
      },
    ],
    footer: 'Syl is in early development. Standard library and some features are still being built.',
  },
  zh: {
    subtitle: '硬件描述语言，编译期检查。',
    intro:
      'Syl 是一门面向静态可分析性的硬件描述语言。你用 Syl 写数字电路，编译器在编译期检查位宽、端口和驱动是否匹配。输出标准 SystemVerilog，接入现有流程。',
    cta: '开始使用',
    ctaSecondary: '快速开始',
    codePanelTitle: 'counter.syl',
    code: `cell Counter<W: Nat = 16, D: Domain>(
    clk: in Clock<D>,
    rst: in Reset<D>,
    enable: in Bit,
) -> value: UInt<W> {
    reg count: UInt<W> reset(rst, 0)

    signal count_next: UInt<W> :=
        select {
            enable => count + 1,
            default => count,
        }

    next count := count_next
    value := count
}`,
    features: [
      {
        title: '编译期检查',
        body: '位宽不匹配、端口未连接、多驱动冲突——在仿真之前就被编译器捕获。',
      },
      {
        title: '输出标准格式',
        body: 'Syl 生成 SystemVerilog。现有的仿真和综合工具可以继续使用。',
      },
      {
        title: '单一工具，零运行时',
        body: '通过 cargo 安装 sylc。不需要 JVM、不需要 Scala。',
      },
    ],
    paths: [
      {
        title: '试用编译器',
        body: '安装 sylc，编译内附的示例设计，查看输出的 SystemVerilog。',
        href: '/zh/docs',
        cta: '快速开始',
      },
      {
        title: '理解 Syl',
        body: '阅读语言总览，了解 Syl 和 Verilog、Chisel、SpinalHDL 的设计差异。',
        href: '/zh/docs/introduction/what-is-syl',
        cta: '阅读总览',
      },
      {
        title: '参考文档',
        body: 'CLI 参数、类型系统、语法和诊断代码。',
        href: '/zh/docs/reference/cli',
        cta: '浏览参考',
      },
    ],
    footer: 'Syl 处于早期开发阶段。标准库和部分高级功能仍在实现中。',
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

function ChipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 4V2" />
      <path d="M16 4V2" />
      <path d="M8 20v2" />
      <path d="M16 20v2" />
      <path d="M4 8H2" />
      <path d="M4 16H2" />
      <path d="M20 8h2" />
      <path d="M20 16h2" />
      <path d="M9 9h6v6H9z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

const featureIcons = [ShieldIcon, TerminalIcon, ChipIcon];

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const content = lang === 'zh' ? copy.zh : copy.en;
  const isChinese = lang === 'zh';

  return (
    <main className="relative flex w-full flex-1 flex-col overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_20%_15%,rgba(27,94,32,0.12),transparent_42%),radial-gradient(circle_at_85%_25%,rgba(59,130,246,0.07),transparent_32%)]" />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-24 pt-12 sm:pt-16">

        {/* ── Hero ── */}
        <section className="relative flex flex-col items-center text-center">
          {/* Decorative circuit traces */}
          <CircuitLines className="absolute -left-20 top-0 h-48 w-48 opacity-60 max-md:hidden" />
          <CircuitLines className="absolute -right-20 bottom-0 h-48 w-48 scale-x-[-1] opacity-60 max-md:hidden" />

          <SylLogo className="mb-6 h-16 w-16" />

          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Syl
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl font-medium text-fd-muted-foreground/80">
            {content.subtitle}
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-fd-muted-foreground">
            {content.intro}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <DynamicLink
              href={isChinese ? '/zh/docs' : '/docs'}
              className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-6 py-3 text-sm font-semibold text-fd-primary-foreground transition-all hover:brightness-110"
            >
              {content.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </DynamicLink>
            <DynamicLink
              href={isChinese ? '/zh/docs' : '/docs'}
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-fd-accent"
            >
              {content.ctaSecondary}
            </DynamicLink>
          </div>
        </section>

        {/* ── Code panels section ── */}
        <RevealGroup className="mt-20">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="overflow-hidden rounded-xl border bg-fd-card shadow-md">
              <div className="flex items-center gap-1.5 border-b px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-xs font-medium text-fd-muted-foreground">
                  {content.codePanelTitle}
                </span>
              </div>
              <ServerCodeBlock
                code={content.code}
                lang="syl"
              />
            </div>
            <AnimatedTerminal />
          </div>
        </RevealGroup>

        {/* ── Features ── */}
        <RevealGroup delay={150} className="mt-24">
          <div className="grid gap-4 md:grid-cols-3">
            {content.features.map((feature, i) => {
              const Icon = featureIcons[i];
              return (
                <article
                  key={feature.title}
                  className="group rounded-2xl border bg-fd-card p-6 transition-all hover:shadow-md"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border bg-fd-secondary text-fd-muted-foreground transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight">{feature.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-fd-muted-foreground">{feature.body}</p>
                </article>
              );
            })}
          </div>
        </RevealGroup>

        {/* ── Paths ── */}
        <RevealGroup delay={300} className="mt-24">
          <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
            {isChinese ? '从合适的起点开始' : 'Choose a starting point'}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {content.paths.map((path) => (
              <DynamicLink
                key={path.title}
                href={path.href}
                className="group rounded-2xl border bg-fd-card p-6 transition-all hover:shadow-md hover:bg-fd-accent"
              >
                <h3 className="text-lg font-semibold tracking-tight">{path.title}</h3>
                <p className="mt-2 text-sm leading-7 text-fd-muted-foreground">{path.body}</p>
                <p className="mt-4 text-sm font-semibold underline-offset-4 transition-all group-hover:underline">
                  {path.cta} →
                </p>
              </DynamicLink>
            ))}
          </div>
        </RevealGroup>

        {/* ── Footer ── */}
        <p className="mt-24 text-center text-xs text-fd-muted-foreground/50">
          {content.footer}
        </p>
      </div>
    </main>
  );
}
