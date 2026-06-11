import { readFileSync, existsSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "platform.html",
  "practice-areas.html",
  "insights.html",
  "contact.html",
  "styles.css",
  "main.js"
];

const requiredLinks = {
  "index.html": ["platform.html", "practice-areas.html", "insights.html", "contact.html"],
  "platform.html": ["index.html", "practice-areas.html", "insights.html", "contact.html"],
  "practice-areas.html": ["index.html", "platform.html", "insights.html", "contact.html"],
  "insights.html": ["index.html", "platform.html", "practice-areas.html", "contact.html"],
  "contact.html": ["index.html", "platform.html", "practice-areas.html", "insights.html"]
};

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

for (const [file, links] of Object.entries(requiredLinks)) {
  const content = readFileSync(file, "utf8");
  for (const link of links) {
    if (!content.includes(`href="${link}"`)) {
      throw new Error(`${file} is missing a navigation link to ${link}`);
    }
  }

  if (!content.includes('href="styles.css"')) {
    throw new Error(`${file} is missing the shared stylesheet`);
  }

  if (!content.includes('src="main.js"')) {
    throw new Error(`${file} is missing the shared script`);
  }

  if (!content.includes("LexReason")) {
    throw new Error(`${file} does not include the project branding`);
  }
}

console.log("LexReason site validation passed.");
