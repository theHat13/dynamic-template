import { renderButtonSubmit } from './utils.js';

export default {
  title: 'Atoms/Buttons/Button Submit',
  parameters: {
    componentSubtitle: 'Submit button component for forms',
    docs: {
      description: {
        component: 'Form submit button with hover state'
      }
    }
  }
};

// Template render function
const Template = () => {
  return renderButtonSubmit();
};

// Submit button story
export const Default = {
  render: Template
};