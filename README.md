# dnd-kit-solid

Solid.js bindings for [dnd-kit](https://github.com/clauderic/dnd-kit), the modern, lightweight, performant, accessible and extensible drag & drop toolkit.

This library provides Solid.js components and hooks that wrap the core functionality of dnd-kit, bringing its powerful drag and drop capabilities to Solid.js applications.

## Features

- Full TypeScript support
- Accessible drag and drop
- Customizable sensors (mouse, touch, keyboard)
- Sortable lists and grids
- Drag overlays
- Collision detection
- Custom modifiers
- And more!

## Install

```bash
npm i dnd-kit-solid
```

## Development

### Setup

```bash
# Install dependencies
npm install
```

### Development Mode

Start the development server with the playground:

```bash
npm run dev
```

This will start a development server at http://localhost:3000 where you can see your changes in real-time.

### Building

Build the library for production:

```bash
npm run build
```

This generates:

- CommonJS build in `dist/cjs/`
- ES Modules build in `dist/esm/`
- TypeScript type definitions in `dist/types/`

### Testing

```bash
# Run tests
npm test

# Check code quality
npm run lint

# Fix linting issues
npm run lint:fix
```

## Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-username/sorta.git
   cd sorta
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create** a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Make** your changes and ensure:
   - All tests pass (`npm test`)
   - Code is properly linted (`npm run lint`)
   - TypeScript types are correct
   - Documentation is updated
6. **Commit** your changes with a descriptive message
7. **Push** to your fork
8. **Create** a Pull Request

### Development Guidelines

- Follow the existing code style and patterns
- Write tests for new features
- Update documentation as needed
- Keep the bundle size minimal
- Ensure cross-browser compatibility
- Use TypeScript for type safety
- Maintain compatibility with the original dnd-kit API where possible
- Follow Solid.js best practices

### Code of Conduct

Please be respectful and considerate of others when contributing. We follow the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) code of conduct.

## License

MIT
