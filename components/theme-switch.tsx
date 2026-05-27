'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'fumadocs-ui/contexts/i18n';
import type { ThemeSwitchProps } from 'fumadocs-ui/layouts/shared/slots/theme-switch';

type Theme = 'light' | 'dark';

export function SylThemeSwitch({ className }: ThemeSwitchProps) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const translations = useTranslations();

  useEffect(() => {
    const initialTheme = readTheme();
    applyTheme(initialTheme);
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    window.localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      aria-label={translations.themeToggle}
      className={`inline-flex items-center overflow-hidden rounded-full border p-1 *:rounded-full ${className ?? ''}`}
      data-theme-toggle=""
      onClick={toggleTheme}
      type="button"
    >
      <svg
        aria-hidden="true"
        className={iconClassName(theme === 'light')}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.64 5.64l1.77 1.77m9.18 9.18 1.77 1.77m0-12.72-1.77 1.77m-9.18 9.18-1.77 1.77" />
        <circle cx="12" cy="12" r="4" />
      </svg>
      <svg
        aria-hidden="true"
        className={iconClassName(theme === 'dark')}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.6 15.1A8.7 8.7 0 0 1 8.9 3.4 9 9 0 1 0 20.6 15.1Z" />
      </svg>
    </button>
  );
}

function iconClassName(active: boolean): string {
  const state = active
    ? 'bg-fd-accent text-fd-accent-foreground'
    : 'text-fd-muted-foreground';

  return `size-6.5 p-1.5 ${state}`;
}

function readTheme(): Theme {
  const savedTheme = window.localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  root.style.colorScheme = theme;
}
