// Enhanced Icon component with fallback loading for Ruby on Vibes
import React, { useState, useEffect } from 'react';

const iconCache = new Map();

export default function Icon({ 
  name, 
  size = 24, 
  strokeWidth = 1.75, 
  className = '', 
  label, 
  decorative = true 
}) {
  const [paths, setPaths] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // First try UMD bundle
    if (typeof window !== 'undefined' && window.LucidePaths && window.LucidePaths[name]) {
      setPaths(window.LucidePaths[name]);
      return;
    }
    
    // Check cache
    if (iconCache.has(name)) {
      setPaths(iconCache.get(name));
      return;
    }
    
    // Fallback: fetch individual icon JSON
    if (name && !loading) {
      setLoading(true);
      fetch(`/rov/assets/lucide/${name}.json`, { cache: 'force-cache' })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.paths) {
            iconCache.set(name, data.paths);
            setPaths(data.paths);
          } else {
            // Fallback to empty paths if icon not found
            iconCache.set(name, []);
            setPaths([]);
          }
        })
        .catch(() => {
          iconCache.set(name, []);
          setPaths([]);
        })
        .finally(() => setLoading(false));
    }
  }, [name, loading]);
  
  const aria = decorative ? { 'aria-hidden': 'true' } : { role: 'img', 'aria-label': label || name };
  
  if (loading) {
    // Simple loading spinner using CSS
    return (
      <div 
        className={`inline-block animate-spin ${className}`}
        style={{ width: size, height: size }}
        {...aria}
      >
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="rgb(var(--fg))" 
          strokeWidth={strokeWidth}
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      </div>
    );
  }
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width={size} 
      height={size} 
      viewBox="0 0 24 24"
      fill="none" 
      stroke="rgb(var(--fg))" 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className} 
      {...aria}
    >
      {(paths || []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
