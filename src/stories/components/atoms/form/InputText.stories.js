import { renderInputText } from '../../utils.js';

export default {
  title: 'Atoms/Form/Input Text',
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    required: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    type: { 
      control: { type: 'select' }, 
      options: ['text', 'email', 'password', 'number', 'tel'] 
    },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
    critical: { control: 'boolean' }
  },
  parameters: {
    componentSubtitle: 'Text input field component',
    docs: {
      description: {
        component: 'Form text input field with various options and states'
      }
    }
  }
};

// Template render function
const Template = (args) => {
  return renderInputText(args);
};

// Default text input story
export const Default = {
  args: {
    id: 'username',
    name: 'username',
    label: 'Username',
    required: false,
    placeholder: 'Enter your username',
    value: '',
    type: 'text',
    className: '',
    disabled: false,
    critical: false
  },
  render: Template
};

// Required text input story
export const Required = {
  args: {
    id: 'email',
    name: 'email',
    label: 'Email Address',
    required: true,
    placeholder: 'Enter your email',
    value: '',
    type: 'email',
    className: '',
    disabled: false,
    critical: false
  },
  render: Template
};

// Error state story
export const Error = {
  args: {
    id: 'password',
    name: 'password',
    label: 'Password',
    required: true,
    placeholder: 'Enter your password',
    value: '',
    type: 'password',
    className: '',
    disabled: false,
    critical: true
  },
  render: Template
};

// Disabled state story
export const Disabled = {
  args: {
    id: 'username',
    name: 'username',
    label: 'Username',
    required: false,
    placeholder: 'Enter your username',
    value: '',
    type: 'text',
    className: '',
    disabled: true,
    critical: false
  },
  render: Template
};