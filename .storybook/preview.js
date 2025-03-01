// Import styles first
import '../public/css/output.css';

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      story: {
        inline: true,
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Atoms',
          ['Buttons', 'Form', 'Navigation', 'Notifications'],
          'Molecules',
          ['Cards', 'Forms', 'Navigation', 'Others'],
          'Organisms',
          ['Global', 'Sections'],
        ],
      },
    },
  },
};

export default preview;