import 'fumadocs-ui/style.css';
import '../global.css';
import { Atkinson_Hyperlegible, Noto_Sans_SC } from 'next/font/google';
import { SylRootProvider } from '@/components/root-provider';

const latin = Atkinson_Hyperlegible({
  subsets: ['latin'],
  variable: '--font-latin',
  weight: ['400', '700'],
});

const chinese = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-chinese',
  weight: ['400', '500', '700'],
});

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;

  return (
    <html lang={lang} className={`${latin.variable} ${chinese.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <SylRootProvider lang={lang}>{children}</SylRootProvider>
      </body>
    </html>
  );
}
