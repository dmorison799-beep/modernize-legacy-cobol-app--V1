# Node.js Accounting System

A modern Node.js CLI application converted from a legacy COBOL accounting system. This application provides terminal-based account management with credit, debit, and balance viewing capabilities.

## Quick Start

```bash
cd node-app
npm install
npm start
```

## Architecture

```
node-app/
├── src/
│   ├── main.js          # CLI menu loop (MainProgram equivalent)
│   ├── operations.js    # Business logic (Operations equivalent)
│   └── data.js          # Data persistence (DataProgram equivalent)
├── tests/
│   ├── unit/
│   │   ├── data.test.js
│   │   └── operations.test.js
│   └── integration/
│       └── accounting.test.js
├── package.json
└── .eslintrc.json
```

## Module Mapping

| COBOL Source | Node.js Module | Responsibility |
|---|---|---|
| `main.cob` | `src/main.js` | User interface, menu loop, I/O |
| `operations.cob` | `src/operations.js` | Credit, debit, view balance logic |
| `data.cob` | `src/data.js` | In-memory balance storage |

## Running Tests

```bash
# All tests with coverage
npm test

# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration
```

## Linting

```bash
npm run lint
```

## Application Usage

The application presents a menu-driven interface:

```
--------------------------------
Account Management System
1. View Balance
2. Credit Account
3. Debit Account
4. Exit
--------------------------------
Enter your choice (1-4):
```

### Operations
- **View Balance**: Displays the current account balance
- **Credit Account**: Adds funds to the account
- **Debit Account**: Withdraws funds (with insufficient funds protection)
- **Exit**: Terminates the application

## Design Decisions

- **Class-based architecture**: Enables dependency injection and testability
- **In-memory DataStore**: Preserves original COBOL behavior; easily replaceable with a database
- **Async readline**: Node.js standard for non-blocking CLI I/O
- **Jest testing**: Industry standard with built-in coverage reporting
- **ESLint**: Enforces consistent code style
