#!/usr/bin/env node
const { readFileSync, writeFileSync, mkdirSync } = require('fs');
const { join } = require('path');

function extractPathsFromSvg(svgContent) {
  const pathRegex = /<path[^>]*d="([^"]*)"[^>]*>/g;
  const paths = [];
  let match;
  while ((match = pathRegex.exec(svgContent)) !== null) {
    paths.push(match[1]);
  }
  return paths;
}

function buildIconJsons() {
  const iconsDir = join(process.cwd(), '../../icons');
  const outputDir = join(process.cwd(), 'dist/icons');
  
  // Create output directory
  mkdirSync(outputDir, { recursive: true });
  
  const { readdir } = require('fs');
  readdir(iconsDir, (err, files) => {
    if (err) {
      console.error('Error reading icons directory:', err);
      return;
    }
    
    const svgFiles = files.filter(file => file.endsWith('.svg'));
    console.log(`Building ${svgFiles.length} individual icon JSON files...`);
    
    svgFiles.forEach(file => {
      const iconName = file.replace('.svg', '');
      const svgPath = join(iconsDir, file);
      
      try {
        const svgContent = readFileSync(svgPath, 'utf-8');
        const paths = extractPathsFromSvg(svgContent);
        
        if (paths.length > 0) {
          const iconJson = { paths };
          const outputPath = join(outputDir, `${iconName}.json`);
          writeFileSync(outputPath, JSON.stringify(iconJson));
          
          if (svgFiles.indexOf(file) % 100 === 0) {
            console.log(`✓ Processed ${svgFiles.indexOf(file) + 1}/${svgFiles.length} icons`);
          }
        }
      } catch (error) {
        console.warn(`⚠ ${iconName}: error processing`);
      }
    });
    
    console.log(`\n✅ Built ${svgFiles.length} icon JSON files in dist/icons/`);
  });
}

buildIconJsons();

module.exports = { buildIconJsons };
