import { renderButtonLink } from './utils.js';

export default {
  title: 'Atoms/Buttons/Button Link',
  argTypes: {
    btnLabel: { control: 'text' },
    btnHref: { control: 'text' },
    btnStyle: { 
      control: { type: 'select' }, 
      options: ['primary', 'neutral', 'default'] 
    }
  },
  parameters: {
    componentSubtitle: 'Standard button link component',
    docs: {
      description: {
        component: 'Link button that can be styled in different ways'
      }
    }
  }
};

// Template render function
const Template = (args) => {
  return renderButtonLink(args);
};

// Primary button story
export const Primary = {
  args: {
    btnLabel: 'Primary Button',
    btnHref: '#',
    btnStyle: 'primary'
  },
  render: Template
};

// Neutral button story
export const Neutral = {
  args: {
    btnLabel: 'Neutral Button',
    btnHref: '#',
    btnStyle: 'neutral'
  },
  render: Template
};

// Default button story
export const Default = {
  args: {
    btnLabel: 'Default Button',
    btnHref: '#',
    btnStyle: 'default'
  },
  render: Template
};