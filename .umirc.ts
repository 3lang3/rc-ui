import { defineConfig } from 'dumi';

export default defineConfig({
  title: '@zhp-fe/ui',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  extraPostCSSPlugins: [
    // eslint-disable-next-line
    require('tailwindcss'),
  ],
  styles: [`body { min-height: 100vh; font-size: 0.26rem; background: #f5f5f5; }`],
  // more config: https://d.umijs.org/config
});
