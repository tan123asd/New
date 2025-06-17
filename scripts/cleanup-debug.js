// Cleanup script to remove debug logs from the project
// Run this script when you want to clean up debug logs for production

import fs from 'fs';
import path from 'path';

const filesToClean = [
  'src/services/api.js',
  'src/components/Header.js',
  'src/pages/LoginPage.js'
];

function removeDebugLogs(filePath) {
  try {
    const fullPath = path.resolve(filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Remove console.log, console.warn debug lines that contain 'Debug log'
    content = content.replace(/\s*console\.(log|warn)\([^)]*Debug log[^)]*\);\s*/g, '');
    content = content.replace(/\s*\/\/ Debug log.*$/gm, '');
    
    // Remove lines that only contain debug-specific comments
    content = content.replace(/^\s*\/\/ Debug log.*$/gm, '');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Cleaned debug logs from: ${filePath}`);
  } catch (error) {
    console.error(`Error cleaning ${filePath}:`, error.message);
  }
}

console.log('Cleaning debug logs from project files...');

filesToClean.forEach(removeDebugLogs);

console.log('Debug log cleanup complete!');
