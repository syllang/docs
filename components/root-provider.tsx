'use client';

import type { ReactNode } from 'react';
import NextLink from 'next/link';
import { useParams, usePathname as useNextPathname, useRouter } from 'next/navigation';
import { FrameworkProvider, type Framework } from 'fumadocs-core/framework';
import { i18nProvider } from 'fumadocs-ui/i18n';
import { RootProvider } from 'fumadocs-ui/provider/base';
import { translations } from '@/lib/layout.shared';

const searchHotKey = [
  {
    key: (event: KeyboardEvent) => event.metaKey || event.ctrlKey,
    display: 'Ctrl',
  },
  {
    key: 'k',
    display: 'K',
  },
];

const frameworkLink: NonNullable<Framework['Link']> = ({ href = '#', ...props }) => {
  return <NextLink href={href} {...props} />;
};

const frameworkImage: NonNullable<Framework['Image']> = ({
  src,
  alt = '',
  priority: _priority,
  ...props
}) => {
  const resolvedSrc = resolveImageSource(src);
  return <img src={resolvedSrc} alt={alt} {...props} />;
};

type FrameworkImageSource = Parameters<NonNullable<Framework['Image']>>[0]['src'];

function resolveImageSource(src: FrameworkImageSource): string | undefined {
  if (!src) return undefined;
  if (typeof src === 'string') return src;
  if ('src' in src) return src.src;
  return src.default.src;
}

interface SylRootProviderProps {
  children: ReactNode;
  lang: string;
}

export function SylRootProvider({ children, lang }: SylRootProviderProps) {
  return (
    <FrameworkProvider
      Link={frameworkLink}
      Image={frameworkImage}
      usePathname={usePublicPathname}
      useRouter={useRouter}
      useParams={useParams}
    >
      <RootProvider
        i18n={i18nProvider(translations, lang)}
        search={{ hotKey: searchHotKey }}
        theme={{ enabled: false }}
      >
        {children}
      </RootProvider>
    </FrameworkProvider>
  );
}

function usePublicPathname(): string {
  return normalizeDefaultLocalePathname(useNextPathname());
}

function normalizeDefaultLocalePathname(pathname: string): string {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice('/en'.length);
  return pathname;
}
