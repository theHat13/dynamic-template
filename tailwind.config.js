import fs from "fs";

// Tokens loading
const loadTokens = (file) => {
  const path = `./src/design-tokens/tokens/${file}.json`;
  return fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, "utf8")) : {};
};

export default {
  content: ["./src/**/*.{html,js,njk}"],
  theme: {
    extend: {
      fontFamily: loadTokens("typography").fontFamily || {},
      fontSize: loadTokens("typography").fontSizes || {},
      colors: loadTokens("colors") || {},
      boxShadow: loadTokens("elevation") || {},
      borderRadius: loadTokens("borderRadius") || {},
      spacing: loadTokens("spacing") || {},
      width: loadTokens("layout").widths || {},
      height: loadTokens("layout").heights || {},
      gridTemplateColumns: loadTokens("layout").columns || {},
    },
  },
  plugins: [],
};
