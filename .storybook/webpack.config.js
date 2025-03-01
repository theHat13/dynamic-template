const path = require('path');

module.exports = async ({ config }) => {
  // Add Nunjucks loader
  config.module.rules.push({
    test: /\.njk$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          preprocessor: (content, loaderContext) => {
            // You can process the Nunjucks templates here if needed
            return content;
          },
        },
      },
    ],
  });

  return config;
};