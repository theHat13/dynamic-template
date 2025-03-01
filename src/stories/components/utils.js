/**
 * Since Nunjucks has compatibility issues in the browser environment with ES modules,
 * we'll create direct render functions that simply serve the HTML components.
 * This approach works reliably in Storybook without the complexity of server-side rendering.
 */

/**
 * Renders a button link component
 * @param {Object} props - Component properties
 * @returns {string} HTML string
 */
export const renderButtonLink = (props) => {
  const { btnLabel = 'Button', btnHref = '#', btnStyle = 'primary' } = props;
  
  let styleClasses = '';
  if (btnStyle === 'primary') {
    styleClasses = 'bg-black hover:bg-white text-white hover:text-black';
  }
  
  return `
    <a href="${btnHref}" 
       class="btn px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-current outline-none whitespace-nowrap ${styleClasses}">
        ${btnLabel}
    </a>
  `;
};

/**
 * Renders a submit button component
 * @returns {string} HTML string
 */
export const renderButtonSubmit = () => {
  return `
    <button type="submit" class="bg-black hover:bg-white text-white hover:text-black border border-current rounded-md text-sm px-4 py-2.5 w-full !mt-6">Send</button>
  `;
};

/**
 * Renders a text input component
 * @param {Object} props - Component properties
 * @returns {string} HTML string
 */
export const renderInputText = (props) => {
  const { 
    id = 'input',
    name = 'input',
    label = 'Label',
    required = false,
    placeholder = '',
    value = '',
    type = 'text',
    className = '',
    disabled = false,
    critical = false
  } = props;
  
  return `
    <div>
      <label for="${id}" class="block typography-label-l ${critical ? 'text-danger' : ''}">
        ${label} ${required ? '*' : ''}
      </label>
      
      <input 
        type="${type}" 
        id="${id}" 
        name="${name}"
        placeholder="${placeholder}" 
        value="${value}"
        class="input ${critical ? 'critical' : ''} ${className} w-full text-gray-800 rounded-md px-4 border text-sm py-2.5 outline-none focus:border-2"
        ${disabled ? 'disabled' : ''}
      />
    </div>
  `;
};

/**
 * Renders a contact form component
 * @returns {string} HTML string
 */
export const renderContactForm = () => {
  return `
    <div class="p-4 mx-auto max-w-xl bg-gray-200 font-[sans-serif]">
        <h1 class="text-2xl text-gray-800 font-bold text-center">Contact us</h1>
        
        <form action="/submit-form" name="contact" method="POST" data-netlify="true" class="ml-auto space-y-4">
            <input type="text" name="bot-field" style="display: none;">
            
            ${renderInputText({
              id: 'name',
              name: 'name',
              label: 'Name',
              required: true,
              placeholder: 'Your name'
            })}
            
            ${renderInputText({
              id: 'email',
              name: 'email',
              label: 'Email',
              required: true,
              placeholder: 'Your email',
              type: 'email'
            })}
            
            <div class="form-group">
                <label for="message" class="block typography-label-l">Message</label>
                <textarea placeholder='Message' rows="6" class="w-full text-gray-800 rounded-md px-4 border text-sm pt-2.5 outline-none focus:border-2"></textarea>
            </div>
            
            <div data-netlify-recaptcha="true"></div>
            
            ${renderButtonSubmit()}
        </form>
    </div>
  `;
};