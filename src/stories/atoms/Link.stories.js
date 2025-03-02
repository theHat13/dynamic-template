// src/stories/atoms/Link.stories.js
import nunjucks from 'nunjucks';
import linkData from '../../_data/components/atoms/link.json';

// Simple Nunjucks template string for the link component
const linkTemplate = `
  <a 
    href="{{ href }}" 
    class="link link--{{ variant }} {{ variantClass }}"
  >
    {{ text }}
  </a>
`;

/**
 * Helper function to determine CSS class based on link variant
 * Uses the same styling logic from link.json but applied directly in JavaScript
 */
function getVariantClass(variant) {
  // Find the matching variant in linkData or use default
  const foundVariant = linkData.variants.find(v => v.name === variant);
  
  if (foundVariant && foundVariant.class) {
    // Extract just the styling part (removing the link--variant part which we add separately)
    return foundVariant.class.replace(`link--${variant}`, '').trim();
  }
  
  // Fallback to a simple default style
  return 'text-gray-800 hover:text-gray-600 transition-colors duration-200';
}

export default {
  title: 'Atoms/Link',
  tags: ['autodocs'],
  
  render: (args) => {
    // Get styling from the link.json variants
    const variantClass = getVariantClass(args.variant);
    
    // Render the template with Nunjucks
    return nunjucks.renderString(linkTemplate, {
      href: args.href,
      text: args.text,
      variant: args.variant,
      variantClass: variantClass
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
        options: linkData.variants.map(v => v.name)
      },
      defaultValue: 'default'
    }
  }
};

// Default link variant story
export const Default = {
  args: {
    href: '#',
    text: 'Default Link',
    variant: 'default'
  }
};

// Primary link variant story
export const Primary = {
  args: {
    href: '/home',
    text: 'Primary Link',
    variant: 'primary'
  }
};

// Secondary link variant story
export const Secondary = {
  args: {
    href: '/about',
    text: 'Secondary Link', 
    variant: 'secondary'
  }
};

export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'usage-guide';
  usageGuide.innerHTML = `
    <h2>How to Use This Component</h2>
    
    <h3>1. Import the macro at the top of your page:</h3>
    <pre><code>{% from "02-atoms-navigation/link.njk" import renderLink %}</code></pre>
    
    <h3>2. Insert the component in your template:</h3>
    <pre><code>{{ renderLink(links.link_data.link_home) }}</code></pre>
    
    <h3>3. You can also specify a custom variant directly in the call:</h3>
    <pre><code>{{ renderLink(links.link_data.link_home, "primary") }}</code></pre>
    
    <h3>4. Replace "link_home" with the name of your specific link:</h3>
    <p>Available links are defined in src/_data/links.json. To add new links, edit the link_data section in links.json:</p>
    <pre><code>{
"link_data": {
  "your_new_link_name": {
    "href": "/your-path",
    "text": "Link Text",
    "variant": "default" // Optional: can be "default", "primary", or "secondary"
  }
}
}</code></pre>
    
    <h3>5. Style variants are defined in src/_data/link.json:</h3>
    <p>To modify or add variants, edit the variants section in link.json:</p>
    <pre><code>{
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
