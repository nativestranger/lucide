#!/usr/bin/env node
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const DEFAULT_CORE_ICONS = [
  'zap', 'rocket', 'heart', 'star', 'house', 'user', 'settings', 'search',
  'mail', 'phone', 'calendar', 'clock', 'download', 'upload', 'check',
  'x', 'plus', 'minus', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down',
  'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down',
  'menu', 'more-horizontal', 'more-vertical', 'edit', 'trash', 'copy',
  'external-link', 'eye', 'eye-off', 'lock', 'unlock', 'info', 'alert-circle'
];

function extractPathsFromSvg(svgContent) {
  const pathRegex = /<path[^>]*d="([^"]*)"[^>]*>/g;
  const paths = [];
  let match;
  while ((match = pathRegex.exec(svgContent)) !== null) {
    paths.push(match[1]);
  }
  return paths;
}

function buildPathsUmd(allowList) {
  const iconsDir = join(process.cwd(), '../../icons');
  const iconsList = allowList || DEFAULT_CORE_ICONS;
  const pathsMap = {};
  
  console.log(`Building paths UMD with ${iconsList.length} icons...`);
  
  for (const iconName of iconsList) {
    const svgPath = join(iconsDir, `${iconName}.svg`);
    try {
      const svgContent = readFileSync(svgPath, 'utf-8');
      const paths = extractPathsFromSvg(svgContent);
      if (paths.length > 0) {
        pathsMap[iconName] = paths;
        console.log(`✓ ${iconName}: ${paths.length} paths`);
      } else {
        console.warn(`⚠ ${iconName}: no paths found`);
      }
    } catch (error) {
      console.warn(`⚠ ${iconName}: file not found, skipping`);
    }
  }
  
  const umdContent = `(function(global,factory){typeof exports==='object'&&typeof module!=='undefined'?factory(exports):typeof define==='function'&&define.amd?define(['exports'],factory):(global=typeof globalThis!=='undefined'?globalThis:global||self,factory(global.LucidePaths={}));})(this,(function(exports){'use strict';var iconPaths=${JSON.stringify(pathsMap)};if(typeof window!=='undefined'){window.LucidePaths=iconPaths;}Object.assign(exports,iconPaths);exports.default=iconPaths;}));`;

  const outputPath = join(process.cwd(), 'dist/umd/lucide-paths.js');
  writeFileSync(outputPath, umdContent);
  
  const minOutputPath = join(process.cwd(), 'dist/umd/lucide-paths.min.js');
  writeFileSync(minOutputPath, umdContent);
  
  console.log(`\n✅ Built UMD paths bundle:`);
  console.log(`   Regular: ${outputPath} (${Math.round(umdContent.length / 1024)}KB)`);
  console.log(`   Minified: ${minOutputPath} (${Math.round(umdContent.length / 1024)}KB)`);
  console.log(`   Icons included: ${Object.keys(pathsMap).length}`);
}

if (require.main === module) {
  const allowListArg = process.argv[2];
  let allowList;
  
  if (allowListArg) {
    if (allowListArg.endsWith('.json')) {
      try {
        const jsonContent = readFileSync(allowListArg, 'utf-8');
        allowList = JSON.parse(jsonContent);
      } catch (error) {
        console.error(`Error reading allowlist file: ${error}`);
        process.exit(1);
      }
    } else {
      allowList = allowListArg.split(',').map(s => s.trim());
    }
  }
  
  buildPathsUmd(allowList);
}

module.exports = { buildPathsUmd };
