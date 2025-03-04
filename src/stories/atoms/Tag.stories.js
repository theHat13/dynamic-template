// src/stories/atoms/Tag.stories.js
import nunjucks from 'nunjucks';
import tagData from '../../_data/styles/atoms/tag.json';
import tagsData from '../../_data/contents/atoms/tags.json';

// Nunjucks template for rendering tags
const tagTemplate = `
    <span class="tag inline-flex items-center px-2 py-1 text-xs font-medium rounded-md tag--{{ variant }} {{ variantClass }}">
    {{ text }}
  </span>
`;

// Helper function to get variant-specific CSS classes
function getVariantClass(variant) {
  const foundVariant = tagData.variants.find(v => v.name === variant);
  return foundVariant ? foundVariant.class.replace(`tag--${variant}`, '').trim() : '';
}

export default {
  title: 'Atoms/Tag',
  tags: ['autodocs'],
  
  // Render function using Nunjucks template
  render: (args) => {
    return nunjucks.renderString(tagTemplate, {
      text: args.text,
      variantClass: getVariantClass(args.variant)
    });
  },
  
  // Argument types for Storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed in the tag',
      control: 'text',
      defaultValue: 'Tag' 
    },
    variant: { 
      description: 'Visual style of the tag',
      control: { 
        type: 'select', 
        options: tagData.variants.map(v => v.name)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from tags.json
const tagExamples = tagsData.tag_data;

export const Adventure = {
  args: {
    text: tagExamples.tag_adventure.text,
    variant: tagExamples.tag_adventure.variant
  }
};

export const Lore = {
  args: {
    text: tagExamples.tag_lore.text,
    variant: tagExamples.tag_lore.variant
  }
};

export const Success = {
  args: {
    text: tagExamples.tag_success.text,
    variant: tagExamples.tag_success.variant
  }
};

export const Warning = {
  args: {
    text: tagExamples.tag_encumbrance.text,
    variant: tagExamples.tag_encumbrance.variant
  }
};

export const Critical = {
  args: {
    text: tagExamples.tag_death.text,
    variant: tagExamples.tag_death.variant
  }
};

// Generate a story that showcases all tag variants
export const AllVariants = () => {
  const container = document.createElement('div');
  container.className = 'flex flex-wrap gap-4 p-6 bg-gray-50 rounded-lg';
  
  // Get all tags from the tag data
  const tags = Object.values(tagExamples);
  
  tags.forEach(tag => {
    const tagElement = document.createElement('span');
    tagElement.className = `tag inline-flex items-center px-2 py-1 text-xs font-medium rounded-md ${getVariantClass(tag.variant)}`;
    tagElement.textContent = tag.text;
    container.appendChild(tagElement);
  });
  
  return container;
};

// Generate a usage guide
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">How to Use This Component</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-atoms/tag.njk" import renderTag %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Insert the component in your template:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderTag(tags.tag_data.tag_adventure) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Use a custom variant directly in the call:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderTag({
  text: 'Custom Tag', 
  variant: 'success'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available content & styles:</h3>
        <p class="text-gray-600 mb-3">Check the following files:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>Content: <code>src/_data/contents/atoms/tags.json</code></li>
          <li>Styles: <code>src/_data/styles/atoms/tag.json</code></li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Create a new content or style:</h3>
        <div class="bg-gray-100 p-3 rounded-md overflow-x-auto">
          <h4 class="font-semibold mb-2">Add content to tags.json:</h4>
          <pre><code class="text-sm text-gray-900">"tag_data": {
  "your_new_tag": {
    "name": "unique_name",
    "text": "Your tag text",
    "variant": "default"
  }
}</code></pre>
          
          <h4 class="font-semibold mt-4 mb-2">Add style to tag.json:</h4>
          <pre><code class="text-sm text-gray-900">"variants": [
  {
    "name": "your_new_variant",
    "class": "tag--custom bg-purple-100 text-purple-800 border border-purple-200"
  }
]</code></pre>
        </div>
      </div>
    </div>
  `;
  
  return usageGuide;
};

Usage.parameters = {
  controls: { hideNoControlsWarning: true, disable: true },
  docs: {
    source: {
      code: null
    }
  }
};