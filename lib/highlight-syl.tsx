import { getHighlighter, type HighlightOptions } from 'fumadocs-core/highlight';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { sylLanguage } from '@/lib/shiki/syl';
import * as JsxRuntime from 'react/jsx-runtime';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';

export async function SylCodeBlock({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const highlighter = await getHighlighter('js', {
    langs: [sylLanguage],
    themes: ['github-light', 'github-dark'],
  });

  const hast = highlighter.codeToHast(code, {
    lang: 'syl',
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  });

  const rendered = toJsxRuntime(hast, {
    ...JsxRuntime,
    development: false,
    components: {
      pre: (props: any) => (
        <CodeBlock {...props} className={`my-0 rounded-none border-0 shadow-none ${className ?? ''}`}>
          <Pre>{props.children}</Pre>
        </CodeBlock>
      ),
    },
  });

  return rendered;
}
