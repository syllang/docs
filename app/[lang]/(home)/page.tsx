import { DynamicLink } from 'fumadocs-core/dynamic-link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syl',
  description:
    'Syl is a hardware description language. Write digital logic, the compiler checks types and connections at compile time, outputs SystemVerilog.',
};

const copy = {
  en: {
    intro:
      'Syl is a hardware description language. You write digital logic, the compiler checks widths, ports, and drivers at compile time, and outputs SystemVerilog for existing simulation and synthesis flows.',
    cta: 'Get started',
    ctaSecondary: 'Install',
    codePanelTitle: 'A working counter in Syl',
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
        body: 'Width mismatches, unconnected ports, and multi-driver conflicts are compiler errors, not simulation surprises.',
      },
      {
        title: 'Standard output',
        body: 'Syl emits SystemVerilog. The same simulation and synthesis tools still work.',
      },
      {
        title: 'One tool, no runtime',
        body: 'Install sylc via cargo. No JVM, no Scala build tool, no host language runtime.',
      },
    ],
    install: 'cargo install sylc',
    paths: [
      {
        title: 'Quick start',
        body: 'Install the compiler, compile the example designs, see the output.',
        href: '/docs',
        cta: 'Start here',
      },
      {
        title: 'Language overview',
        body: 'Read about Syl, its design, and how it differs from Verilog, Chisel, and SpinalHDL.',
        href: '/docs/introduction/what-is-syl',
        cta: 'Read overview',
      },
      {
        title: 'Reference',
        body: 'CLI flags, type system, built-in functions, and diagnostic codes.',
        href: '/docs/reference/cli',
        cta: 'Browse reference',
      },
    ],
    footer: 'Syl is in early development. Standard library and some features are still being built.',
  },
  zh: {
    intro:
      'Syl 是一门硬件描述语言。你用 Syl 写数字电路，编译器在编译期检查位宽、端口和驱动是否匹配，输出 SystemVerilog 给现有的仿真和综合工具使用。',
    cta: '快速开始',
    ctaSecondary: '安装',
    codePanelTitle: '一个可以工作的计数器',
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
        body: '位宽不匹配、端口未连接、多驱动冲突——这些是编译错误，不是仿真阶段的意外。',
      },
      {
        title: '输出标准格式',
        body: 'Syl 生成 SystemVerilog。现有的仿真和综合工具可以继续使用。',
      },
      {
        title: '单一工具，零运行时',
        body: '通过 cargo 安装 sylc。不需要 JVM、不需要 Scala、不需要宿主语言运行时。',
      },
    ],
    install: 'cargo install sylc',
    paths: [
      {
        title: '快速开始',
        body: '安装编译器、编译内附的示例设计、查看输出结果。',
        href: '/zh/docs',
        cta: '从这里开始',
      },
      {
        title: '语言总览',
        body: '了解 Syl 的设计目标，以及和 Verilog、Chisel、SpinalHDL 的区别。',
        href: '/zh/docs/introduction/what-is-syl',
        cta: '阅读总览',
      },
      {
        title: '参考文档',
        body: 'CLI 参数、类型系统、内置函数和诊断代码。',
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
      <path
        d="M26 4L12 26h10l-4 18 16-22h-10l4-18z"
        fill="#fff"
      />
    </svg>
  );
}

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const content = lang === 'zh' ? copy.zh : copy.en;
  const isChinese = lang === 'zh';

  return (
    <main className="relative flex w-full flex-1 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_30%_20%,rgba(27,94,32,0.15),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(59,130,246,0.08),transparent_30%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-24 pt-16 sm:pt-24">

        {/* ── Hero ── */}
        <section className="flex flex-col items-center text-center">
          <SylLogo className="mb-6 h-14 w-14" />
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Syl
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-fd-muted-foreground">
            {content.intro}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <DynamicLink
              href={isChinese ? '/zh/docs' : '/docs'}
              className="rounded-full bg-fd-primary px-6 py-3 text-sm font-semibold text-fd-primary-foreground"
            >
              {content.cta}
            </DynamicLink>
            <DynamicLink
              href={isChinese ? '/zh/docs' : '/docs'}
              className="rounded-full border px-6 py-3 text-sm font-semibold"
            >
              {content.ctaSecondary}
            </DynamicLink>
          </div>
        </section>

        {/* ── Code + install in one row ── */}
        <section className="mt-16 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="rounded-[1.5rem] border bg-fd-card p-5 shadow-sm">
            <p className="text-sm font-semibold text-fd-muted-foreground">
              {content.codePanelTitle}
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-zinc-950 p-4 text-sm leading-6 whitespace-pre-wrap text-zinc-100">
              <code>{content.code}</code>
            </pre>
          </div>
          <div className="rounded-[1.5rem] border bg-fd-card p-5 shadow-sm">
            <p className="text-sm font-semibold text-fd-muted-foreground">Install</p>
            <div className="mt-4 overflow-x-auto rounded-xl bg-zinc-950 p-4">
              <code className="text-sm leading-6 text-zinc-100">$ {content.install}</code>
            </div>
            <p className="mt-4 text-xs leading-6 text-fd-muted-foreground">
              {isChinese
                ? '需要 Rust 工具链。安装后 sylc 可以直接使用。'
                : 'Requires the Rust toolchain. sylc is available on PATH after install.'}
            </p>
          </div>
        </section>

        {/* ── Three features ── */}
        <section className="mt-20 grid gap-4 md:grid-cols-3">
          {content.features.map((feature) => (
            <article key={feature.title} className="rounded-[1.5rem] border bg-fd-card p-6">
              <h2 className="text-lg font-semibold tracking-tight">{feature.title}</h2>
              <p className="mt-3 text-sm leading-7 text-fd-muted-foreground">{feature.body}</p>
            </article>
          ))}
        </section>

        {/* ── Paths ── */}
        <section className="mt-20 grid gap-4 md:grid-cols-3">
          {content.paths.map((path) => (
            <DynamicLink
              key={path.title}
              href={path.href}
              className="group rounded-[1.5rem] border bg-fd-card p-6 transition-colors hover:bg-fd-accent"
            >
              <h3 className="text-lg font-semibold tracking-tight">{path.title}</h3>
              <p className="mt-2 text-sm leading-7 text-fd-muted-foreground">{path.body}</p>
              <p className="mt-4 text-sm font-semibold underline-offset-4 group-hover:underline">
                {path.cta} →
              </p>
            </DynamicLink>
          ))}
        </section>

        {/* ── Footer ── */}
        <p className="mt-20 text-center text-xs text-fd-muted-foreground/60">
          {content.footer}
        </p>
      </div>
    </main>
  );
}
