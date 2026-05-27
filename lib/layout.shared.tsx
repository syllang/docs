import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from '@/lib/i18n';
import { uiTranslations } from 'fumadocs-ui/i18n';
import { zhCN } from '@fumadocs/language/zh-cn';
import { SylThemeSwitch } from '@/components/theme-switch';

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .preset('zh', zhCN())
  .add('ui', {
    zh: {
      displayName: '简体中文',
    },
  });

export function baseOptions(locale: string): BaseLayoutProps {
  const isChinese = locale === 'zh';

  return {
    nav: {
      title: 'Syl',
      url: isChinese ? '/zh' : '/',
    },
    githubUrl: 'https://github.com/syllang/syl',
    links: [
      {
        type: 'main',
        text: isChinese ? '文档' : 'Docs',
        url: isChinese ? '/zh/docs' : '/docs',
      },
    ],
    slots: {
      themeSwitch: SylThemeSwitch,
    },
  };
}
