# Publishing to NPM

This document contains instructions for publishing the venezuela-territorial-2025 package to NPM.

## Prerequisites

1. Ensure you have an NPM account: https://www.npmjs.com/signup
2. Login to NPM from the command line:
   ```bash
   npm login
   ```

## Pre-publication Checklist

1. **Verify package.json**:
   - Check that the version is correct (currently 1.0.0)
   - Verify all dependencies are up to date
   - Ensure the package name is available on NPM

2. **Run all checks**:
   ```bash
   # Install dependencies
   npm install

   # Run type checking
   npm run type-check

   # Run linting
   npm run lint

   # Run tests
   npm test

   # Build the project
   npm run build
   ```

3. **Verify build output**:
   - Check that the `dist/` folder contains:
     - `index.js` (CommonJS)
     - `index.esm.js` (ES Modules)
     - `index.d.ts` (TypeScript definitions)

## Publishing Steps

### Dry Run (Recommended first)
```bash
npm publish --dry-run
```

This will show you exactly what files will be included in the package without actually publishing.

### Actual Publishing
```bash
npm publish
```

The `prepublishOnly` script will automatically run all checks before publishing.

## Post-Publication

1. **Verify the package**: Visit https://www.npmjs.com/package/venezuela-territorial-2025
2. **Test installation**: Try installing the package in a test project:
   ```bash
   npm install venezuela-territorial-2025
   ```

## Version Management

For future releases, update the version using:

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major
```

Then publish:
```bash
npm publish
```

## Troubleshooting

### Common Issues

1. **Package name already exists**:
   - Choose a different package name in `package.json`
   - Consider scoped packages: `@hackhit/venezuela-territorial-2025`

2. **Authentication errors**:
   - Run `npm login` again
   - Check your NPM account permissions

3. **Build errors**:
   - Ensure all dependencies are installed
   - Check TypeScript configuration
   - Verify all tests pass

### File Inclusion

The package includes only these files (as specified in `package.json` and `.npmignore`):
- `dist/` (built files)
- `README.md`
- `LICENSE`
- `package.json`

Source files, tests, and configuration files are excluded from the published package.

## Contact

For questions or issues:
- Email: contact@hackhit.info
- Website: https://www.hackhit.info