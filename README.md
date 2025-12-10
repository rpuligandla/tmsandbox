# Playwright API Testing Setup

This project is set up for API testing using Playwright with TypeScript.

## 📁 Project Structure

```
c:\automation\api\
├── tests/                          # Test files
│   ├── jsonplaceholder.api.spec.ts # Basic API tests
│   └── advanced.api.spec.ts        # Advanced scenarios
├── utils/                          # Utility functions
│   └── apiHelper.ts               # Common API test utilities
├── data/                          # Test data
│   └── testData.ts               # Test datasets
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install
```

## 🧪 Running Tests

### Run all tests

```bash
npm test
```

### Run tests in headed mode (with browser UI)

```bash
npm run test:headed
```

### Run tests in debug mode

```bash
npm run test:debug
```

### Run tests with UI mode

```bash
npm run test:ui
```

### View test reports

```bash
npm run test:report
```

## 📝 Test Examples

### Basic API Test Example

```typescript
test("GET /posts - should retrieve all posts", async ({ request }) => {
  const response = await request.get("/posts");

  expect(response.status()).toBe(200);

  const posts = await response.json();
  expect(Array.isArray(posts)).toBeTruthy();
  expect(posts.length).toBeGreaterThan(0);
});
```

### POST Request Example

```typescript
test("POST /posts - should create new post", async ({ request }) => {
  const newPost = {
    title: "Test Post Title",
    body: "This is a test post body",
    userId: 1,
  };

  const response = await request.post("/posts", {
    data: newPost,
  });

  expect(response.status()).toBe(201);

  const createdPost = await response.json();
  expect(createdPost.title).toBe(newPost.title);
});
```

## 🛠 Configuration

### Base URL

The default base URL is set to `https://jsonplaceholder.typicode.com` in `playwright.config.ts`.

### Timeouts

- Global timeout: 30 seconds
- Test timeout: Can be configured per test

### Reporters

- HTML reporter for interactive results
- JSON reporter for CI/CD integration
- JUnit reporter for test management systems

## 🔧 Utilities

### ApiHelper Class

Located in `utils/apiHelper.ts`, provides common functionality:

- `validateStatusCode()` - Validates HTTP status codes
- `validateHeaders()` - Validates response headers
- `validateJsonStructure()` - Validates JSON response structure
- `validateArrayResponse()` - Validates array responses
- `createTestData()` - Creates test data with timestamps
- `waitForCondition()` - Polling utility for async operations
- `validateResponseTime()` - Performance validation

### Test Data

Located in `data/testData.ts`, contains:

- Sample users, posts, and comments
- Invalid data scenarios for negative testing

## 📊 Test Reports

Test results are saved in:

- `test-results/` - Raw test results and artifacts
- `playwright-report/` - HTML report (viewable with `npm run test:report`)

## 🎯 Best Practices

1. **Use descriptive test names** that clearly state what is being tested
2. **Group related tests** using `test.describe()`
3. **Use proper assertions** to validate both positive and negative scenarios
4. **Clean up test data** when testing against mutable APIs
5. **Use test data objects** for consistency and maintainability
6. **Validate response structure** not just status codes
7. **Test error scenarios** including invalid inputs and edge cases
8. **Use utilities** to reduce code duplication

## 🔍 Debugging

### Debug Mode

Run tests in debug mode to step through them:

```bash
npm run test:debug
```

### Console Logging

Use `ApiHelper.logApiCall()` for detailed request/response logging.

### Visual Mode

Use UI mode to see tests running in real-time:

```bash
npm run test:ui
```

## 🤝 Contributing

When adding new tests:

1. Follow the existing naming convention (`*.api.spec.ts`)
2. Add utility functions to `apiHelper.ts` if they're reusable
3. Add test data to `testData.ts` if it's reusable
4. Update this README if adding new features

## 📚 Resources

- [Playwright API Testing Documentation](https://playwright.dev/docs/api-testing)
- [Playwright Test Configuration](https://playwright.dev/docs/test-configuration)
- [JSONPlaceholder API Documentation](https://jsonplaceholder.typicode.com/)
