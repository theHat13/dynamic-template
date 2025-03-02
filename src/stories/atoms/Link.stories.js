import nunjucks from 'nunjucks';
import linkData from '../../_data/components/atoms/link.json';

/**
 * Link component for navigation
 * Provides different variants and styles for links
 */
export default {
  title: 'Atoms/Link',
  tags: ['autodocs'],
  render: (args) => {
    // Render link using Nunjucks template
    const template = `
      <a 
        href="{{ href }}" 
        class="link link--{{ variant }}"
      >
        {{ text }}
      </a>
    `;
    
    return nunjucks.renderString(template, {
      href: args.href || '#',
      text: args.text || 'Link',
      variant: args.variant || 'default'
    });
  },
  argTypes: {
    href: {
      description: 'Destination URL for the link',
      control: 'text',
      defaultValue: '#'
    },
    text: {
      description: 'Text displayed for the link',
      control: 'text',
      defaultValue: 'Link'
    },
    variant: {
      description: 'Visual style of the link',
      control: { 
        type: 'select', 
        options: ['default', 'primary', 'secondary'] 
      },
      defaultValue: 'default'
    }
  }
};

/**
 * Default link with standard styling
 */
export const Default = {
  args: {
    href: '#',
    text: 'Default Link'
  }
};

/**
 * Primary link with highlighted styling
 */
export const Primary = {
  args: {
    href: '/home',
    text: 'Primary Link',
    variant: 'primary'
  }
};

/**
 * Secondary link with alternative styling
 */
export const Secondary = {
  args: {
    href: '/about',
    text: 'Secondary Link', 
    variant: 'secondary'
  }
};