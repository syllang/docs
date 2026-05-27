import { getDocsPageTree } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

export default async function Layout({ params, children }: LayoutProps<'/[lang]/docs'>) {
  const { lang } = await params;
  const tree = getDocsPageTree(lang);

  return (
    <DocsLayout {...baseOptions(lang)} tree={tree}>
      {children}
    </DocsLayout>
  );
}
