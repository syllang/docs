import { DynamicLink } from 'fumadocs-core/dynamic-link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syl',
  description:
    'Syl is an experimental hardware description language. The compiler catches width, port, connection, and driver errors before they reach simulation. Output is SystemVerilog.',
};

const copy = {
  en: {
    title: 'Syl: hardware description, compile-time checks.',
    body:
      'Write digital logic in Syl. The compiler catches width mismatches, unconnected ports, and multi-driver conflicts before simulation. Output is standard SystemVerilog for existing flows.',
    cta: 'Get started',
    ctaSecondary: 'Try the examples',
    compare: {
      verilogLabel: 'Verilog — compiles, crashes at runtime',
      verilogCode: `module add_8(
  input  [7:0] a, b,
  output [7:0] y
);
  assign y = a + b;
endmodule`,
      sylLabel: 'Syl — rejects at compile time',
      sylCode: `cell Add<W: Nat>(
  a: in UInt<W>,
  b: in UInt<W>,
) -> y: UInt<W> {
  // error: width mismatch
  //   expected UInt<8>, found UInt<16>
  y := a + b
}`,
    },
    features: [
      {
        title: 'Check before sim',
        body: 'Width mismatches, unconnected ports, and multi-driver conflicts are errors, not runtime surprises.',
      },
      {
        title: 'Diagnostics in hardware terms',
        body: 'Errors talk about ports, clocks, resets, and drivers — not a host language stack trace.',
      },
      {
        title: 'Standard output',
        body: 'Syl emits SystemVerilog. The same simulators and synthesis tools still fit the flow.',
      },
    ],
    pathsTitle: 'Start here',
    paths: [
      {
        title: 'Try the compiler',
        body: 'Install sylc via cargo and compile the example designs.',
        href: '/[lang]/docs',
        cta: 'Quick start',
      },
      {
        title: 'What is Syl?',
        body: 'Read the language overview and the design differences from Verilog, Chisel, and SpinalHDL.',
        href: '/[lang]/docs/introduction/what-is-syl',
        cta: 'Read overview',
      },
      {
        title: 'Project status',
        body: 'Check verified features, current limits, and what comes next.',
        href: '/[lang]/docs/introduction/project-status',
        cta: 'View status',
      },
    ],
  },
  zh: {
    title: 'Syl：硬件描述，编译器检查。',
    body:
      '用 Syl 写数字电路。位宽不匹配、端口未连接、多驱动冲突——这些错误在仿真之前就被编译器捕获。输出标准 SystemVerilog，接入现有流程。',
    cta: '开始使用',
    ctaSecondary: '查看示例',
    compare: {
      verilogLabel: 'Verilog — 编译通过，仿真时报错',
      verilogCode: `module add_8(
  input  [7:0] a, b,
  output [7:0] y
);
  assign y = a + b;
endmodule`,
      sylLabel: 'Syl — 编译期直接拒绝',
      sylCode: `cell Add<W: Nat>(
  a: in UInt<W>,
  b: in UInt<W>,
) -> y: UInt<W> {
  // error: 位宽不匹配
  //   expected UInt<8>, found UInt<16>
  y := a + b
}`,
    },
    features: [
      {
        title: '在仿真前发现问题',
        body: '位宽冲突、端口断开、多驱动——这些是编译错误，不是仿真阶段的意外。',
      },
      {
        title: '诊断直接使用硬件术语',
        body: '错误围绕端口、时钟域、复位和驱动关系展开。不需要先读懂宿主语言的栈追踪。',
      },
      {
        title: '输出标准格式',
        body: '编译结果是 SystemVerilog。现有的仿真和综合工具依然可以继续使用。',
      },
    ],
    pathsTitle: '从这里开始',
    paths: [
      {
        title: '先试用编译器',
        body: '通过 cargo 安装 sylc，编译内附的示例设计。',
        href: '/[lang]/docs',
        cta: '快速开始',
      },
      {
        title: '再理解 Syl',
        body: '阅读语言总览，了解 Syl 和 Verilog、Chisel、SpinalHDL 的设计差异。',
        href: '/[lang]/docs/introduction/what-is-syl',
        cta: '阅读总览',
      },
      {
        title: '然后看状态',
        body: '确认今天能做什么，哪些功能还在实验中。',
        href: '/[lang]/docs/introduction/project-status',
        cta: '查看状态',
      },
    ],
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
      {/* Circuit board background */}
      <rect width="48" height="48" rx="10" fill="#1b5e20" />
      {/* Circuit traces */}
      <path d="M8 12h10l4-4h22" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.3" />
      <path d="M8 36h6l2 2h28" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.3" />
      <path d="M30 8v10l-4 4v22" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.3" />
      {/* Via dots */}
      <circle cx="8" cy="12" r="1.5" fill="#fff" fillOpacity="0.4" />
      <circle cx="8" cy="36" r="1.5" fill="#fff" fillOpacity="0.4" />
      <circle cx="30" cy="8" r="1.5" fill="#fff" fillOpacity="0.4" />
      {/* Lightning bolt */}
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
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_30%_20%,rgba(27,94,32,0.18),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(59,130,246,0.10),transparent_30%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-24 pt-16 sm:pt-24">

        {/* ── Hero ── */}
        <section className="flex flex-col items-center text-center">
          <SylLogo className="mb-6 h-14 w-14" />
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
            {content.title}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-fd-muted-foreground">
            {content.body}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <DynamicLink
              href={isChinese ? '/zh/docs' : '/docs'}
              className="rounded-full bg-fd-primary px-6 py-3 text-sm font-semibold text-fd-primary-foreground"
            >
              {content.cta}
            </DynamicLink>
            <DynamicLink
              href={isChinese ? '/zh/docs/introduction/what-is-syl' : '/docs/introduction/what-is-syl'}
              className="rounded-full border px-6 py-3 text-sm font-semibold"
            >
              {content.ctaSecondary}
            </DynamicLink>
          </div>
        </section>

        {/* ── Before / After comparison ── */}
        <section className="mt-16 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border bg-fd-card p-5 shadow-sm">
            <p className="flex items-center gap-2 text-sm font-semibold text-fd-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-red-400" />
              {content.compare.verilogLabel}
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-zinc-950 p-4 text-sm leading-6 whitespace-pre-wrap text-zinc-100">
              <code>{content.compare.verilogCode}</code>
            </pre>
          </div>
          <div className="rounded-[1.5rem] border bg-fd-card p-5 shadow-sm">
            <p className="flex items-center gap-2 text-sm font-semibold text-fd-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
              {content.compare.sylLabel}
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-zinc-950 p-4 text-sm leading-6 whitespace-pre-wrap text-zinc-100">
              <code>{content.compare.sylCode}</code>
            </pre>
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

        {/* ── Starting paths ── */}
        <section className="mt-20">
          <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
            {content.pathsTitle}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
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
          </div>
        </section>

        {/* ── Status footnote ── */}
        <p className="mt-20 text-center text-xs text-fd-muted-foreground/60">
          {isChinese
            ? 'Syl 处于早期开发阶段。标准库和部分高级功能仍在实现中。'
            : 'Syl is in early development. Standard library and some advanced features are still being built.'}
        </p>
      </div>
    </main>
  );
}
