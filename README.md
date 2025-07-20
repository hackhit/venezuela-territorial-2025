# Venezuela Territorial 2025

[![npm version](https://badge.fury.io/js/venezuela-territorial-2025.svg)](https://badge.fury.io/js/venezuela-territorial-2025)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Build Status](https://github.com/hackhit/venezuela-territorial-2025/workflows/CI/badge.svg)](https://github.com/hackhit/venezuela-territorial-2025/actions)
[![Coverage Status](https://coveralls.io/repos/github/hackhit/venezuela-territorial-2025/badge.svg?branch=main)](https://coveralls.io/github/hackhit/venezuela-territorial-2025?branch=main)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Modern Venezuela territorial data library with TypeScript support and enhanced features for 2025. Built on top of the original [venezuela](https://www.npmjs.com/package/venezuela) package with modern JavaScript/TypeScript patterns, async/await support, caching, and comprehensive type safety.

## Features

- **Modern TypeScript**: Full TypeScript support with comprehensive types
- **Async/Await**: Promise-based API for better async handling
- **Smart Caching**: Built-in caching system for better performance
- **Type Safety**: Comprehensive TypeScript definitions
- **Modern Build**: ESM and CommonJS support
- **Well Tested**: Comprehensive test suite with Vitest
- **Great DX**: Excellent developer experience with IntelliSense
- **Universal**: Works in Node.js and modern browsers

## Installation

```bash
# npm
npm install venezuela-territorial-2025

# yarn
yarn add venezuela-territorial-2025

# pnpm
pnpm add venezuela-territorial-2025
```

## Quick Start

### Basic Usage

```typescript
import { createVenezuelaTerritory } from 'venezuela-territorial-2025';

// Create instance with default configuration
const territory = createVenezuelaTerritory();

// Get state information
const stateResult = await territory.getState('Zulia');
if (stateResult.success) {
  console.log(`State: ${stateResult.data.name}`);
  console.log(`Capital: ${stateResult.data.capital}`);
  console.log(`Municipalities: ${stateResult.data.municipalities.length}`);
}

// Get municipality information
const municipalityResult = await territory.getMunicipality('Maracaibo');
if (municipalityResult.success) {
  console.log(`Municipality: ${municipalityResult.data.name}`);
  console.log(`State: ${municipalityResult.data.state}`);
}
```

### Advanced Configuration

```typescript
import { VenezuelaTerritory } from 'venezuela-territorial-2025';

const territory = new VenezuelaTerritory({
  language: 'es',
  cacheEnabled: true,
  validateData: true,
  includeMetadata: true
});

// Search across all territorial divisions
const searchResults = await territory.search('Caracas');
console.log('Found states:', searchResults.states.length);
console.log('Found municipalities:', searchResults.municipalities.length);
console.log('Found parishes:', searchResults.parishes.length);

// Get comprehensive statistics
const stats = await territory.getStats();
console.log(`Total states: ${stats.totalStates}`);
console.log(`Total municipalities: ${stats.totalMunicipalities}`);
console.log(`Total parishes: ${stats.totalParishes}`);
```

### Error Handling

```typescript
const result = await territory.getState('NonExistentState');

if (!result.success) {
  console.error('Error:', result.error);
  console.log('Timestamp:', result.timestamp);
} else {
  console.log('State data:', result.data);
}
```

## API Reference

### Main Class: `VenezuelaTerritory`

#### Constructor

```typescript
new VenezuelaTerritory(config?: Partial<VenezuelaConfig>)
```

#### Methods

##### `getState(name: string, options?: SearchOptions): Promise<SearchResult<VenezuelanState>>`

Get information about a Venezuelan state.

##### `getMunicipality(name: string, options?: SearchOptions): Promise<SearchResult<Municipality>>`

Get information about a Venezuelan municipality.

##### `getParish(name: string, options?: SearchOptions): Promise<SearchResult<Parish>>`

Get information about a Venezuelan parish.

##### `getAllStates(): Promise<SearchResult<VenezuelanState[]>>`

Get all Venezuelan states with their complete information.

##### `search(query: string, options?: SearchOptions): Promise<SearchResults>`

Search across all territorial divisions.

##### `getStats(): Promise<TerritorialStats>`

Get comprehensive territorial statistics.

##### `clearCache(): void`

Clear the internal cache.

### Types

```typescript
interface VenezuelanState {
  readonly name: string;
  readonly capital: string;
  readonly municipalities: readonly Municipality[];
  readonly area?: number;
  readonly population?: number;
  readonly iso?: string;
}

interface Municipality {
  readonly name: string;
  readonly state: string;
  readonly parishes: readonly Parish[];
  readonly capital?: string;
  readonly area?: number;
  readonly population?: number;
}

interface Parish {
  readonly name: string;
  readonly municipality: string;
  readonly state: string;
  readonly type: 'civil' | 'ecclesiastical';
  readonly area?: number;
  readonly population?: number;
}
```

## Development

### Prerequisites

- Node.js >= 20.0.0
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/hackhit/venezuela-territorial-2025.git
cd venezuela-territorial-2025

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

### Scripts

- `npm run build` - Build the project
- `npm run dev` - Build in watch mode
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier
- `npm run type-check` - Type checking
- `npm run docs` - Generate documentation

## Browser Support

This library supports modern browsers and Node.js environments:

- **Node.js**: >= 20.0.0
- **Chrome**: >= 88
- **Firefox**: >= 85
- **Safari**: >= 14
- **Edge**: >= 88

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass
- Follow conventional commit messages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Miguel Hernandez - hackhit 2025**
- Website: [https://www.hackhit.info](https://www.hackhit.info)
- Email: contact@hackhit.info

## Acknowledgments

- Original [venezuela](https://www.npmjs.com/package/venezuela) package by [jobsamuel](https://github.com/jobsamuel)
- Venezuelan territorial data sources
- Open source community

## Roadmap

- [ ] Add geolocation coordinates for all territories
- [ ] Include population and area data
- [ ] Add historical data support
- [ ] Implement fuzzy search
- [ ] Add REST API wrapper
- [ ] Mobile app integration examples
- [ ] GeoJSON export functionality
- [ ] Multi-language support expansion

## Issues

If you find any bugs or have feature requests, please create an issue on [GitHub Issues](https://github.com/hackhit/venezuela-territorial-2025/issues).

## Support

- Email: 83knmujyb@mozmail.com
- Discussions: [GitHub Discussions](https://github.com/hackhit/venezuela-territorial-2025/discussions)


---

Made with love for the Venezuelan developer community by Miguel Hernandez - hackhit 2025
