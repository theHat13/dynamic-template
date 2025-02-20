import typography from './design-tokens/typography.json' assert { type: 'json' };

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: typography.fontFamily.sans,
        serif: typography.fontFamily.serif,
      },
      fontSize: {
        'display-large-bold': typography.fontSize['display-large-bold'],
        'display-small-bold': typography.fontSize['display-small-bold'],
        'heading-h1': typography.fontSize['heading-h1'],
        'heading-h2': typography.fontSize['heading-h2'],
        'heading-h3': typography.fontSize['heading-h3'],
        'heading-h4': typography.fontSize['heading-h4'],
        'body-large-regular': typography.fontSize['body-large-regular'],
        'body-small-regular': typography.fontSize['body-small-regular'],
        'label-large-regular': typography.fontSize['label-large-regular'],
        'label-small-regular': typography.fontSize['label-small-regular'],
        'placeholder': typography.fontSize['placeholder'],
        'comment-small-md': typography.fontSize['comment-small-md'],
      },
      fontWeight: {
        bold: typography.fontWeight.bold,
        regular: typography.fontWeight.regular,
        medium: typography.fontWeight.medium,
      },
      lineHeight: {
        tight: typography.lineHeight.tight,
        relaxed: typography.lineHeight.relaxed,
      },
      letterSpacing: {
        tight: typography.letterSpacing.tight,
        tighter: typography.letterSpacing.tighter,
        normal: typography.letterSpacing.normal,
        wide: typography.letterSpacing.wide,
      },
    },
  },
  variants: {},
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.heading-h1': {
          fontSize: typography.fontSize['heading-h1'],
          fontWeight: typography.fontWeight.bold,
          lineHeight: typography.lineHeight.tight,
          letterSpacing: typography.letterSpacing.tight,
          fontFamily: typography.fontFamily.serif,
        },
        '.heading-h2': {
          fontSize: typography.fontSize['heading-h2'],
          fontWeight: typography.fontWeight.bold,
          lineHeight: typography.lineHeight.tight,
          letterSpacing: typography.letterSpacing.tighter,
          fontFamily: typography.fontFamily.serif,
        },
        '.heading-h3': {
          fontSize: typography.fontSize['heading-h3'],
          fontWeight: typography.fontWeight.bold,
          lineHeight: typography.lineHeight.relaxed,
          letterSpacing: typography.letterSpacing.tight,
          fontFamily: typography.fontFamily.serif,
        },
        '.heading-h4': {
          fontSize: typography.fontSize['heading-h4'],
          fontWeight: typography.fontWeight.bold,
          lineHeight: typography.lineHeight.relaxed,
          letterSpacing: typography.letterSpacing.tight,
          fontFamily: typography.fontFamily.serif,
        },
        // Ajoute d'autres styles ici
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}
