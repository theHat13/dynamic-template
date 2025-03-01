import { renderContactForm } from '../../utils.js';

export default {
  title: 'Molecules/Forms/Contact Form',
  parameters: {
    componentSubtitle: 'Contact form with multiple fields',
    docs: {
      description: {
        component: 'A complete contact form with name, email, message fields and submit button'
      }
    }
  }
};

// Template render function
const Template = () => {
  return renderContactForm();
};

// Contact form story
export const Default = {
  render: Template
};