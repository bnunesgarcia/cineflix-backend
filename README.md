# Cineflix Backend API Tests

This project contains BDD tests for the Cineflix backend REST API using Cucumber, Gherkin, Playwright, and TypeScript.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

To run the tests:
```bash
npm test
```

To run tests in watch mode:
```bash
npm run test:watch
```

## Project Structure

- `features/`: Gherkin feature files
- `features/step-definitions/`: Step definition implementations
- `features/support/`: Hooks and support code
- `src/`: Additional TypeScript code

## Configuration

- `tsconfig.json`: TypeScript configuration
- `.cucumberrc.json`: Cucumber configuration
- `package.json`: Project dependencies and scripts