#!/usr/bin/env node
// @ts-ignore
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface IconConfig {
  name: string;
  paths: string[];
}

// Default core icons - commonly used subset
const DEFAULT_CORE_ICONS = [
  'zap', 'rocket', 'heart', 'star', 'home', 'user', 'settings', 'search',
  'mail', 'phone', 'calendar', 'clock', 'download', 'upload', 'check',
  'x', 'plus', 'minus', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down',
  'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down',
  'menu', 'more-horizontal', 'more-vertical', 'edit', 'trash', 'copy',
  'external-link', 'eye', 'eye-off', 'lock', 'unlock', 'info', 'alert-circle'
];

function extractPathsFromSvg(svgContent: string): string[] {
  const pathRegex = /<path[^>]*d="([^"]*)"[^>]*>/g;
  const paths: string[] = [];
  let match;
  
  while ((match = pathRegex.exec(svgContent)) !== null) {
    paths.push(match[1]);
  }
  
  return paths;
}

function buildPathsUmd(allowList?: string[]): void {
  const iconsDir = join(process.cwd(), '../../icons');
  const iconsList = allowList || DEFAULT_CORE_ICONS;
  const pathsMap: Record<string, string[]> = {};
  
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
  
  // Generate UMD bundle
  const umdContent = `/*!
 * Lucide Paths UMD Build
 * Generated from lucide-react
 * Contains ${Object.keys(pathsMap).length} icon path definitions
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.LucidePaths = {}));
})(this, (function (exports) {
  'use strict';
  
  var iconPaths = ${JSON.stringify(pathsMap, null, 2)};
  
  // Expose as global
  if (typeof window !== 'undefined') {
    window.LucidePaths = iconPaths;
  }
  
  // Export for module systems
  Object.assign(exports, iconPaths);
  exports.default = iconPaths;
}));`;

  // Write the UMD file
  const outputPath = join(process.cwd(), 'dist/umd/lucide-paths.js');
  writeFileSync(outputPath, umdContent);
  
  // Write minified version (simple minification)
  const minifiedContent = umdContent
    .replace(/\s+/g, ' ')
    .replace(/;\s+/g, ';')
    .replace(/,\s+/g, ',')
    .replace(/{\s+/g, '{')
    .replace(/\s+}/g, '}');
    
  const minOutputPath = join(process.cwd(), 'dist/umd/lucide-paths.min.js');
  writeFileSync(minOutputPath, minifiedContent);
  
  console.log(`\n✅ Built UMD paths bundle:`);
  console.log(`   Regular: ${outputPath} (${Math.round(umdContent.length / 1024)}KB)`);
  console.log(`   Minified: ${minOutputPath} (${Math.round(minifiedContent.length / 1024)}KB)`);
  console.log(`   Icons included: ${Object.keys(pathsMap).length}`);
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const allowListArg = process.argv[2];
  let allowList: string[] | undefined;
  
  if (allowListArg) {
    if (allowListArg.endsWith('.json')) {
      // Load from JSON file
      try {
        const jsonContent = readFileSync(allowListArg, 'utf-8');
        allowList = JSON.parse(jsonContent);
      } catch (error) {
        console.error(`Error reading allowlist file: ${error}`);
        process.exit(1);
      }
    } else {
      // Comma-separated list
      allowList = allowListArg.split(',').map(s => s.trim());
    }
  }
  
  buildPathsUmd(allowList);
}

export { buildPathsUmd };
