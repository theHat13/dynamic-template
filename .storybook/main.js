
import { createFilter } from 'vite';
import { dirname, relative, resolve } from 'path';
import { cwd } from 'process';
import nunjucks from 'vite-plugin-nunjucks';

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/stories/Introduction.mdx",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/html-vite",
    "options": {}
  },
  "staticDirs": ['../public', '../src/assets'],
  "viteFinal": async (config) => {
    // Add Nunjucks plugin
    config.plugins.push(
      nunjucks({
        templatesDir: resolve(cwd(), 'src/_includes'),
        variables: {
          site: {
            title: 'HAT Dynamic Template',
            description: 'Component library for HAT Dynamic Template'
          }
        }
      })
    );
    
    return config;
  }
};
export default config;