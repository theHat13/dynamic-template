/**
 * Helper functions for Storybook
 */

/**
 * Create story for a Nunjucks component
 * 
 * @param {string} templatePath - Path to the template in src/_includes
 * @param {object} defaultArgs - Default arguments for the story
 * @param {object} options - Additional options like title, description, etc.
 * @returns {object} - Storybook story configuration
 */
export const createComponentStory = (templatePath, defaultArgs = {}, options = {}) => {
  const { title, description, componentSubtitle, argTypes = {} } = options;
  
  return {
    title,
    argTypes,
    parameters: {
      componentSubtitle,
      docs: {
        description: {
          component: description
        }
      }
    },
    render: (args) => {
      // This function would be implemented by individual stories
      // that import the nunjucksLoader to render the template
    }
  };
};