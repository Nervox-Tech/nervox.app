# Nervox Overview

**Nervox** is a personalized AI-powered task manager designed to help users organize and manage their tasks efficiently with AI assistance.

Note: This doc will be updated as the features are added now it's just a placeholder.

## Project Structure

This is a monorepo built with **Turborepo** and **pnpm** workspaces.

```
nervox.app/
├── apps/
│   ├── client/          # Frontend application (React + Vite)
│   └── server/          # Backend API (NestJS)
├── packages/
│   ├── eslint-config/   # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
└── ...
```

## Tech Stack

### Frontend (Client)

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Rich Text**: Slate
- **Drag & Drop**: DnD Kit
- **Testing**: Vitest

### Backend (Server)

- **Framework**: NestJS
- **Runtime**: Node.js (>=18)
- **Testing**: Jest

### Development Tools

- **Monorepo**: Turborepo
- **Package Manager**: pnpm 9.0.0
- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Husky with lint-staged
- **Commit Linting**: Commitlint (conventional commits)

## Prerequisites

- **Node.js**: >= 18
- **pnpm**: 9.0.0

## Getting Started

### Installation

```bash
pnpm install
```

### Development

Run all apps in development mode:

```bash
pnpm dev
```

Run only the client:

```bash
pnpm dev:client
```

### Building

Build all apps:

```bash
pnpm build
```

### Testing

Run tests:

```bash
pnpm test
```

### Code Quality

Lint all packages:

```bash
pnpm lint
```

Format code:

```bash
pnpm format
```

Type checking:

```bash
pnpm check-types
```

## License

See [LICENSE](LICENSE) file for details.

```


```
