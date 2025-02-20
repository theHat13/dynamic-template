// Design tokens

export default {
    content: [
      "./src/**/*.{html,njk,js}", 
      "./public/**/*.html"
    ],
    theme: {
      extend: {
        // TYPOGRAPHY
        fontFamily: {
          sans: ["Inter", "sans-serif"],
          serif: ["Merriweather", "serif"],
        },
        fontSize: {
          sm: "0.875rem",
          base: "1rem",
          lg: "1.125rem",
          xl: "1.25rem",
          "2xl": "1.5rem",
          "3xl": "1.875rem",
        },
  
        // COLORS
        colors: {
          orange: {
            50: "oklch(0.98 0.016 73.684)",
            100: "oklch(0.954 0.038 75.164)",
            200: "oklch(0.901 0.076 70.697)",
            300: "oklch(0.837 0.128 66.29)",
            400: "oklch(0.75 0.183 55.934)",
            500: "oklch(0.705 0.213 47.604)",
            600: "oklch(0.646 0.222 41.116)",
            700: "oklch(0.553 0.195 38.402)",
            800: "oklch(0.47 0.157 37.304)",
            900: "oklch(0.408 0.123 38.172)",
            950: "oklch(0.266 0.079 36.259)",
          },
        },
  
        // ELEVATION
        boxShadow: {
          sm: "0px 1px 2px rgba(0, 0, 0, 0.05)",
          DEFAULT: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          md: "0px 6px 12px rgba(0, 0, 0, 0.15)",
          lg: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          xl: "0px 15px 30px rgba(0, 0, 0, 0.25)",
        },
  
        // BORDER RADIUS
        borderRadius: {
          none: "0px",
          sm: "0.125rem",
          DEFAULT: "0.25rem",
          lg: "0.5rem",
          xl: "0.75rem",
          "2xl": "1rem",
          "3xl": "1.5rem",
        },
  
        // SPACING
        spacing: {
          px: "1px",
          0: "0px",
          1: "0.25rem",
          2: "0.5rem",
          3: "0.75rem",
          4: "1rem",
          5: "1.25rem",
          6: "1.5rem",
          8: "2rem",
          10: "2.5rem",
          12: "3rem",
          16: "4rem",
          20: "5rem",
        },
  
        // LAYOUT
        gridTemplateColumns: {
          2: "repeat(2, minmax(0, 1fr))",
          3: "repeat(3, minmax(0, 1fr))",
          4: "repeat(4, minmax(0, 1fr))",
        },
        width: {
          sm: "24rem",
          md: "32rem",
          lg: "40rem",
          xl: "48rem",
          "2xl": "56rem",
          full: "100%",
        },
      },
    },
    plugins: [],
  };
  