import type { MDXPlugin } from '@docusaurus/mdx-loader';
import type { Options as PluginRedirectOptions } from '@docusaurus/plugin-client-redirects';
import type { Options as PluginContentDocsOptions } from '@docusaurus/plugin-content-docs';
import type { Options as PluginPwaOptions } from '@docusaurus/plugin-pwa';
import type { Options as PresetClassicOptions } from '@docusaurus/preset-classic';
import npm2yarnPlugin from '@docusaurus/remark-plugin-npm2yarn';
import type { UserThemeConfig as ThemeCommonConfig } from '@docusaurus/theme-common';
import type { UserThemeConfig as AlgoliaThemeConfig } from '@docusaurus/theme-search-algolia';
import type { Config } from '@docusaurus/types';
import { version } from '@typescript-eslint/parser/package.json';

import { blogFooter } from './plugins/blog-footer';
import { generatedRuleDocs } from './plugins/generated-rule-docs';
import { rulesMeta } from './rulesMeta';

const remarkPlugins: MDXPlugin[] = [[npm2yarnPlugin, { sync: true }]];

const githubUrl = 'https://github.com/typescript-eslint/typescript-eslint';

const presetClassicOptions: PresetClassicOptions = {
  blog: {
    blogSidebarCount: 'ALL',
    // Allow Docusaurus TOC remark plugin to pick up the injected H2
    beforeDefaultRemarkPlugins: [blogFooter],
    remarkPlugins,
  },
  docs: {
    id: 'rules-docs',
    path: '../eslint-plugin/docs/rules',
    sidebarPath: require.resolve('./sidebars/sidebar.rules.js'),
    routeBasePath: 'rules',
    editUrl: `${githubUrl}/edit/main/packages/website/`,
    beforeDefaultRemarkPlugins: [generatedRuleDocs],
    remarkPlugins,
    exclude: ['TEMPLATE.md'],
    breadcrumbs: false,
  },
  pages: {
    remarkPlugins,
  },
  theme: {
    customCss: require.resolve('./src/css/custom.css'),
  },
};

const pluginContentDocsOptions: PluginContentDocsOptions = {
  id: 'base-docs',
  path: '../../docs',
  routeBasePath: '/',
  sidebarPath: require.resolve('./sidebars/sidebar.base.js'),
  editUrl: `${githubUrl}/edit/main/packages/website/`,
  remarkPlugins,
  breadcrumbs: false,
};

const themeConfig: AlgoliaThemeConfig & ThemeCommonConfig = {
  algolia: {
    appId: 'N1HUB2TU6A',
    apiKey: '74d42ed10d0f7b327d74d774570035c7',
    indexName: 'typescript-eslint',
  },
  colorMode: {
    respectPrefersColorScheme: true,
  },
  metadata: [
    { name: 'msapplication-TileColor', content: '#443fd4' },
    { name: 'theme-color', content: '#443fd4' },
    { name: 'twitter:image:alt', content: 'Typescript-eslint logo' },
  ],
  image: 'img/logo-twitter-card.png',
  navbar: {
    title: 'typescript-eslint',
    logo: {
      alt: '',
      height: '32px',
      src: 'img/logo.svg',
      width: '32px',
    },
    items: [
      {
        to: 'getting-started/',
        label: 'Docs',
        position: 'left',
      },
      {
        to: 'rules/',
        label: 'Rules',
        position: 'left',
      },
      {
        to: 'blog/',
        label: 'Blog',
        position: 'left',
      },
      {
        position: 'right',
        href: `https://github.com/typescript-eslint/typescript-eslint/releases/tag/v${version}`,
        label: `v${version}`,
      },
      {
        to: 'play',
        activeBasePath: 'play',
        position: 'right',
        label: 'Playground',
      },
      {
        href: githubUrl,
        position: 'right',
        className: 'github-link image-link header-image-link',
        'aria-label': 'GitHub repository',
      },
      {
        href: 'https://discord.com/invite/FSxKq8Tdyg',
        position: 'right',
        className: 'discord-link image-link header-image-link',
        'aria-label': 'Discord',
      },
    ],
  },
  footer: {
    logo: {
      alt: 'Deploys by Netlify',
      src: 'https://www.netlify.com/img/global/badges/netlify-dark.svg',
      href: 'https://www.netlify.com',
    },
    links: [
      {
        title: 'Community',
        items: [
          {
            label: 'Discord',
            href: 'https://discord.gg/FSxKq8Tdyg',
            rel: 'noopener',
            className: 'image-link discord-link social-link-icon',
          },
          {
            label: 'Mastodon',
            href: 'https://fosstodon.org/@tseslint',
            rel: 'me noopener',
            className: 'image-link mastodon-link social-link-icon',
          },
          {
            label: 'Stack Overflow',
            href: 'https://stackoverflow.com/questions/tagged/typescript-eslint',
            className: 'image-link stack-overflow-link social-link-icon',
          },
          {
            label: 'Twitter',
            href: 'https://twitter.com/tseslint',
            rel: 'me noopener',
            className: 'image-link twitter-link social-link-icon',
          },
        ],
      },
      {
        title: 'More',
        items: [
          {
            label: 'GitHub',
            href: githubUrl,
            rel: 'me noopener',
            className: 'github-link image-link social-link-icon',
          },
          {
            label: 'Report issue',
            href: `${githubUrl}/issues/new/choose`,
            className: 'bug-report-link image-link social-link-icon',
          },
          {
            label: 'Open Collective',
            href: 'https://opencollective.com/typescript-eslint/contribute',
            className: 'open-collective-link image-link social-link-icon',
          },
        ],
      },
    ],
    copyright: `Copyright © ${new Date().getFullYear()} typescript-eslint, Inc. Built with Docusaurus.`,
  },
  prism: {
    theme: {
      plain: {},
      styles: [],
    },
    additionalLanguages: ['ignore'],
    magicComments: [
      {
        className: 'theme-code-block-highlighted-line',
        line: 'highlight-next-line',
        block: { start: 'highlight-start', end: 'highlight-end' },
      },
      {
        className: 'code-block-removed-line',
        line: 'Remove this line',
        block: { start: 'Removed lines start', end: 'Removed lines end' },
      },
      {
        className: 'code-block-added-line',
        line: 'Add this line',
        block: { start: 'Added lines start', end: 'Added lines end' },
      },
    ],
  },
  tableOfContents: {
    maxHeadingLevel: 4,
    minHeadingLevel: 2,
  },
};

const pluginPwaOptions: PluginPwaOptions = {
  debug: true,
  offlineModeActivationStrategies: [
    'appInstalled',
    'queryString',
    'standalone',
  ],
  pwaHead: [
    {
      href: '/img/logo.svg',
      rel: 'icon',
      tagName: 'link',
    },
    {
      href: '/manifest.json',
      rel: 'manifest',
      tagName: 'link',
    },
    {
      content: '#443FD4',
      name: 'theme-color',
      tagName: 'meta',
    },
    {
      content: 'yes',
      name: 'apple-mobile-web-app-capable',
      tagName: 'meta',
    },
    {
      content: '#443FD4',
      name: 'apple-mobile-web-app-status-bar-style',
      tagName: 'meta',
    },
    {
      href: '/img/logo.png',
      rel: 'apple-touch-icon',
      tagName: 'link',
    },
    {
      color: '#443FD4',
      href: '/img/logo.png',
      rel: 'mask-icon',
      tagName: 'link',
    },
    {
      content: '/img/logo.png',
      name: 'msapplication-TileImage',
      tagName: 'meta',
    },
    {
      content: '#443FD4',
      name: 'msapplication-TileColor',
      tagName: 'meta',
    },
  ],
};

const redirects: PluginRedirectOptions = {
  redirects: [
    {
      from: '/getting-started/typed-linting/monorepos',
      to: '/troubleshooting/typed-linting/monorepos',
    },
    {
      from: '/linting/configs',
      to: '/users/configs',
    },
    {
      from: '/linting/troubleshooting',
      to: '/troubleshooting/faqs/general',
    },
    {
      from: '/linting/troubleshooting/formatting',
      to: '/users/what-about-formatting',
    },
    {
      from: '/linting/troubleshooting/typed-linting/Performance-troubleshooting',
      to: '/troubleshooting/typed-linting/performance',
    },
    {
      from: '/linting/troubleshooting/tslint',
      to: '/users/what-about-tslint',
    },
    {
      from: '/linting/typed-linting',
      to: '/getting-started/typed-linting',
    },
    {
      from: '/troubleshooting',
      to: '/troubleshooting/faqs/general',
    },
    {
      from: '/troubleshooting/faqs',
      to: '/troubleshooting/faqs/general',
    },
    {
      from: '/troubleshooting/formatting',
      to: '/users/what-about-formatting',
    },
    {
      from: '/troubleshooting/tslint',
      to: '/users/what-about-tslint',
    },
    {
      from: '/troubleshooting/performance-troubleshooting',
      to: '/troubleshooting/typed-linting/performance',
    },
    {
      from: '/linting/troubleshooting/typed-linting/Monorepos',
      to: '/troubleshooting/typed-linting/monorepos',
    },
    {
      from: '/maintenance/issues/rule-deprecations',
      to: '/maintenance/issues/rule-deprecations-and-deletions',
    },
  ],
};

const config: Config = {
  title: 'typescript-eslint',
  tagline:
    'The tooling that enables ESLint and Prettier to support TypeScript.',
  url: 'https://typescript-eslint.io',
  baseUrl: '/',

  // See https://github.com/typescript-eslint/typescript-eslint/pull/8209#discussion_r1444033533
  onBrokenAnchors: 'ignore',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'typescript-eslint',
  projectName: 'typescript-eslint',
  clientModules: [require.resolve('./src/clientModules.js')],
  presets: [['classic', presetClassicOptions]],
  customFields: {
    rules: rulesMeta,
  },
  plugins: [
    ...['ast-spec', 'type-utils'].map(packageName => [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: [`../${packageName}/src/index.ts`],
        enumMembersFormat: 'table',
        exclude: '**/*.d.ts',
        excludeExternals: true,
        groupOrder: ['Functions', 'Variables', '*'],
        hidePageTitle: true,
        id: `typedoc-generated-${packageName}`,
        indexFormat: 'table',
        out: `../../docs/packages/${packageName}/generated`,
        outputFileStrategy: 'modules',
        parametersFormat: 'table',
        plugin: [require.resolve('./tools/typedoc-plugin-no-inherit-fork.mjs')],
        propertiesFormat: 'table',
        readme: 'none',
        tsconfig: `../${packageName}/tsconfig.json`,
        typeDeclarationFormat: 'table',
        useCodeBlocks: true,
      },
    ]),
    require.resolve('./webpack.plugin'),
    ['@docusaurus/plugin-content-docs', pluginContentDocsOptions],
    ['@docusaurus/plugin-pwa', pluginPwaOptions],
    ['@docusaurus/plugin-client-redirects', redirects],
  ],
  themeConfig,
  // Misleading API name, but these are just <link> tags
  stylesheets: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/img/favicon/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/img/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/img/favicon/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/img/favicon/site.webmanifest',
    },
    {
      color: '#2656c7',
      href: '/img/favicon/safari-pinned-tab.svg',
      rel: 'mask-icon',
    },
  ],
};

export default config;
