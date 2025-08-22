<p align="center">
  <a href="https://github.com/lucide-icons/lucide">
    <img src="https://lucide.dev/package-logos/lucide-react.svg" alt="Lucide icon library for React applications." width="540">
  </a>
</p>

<p align="center">
Lucide icon library for React applications.
</p>

<div align="center">

  [![npm](https://img.shields.io/npm/v/lucide-react?color=blue)](https://www.npmjs.com/package/lucide-react)
  ![NPM Downloads](https://img.shields.io/npm/dw/lucide-react)
  [![GitHub](https://img.shields.io/github/license/lucide-icons/lucide)](https://lucide.dev/license)
</div>

<p align="center">
  <a href="https://lucide.dev/guide/">About</a>
  ·
  <a href="https://lucide.dev/icons/">Icons</a>
  ·
  <a href="https://lucide.dev/guide/packages/lucide-react">Documentation</a>
  ·
  <a href="https://lucide.dev/license">License</a>
</p>

# Lucide React

Implementation of the lucide icon library for React applications.

## Installation

```sh
pnpm add lucide-react
```

```sh
npm install lucide-react
```

```sh
yarn add lucide-react
```

```sh
bun add lucide-react
```

## CDN Usage (UMD)

For quick prototyping or projects without build tools, you can use the UMD build via CDN:

```html
<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/lucide-react@latest/dist/umd/lucide-react.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script>
    const { Heart, Star, Settings } = LucideReact.icons;
    const { createLucideIcon } = LucideReact;
    
    // Use icons directly
    const heartIcon = React.createElement(Heart, { size: 24, color: 'red' });
    ReactDOM.render(heartIcon, document.getElementById('root'));
  </script>
</body>
</html>
```

### UMD Global Structure

The UMD build exposes `LucideReact` globally with:

- `LucideReact.icons` - Object containing all icon components (1600+ icons)
- `LucideReact.createLucideIcon` - Function to create custom icons
- `LucideReact.Icon` - Base Icon component

### Custom Icon Creation

```javascript
const CustomIcon = LucideReact.createLucideIcon('CustomIcon', [
  ['path', { d: 'M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z' }]
]);

const customElement = React.createElement(CustomIcon, { 
  size: 32, 
  color: 'blue' 
});
```

**Bundle Size:** ~817KB minified (includes all 1600+ icons)

## Documentation

For full documentation, visit [lucide.dev](https://lucide.dev/guide/packages/lucide-react)

## Community

Join the [Discord server](https://discord.gg/EH6nSts) to chat with the maintainers and other users.

## License

Lucide is licensed under the ISC license. See [LICENSE](https://lucide.dev/license).

## Sponsors

<a href="https://vercel.com?utm_source=lucide&utm_campaign=oss">
  <img src="https://lucide.dev/vercel.svg" alt="Powered by Vercel" width="200" />
</a>

<a href="https://www.digitalocean.com/?refcode=b0877a2caebd&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"><img src="https://lucide.dev/digitalocean.svg" width="200" alt="DigitalOcean Referral Badge" /></a>

### Awesome backers 🍺

<a href="https://www.scipress.io?utm_source=lucide"><img src="https://lucide.dev/sponsors/scipress.svg" width="180" alt="Scipress sponsor badge" /></a>
<a href="https://github.com/pdfme/pdfme"><img src="https://lucide.dev/sponsors/pdfme.svg" width="180" alt="pdfme sponsor badge" /></a>
