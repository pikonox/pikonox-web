const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all files
const files = execSync('find . -type f -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/.git/*" -not -name "rename.js"').toString().split('\n').filter(Boolean);

let updatedCount = 0;

for (const file of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if file contains the word (case insensitive)
    if (content.toLowerCase().includes('webxprt')) {
      // Replace with case matching
      content = content.replace(/WebXprt/g, 'PikoNox');
      content = content.replace(/WEBXPRT/g, 'PIKONOX');
      content = content.replace(/webxprt/g, 'pikonox');
      
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
      updatedCount++;
    }
  } catch (e) {
    // Ignore binary files or unreadable files
  }
}

console.log(`\nSuccessfully updated ${updatedCount} files.`);
