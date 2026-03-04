import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = join(__dirname, '../dist');

// Add "use client" directive to the built files
const files = ['index.js', 'index.cjs'];

files.forEach(file => {
  const filePath = join(distDir, file);
  const content = readFileSync(filePath, 'utf-8');

  // Check if "use client" already exists
  if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
    const newContent = `"use client";\n${content}`;
    writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Added "use client" to ${file}`);
  } else {
    console.log(`✓ "use client" already exists in ${file}`);
  }
});
