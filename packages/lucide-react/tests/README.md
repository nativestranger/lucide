# Lucide React Tests

## UMD Build Test

The `umd-test.html` file provides comprehensive testing for the UMD build of lucide-react.

### Running the Test

1. **Build the package first:**
   ```bash
   cd packages/lucide-react
   pnpm build
   ```

2. **Open the test file:**
   ```bash
   open tests/umd-test.html
   ```
   Or serve it via a local HTTP server:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000/tests/umd-test.html
   ```

### Test Coverage

The UMD test validates:

1. **Library Loading**: Verifies the global `LucideReact` object is available
2. **Global Structure**: Checks for required properties (`icons`, `createLucideIcon`, `Icon`)
3. **Icon Rendering**: Tests rendering of common icons (Heart, Star, Home)
4. **Dynamic Creation**: Validates `createLucideIcon` functionality
5. **Icons Grid**: Displays a sample of available icons

### Expected Results

All tests should pass with green checkmarks. The page will display:
- ✓ Success messages for each test
- Rendered icons demonstrating functionality
- A grid of sample icons

### Troubleshooting

If tests fail:
- Ensure the UMD build exists at `../dist/umd/lucide-react.min.js`
- Check browser console for JavaScript errors
- Verify React and ReactDOM are loading from CDN
- Confirm the build process completed successfully
