import { DynamicLink } from 'fumadocs-core/dynamic-link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syl',
  description: 'Documentation for the Syl hardware description language.',
};

const copy = {
  en: {
    eyebrow: 'Static analyzability for hardware design',
    title: 'Syl documentation',
    body: 'Install Syl, compile a small design, read the diagnostics, and inspect the generated SystemVerilog.',
    primary: 'Start with Quick Start',
    secondary: 'Read what Syl is',
  },
  zh: {
    eyebrow: '面向硬件设计的静态可分析性',
    title: 'Syl 文档',
    body: '安装 Syl，编译一个小设计，阅读诊断，并检查生成的 SystemVerilog。',
    primary: '从快速开始进入',
    secondary: '了解 Syl 是什么',
  },
};

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const content = lang === 'zh' ? copy.zh : copy.en;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-24">
      <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-fd-muted-foreground">
        {content.eyebrow}
      </p>
      <h1 className="max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">{content.title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-fd-muted-foreground">{content.body}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <DynamicLink
          href="/[lang]/docs"
          className="rounded-full bg-fd-primary px-5 py-3 text-sm font-semibold text-fd-primary-foreground"
        >
          {content.primary}
        </DynamicLink>
        <DynamicLink
          href="/[lang]/docs/introduction/what-is-syl"
          className="rounded-full border px-5 py-3 text-sm font-semibold"
        >
          {content.secondary}
        </DynamicLink>
      </div>
    </main>
  );
}
