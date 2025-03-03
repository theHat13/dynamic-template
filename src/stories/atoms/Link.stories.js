// src/stories/atoms/Link.stories.js
import nunjucks from 'nunjucks';
import linkData from '../../_data/components/atoms/link.json';
import linksData from '../../_data/contents/atoms/links.json';

// Nunjucks template for rendering links
const linkTemplate = `
  <a 
    href="{{ href }}" 
    class="link link--{{ variant }} {{ variantClass }}"
  >
    {{ text }}
  </a>
`;

// Helper function to get variant-specific CSS classes
function getVariantClass(variant) {
  const foundVariant = linkData.variants.find(v => v.name === variant);
  return foundVariant ? foundVariant.class.replace(`link--${variant}`, '').trim() : '';
}

export default {
  title: 'Atoms/Link',
  tags: ['autodocs'],
  
  // Render function using Nunjucks macro
  render: (args) => {
    return nunjucks.renderString(linkTemplate, {
      href: args.href,
      text: args.text,
      variant: args.variant,
      variantClass: getVariantClass(args.variant)
    });
  },
  
  // Argument types for storybook controls
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
        options: linkData.variants.map(v => v.name)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from links.json
const linkExamples = linksData.link_data;

export const Home = {
  args: {
    href: linkExamples.link_home.href,
    text: linkExamples.link_home.text,
    variant: linkExamples.link_home.variant
  }
};

export const Services = {
  args: {
    href: linkExamples.link_services.href,
    text: linkExamples.link_services.text,
    variant: linkExamples.link_services.variant
  }
};

// Using examples from links.json
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">How to Use This Component</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-atoms-navigation/link.njk" import renderLink %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Insert the component in your template:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderLink(links.link_data.link_home) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. You can also specify a custom variant directly in the call:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderLink(links.link_data.link_home, "primary") }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Replace "link_home" with the name of your specific link:</h3>
        <p class="text-gray-600 mb-3">Available links are defined in src/_data/contents/atoms/links.json. To add new links, edit the link_data section in links.json:</p>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
"link_data": {
  "your_new_link_name": {
    "href": "/your-path",
    "text": "Link Text",
    "variant": "default" // Optional: can be "default", "primary", or "secondary"
  }
}
}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Style variants are defined in src/_data/components/atoms/link.json:</h3>
        <p class="text-gray-600 mb-3">To modify or add variants, edit the variants section in link.json:</p>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
"variants": [
  {
    "name": "your_new_variant",
    "class": "link--custom text-green-600 hover:text-green-800 transition-colors duration-200",
    "styles": {
      "color": "#48bb78",
      "hoverColor": "#2f855a"
    }
  }
]
}</code></pre>
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