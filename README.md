# TM Sandbox API Testing Suite

This project provides automated API testing for the TM Sandbox API using Playwright with TypeScript. It specifically tests the category details endpoint with comprehensive validation of response structure and business rules.

## Project Structure

```
c:\automation\tmsandbox\
├── tests/                              # Test files
│   └── tmsandbox-category-details.spec.ts # TM Sandbox API tests
├── utils/                              # Utility functions
│   ├── tmSandboxHelper.ts             # TM Sandbox specific utilities
│   └── debugConfig.ts                 # Debug logging configuration
├── data/                              # Test data
│   └── tmSandboxTestData.ts          # TM Sandbox test datasets
├── playwright-report/                 # HTML test reports
├── test-results/                      # Test execution results
├── playwright.config.ts              # Playwright configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies and scripts
```

## Quick Start

### Prerequisites

- Node.js v16+
- Git

### Setup & Run Tests

```bash
# 1. Clone and setup
git clone <repository-url>
cd tmsandbox
npm run setup

# 2. Run tests
npm test

# 3. View reports
npm run test:report
```

## What This Project Tests

This project tests the TM Sandbox API category details endpoint:

- **API Endpoint**: `https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false`

### Acceptance Criteria Validated

- **AC1**: Name = "Carbon credits"
- **AC2**: CanRelist = true
- **AC3**: Promotions element with Name = "Gallery" has Description containing "Good position in category"

## Running Tests

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

## Debug Logging

Configurable debug logging system with single-switch control. See [Getting Started Guide](docs/GETTING_STARTED_GUIDE.md#debug-logging-system) for detailed setup.

```typescript
// Quick toggle in utils/debugConfig.ts
export const debugConfig: DebugConfig = {
  enabled: false, // Master switch - controls all logging
};
```

## Test Examples

### Category Details Validation Test

```typescript
test('AC1: Category Name should be "Carbon credits"', async () => {
  expect(responseData.Name).toBe(getExpectedValue("name"));
});

test("AC2: CanRelist should be true", async () => {
  expect(responseData.CanRelist).toBe(
    TMSandboxTestData.expectedValues.canRelist
  );
});

test("AC3: Gallery promotion should have correct description", async () => {
  const galleryPromotion = responseData.Promotions.find(
    (promotion) => promotion.Name === "Gallery"
  );

  expect(galleryPromotion.Description).toContain("Good position in category");
});
```

### API Response Structure Validation

```typescript
test("Category details should have valid structure", async () => {
  expect(responseData).toHaveProperty("Name");
  expect(responseData).toHaveProperty("CanRelist");
  expect(Array.isArray(responseData.Promotions)).toBe(true);
  expect(typeof responseData.Name).toBe("string");
  expect(typeof responseData.CanRelist).toBe("boolean");
});
```

## Configuration

### API Endpoint

The TM Sandbox API endpoint is configured in `data/tmSandboxTestData.ts`:

- **URL**: `https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false`
- **Method**: GET
- **Response Format**: JSON

### Timeouts

- Global timeout: 30 seconds
- Test timeout: Can be configured per test
- Maximum response time: 5 seconds (as defined in test data)

### Reporters

- HTML reporter for interactive results
- JSON reporter for CI/CD integration
- JUnit reporter for test management systems

## Utilities

### TM Sandbox Helper Functions

Located in `utils/tmSandboxHelper.ts` - **These are placeholder functions for future use**:

- `validateCategoryDetailsStructure()` - Validates category details response structure
- `findPromotionByName()` - Finds specific promotions in the promotions array
- `validatePromotionStructure()` - Validates individual promotion objects
- `validateTextContains()` - Text validation with case-insensitive option
- `validateApiResponse()` - API response validation

_Note: These helper functions are not currently used in tests but are available for future test development._

### Debug Configuration

Located in `utils/debugConfig.ts`, provides centralized debug logging control:

- `debugConfig` - Master configuration object with logging switches
- `debugLog()` - Smart logging function that respects configuration settings
- **Categories**: API responses, validation steps, performance metrics
- **Master Switch**: Single `enabled` flag to control all logging

### Test Data

Located in `data/tmSandboxTestData.ts`, contains:

- Expected values for acceptance criteria validation
- API endpoint configuration
- Test data organized by acceptance criteria

## Test Reports

Test results are saved in:

- `test-results/` - Raw test results and artifacts
- `playwright-report/` - HTML report (viewable with `npm run test:report`)

## GitHub Actions CI/CD

The project includes automated testing via GitHub Actions:

- **Trigger**: Runs automatically on every commit/push to `main` or `develop` branches
- **Environment**: Ubuntu latest with Node.js LTS
- **Execution**: Runs all tests with debug logging disabled for clean CI output
- **Artifacts**: Test results and HTML reports are uploaded as artifacts with 7-day retention
- **Workflow File**: `.github/workflows/api-test.yml`

### Accessing CI Results

1. **GitHub Actions Tab**: View test execution status and logs
2. **Artifacts**: Download test results and HTML reports from completed workflow runs
3. **Test Summary**: Automated summary with pass/fail status in workflow output

## Best Practices

1. **Test Structure**: Tests are organized by acceptance criteria (AC1, AC2, AC3)
2. **Data-Driven Testing**: All expected values are centralized in `tmSandboxTestData.ts`
3. **Reusable Utilities**: Common validation logic is in helper functions
4. **Performance Monitoring**: Response time validation included
5. **Comprehensive Logging**: Detailed console output for debugging
6. **Single API Call**: Uses `beforeAll` to make one API call for all tests
7. **Structured Validation**: Validates both data content and structure
8. **Error Handling**: Meaningful error messages with available data context

## Debugging

### Troubleshooting

```bash
npm run test:debug     # Step through tests
npm run test:ui        # Visual test runner
npm run clean && npm run setup  # Reset environment

# Check API accessibility
curl "https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false"
```

## Adding New Tests

1. Follow naming convention: `tmsandbox-*.spec.ts`
2. Add reusable functions to `utils/tmSandboxHelper.ts`
3. Add test data to `data/tmSandboxTestData.ts`
4. Update README if needed

## Resources

- [Playwright Documentation](https://playwright.dev/docs/api-testing)
