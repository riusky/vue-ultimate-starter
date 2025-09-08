# vue-ultimate-starter

Out-of-the-box Vue 3 Project Infrastructure, integrating the latest tech stack and best practices to help you quickly dive into business development. This template should help get you started developing with Vue 3 in Vite.

## ✨ Features

- ⚡ Vue 3 + Vite + Bun (Ultra fast frontend toolchain)
- 🎨 Tailwind CSS + UnoCSS (Modern styling solutions)
- 🛠️ Tauri (Build lightweight, secure desktop apps)
- 🌐 Vue I18n (Internationalization support)
- 📱 Responsive & Adaptive Layout
- 🧪 Vitest + Playwright (Unit & E2E testing)
- 🔍 ESLint + Prettier (Code quality assurance)

## Customize configuration

See https://vite.dev/config/.

## 🚀 Project Setup

### Prerequisites

- Install the front-end packaging project https://bun.sh/:

```shell
# Windows
powershell -c "irm bun.sh/install.ps1 | iex"

# Linux & MacOS
curl -fsSL https://bun.sh/install | bash
```

### Installation

```sh
bun install
```

## 🛠 Development

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun run build
```

## 🖥 Tauri Desktop App

### Prerequisites

- Install https://www.rust-lang.org/tools/install
- Install Tauri CLI:
  ```sh
  bun add -g @tauri-apps/cli
  ```

### Build Desktop Application

```sh
# Dev mode (with hot-reload)
bun tauri dev

# Build production package
bun tauri build
```

Supported output formats:
- Windows: `.msi` installer
- macOS: `.app` bundle
- Linux: `.deb` or `.AppImage`

## 🧪 Testing

### Run Unit Tests with https://vitest.dev/

```sh
bun test:unit
```

### Run End-to-End Tests with https://playwright.dev

```sh
# Install browsers for the first run
npx playwright install

# Build project first for CI testing
bun run build

# Run all end-to-end tests
bun test:e2e

# Run tests only on Chromium
bun test:e2e --project=chromium

# Run tests for specific file
bun test:e2e tests/example.spec.ts

# Debug mode
bun test:e2e --debug
```

## 🔍 Linting

### Lint with https://eslint.org/

```sh
bun lint
```

## 🏗 Project Structure

```
.
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable components
│   ├── composables/     # Vue composables
│   ├── pages/           # Application pages
│   ├── plugins/         # Vue plugins
│   ├── router/          # Vue router configuration
│   ├── stores/          # Pinia stores
│   └── styles/          # Global styles
├── src-tauri/           # Tauri desktop app backend
├── tests/               # Test files
└── vite.config.ts       # Vite configuration
```

## 📦 Deployment

### Web Deployment

Build artifacts will be generated in the `dist/` folder.

### Desktop Deployment

Tauri builds are platform-specific. Cross-platform builds require building on each target platform or using CI/CD.

## 📄 License

MIT License