import fs from "fs";
import path from "path";

const inputPath = "./src/design-tokens/variables.json";
const outputPath = "./src/design-tokens/tailwind-tokens.json";

// Check if the file exists
if (!fs.existsSync(inputPath)) {
  console.error("The file variables.json was not found!");
  process.exit(1);
}

// Read and parse the JSON file
const rawData = JSON.parse(fs.readFileSync(inputPath, "utf8"));

let tokens = {};

// Loop through collections to extract variables
rawData.collections.forEach(collection => {
  collection.modes.forEach(mode => {
    mode.variables.forEach(variable => {
      if (!variable.isAlias) {
        // Clean the name (replace / with - for Tailwind)
        const key = variable.name.replace(/\//g, "-").replace(",", ".");
        tokens[key] = variable.value;
      }
    });
  });
});

// Write the transformed file
fs.writeFileSync(outputPath, JSON.stringify(tokens, null, 2));
console.log(`File generated: ${outputPath}`);
