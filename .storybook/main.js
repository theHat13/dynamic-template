/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y" // Ajout recommandé pour l'accessibilité
  ],
  framework: {
    name: "@storybook/html-webpack5",
    options: {
      builder: {
        useSWC: true
      }
    }
  },
  // Ajout d'une configuration webpack pour gérer Nunjucks
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.njk$/,
      use: [
        {
          loader: 'simple-nunjucks-loader',
          options: {
            // Configuration minimale
            environment: 'production'
          }
        }
      ]
    });
    return config;
  },
  // Configuration des docs
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation'
  }
};

export default config;