# 🚀 Getting Started - TM Sandbox API Testing Suite

Complete guide for new users to set up, run, and work with the TM Sandbox API testing project.

## 📋 Table of Contents

1. [Project Setup for New Users](#-project-setup-for-new-users)
2. [Installing Dependencies](#-installing-dependencies)
3. [Getting Started with Tests](#-getting-started-with-tests)
4. [Writing New Tests](#-writing-new-tests)
5. [Generating Reports](#-generating-reports)
6. [Useful Commands & Tips](#-useful-commands--tips)
7. [GitHub Actions CI/CD](#-github-actions-cicd)
8. [Troubleshooting](#-troubleshooting)

---

## 🎯 Project Setup for New Users

### Prerequisites

Before you begin, ensure you have:

- **Node.js v16+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

### Initial Setup

```bash
# 1. Clone the repository
git clone <your-repository-url>
cd automation/api

# 2. Verify Node.js version
node --version  # Should be v16 or higher

# 3. Install all dependencies and browsers
npm run setup
```

---

## 📦 Installing Dependencies

### Automated Setup (Recommended)

```bash
# Complete setup in one command
npm run setup
```

This command will:

- Install all npm dependencies
- Download Playwright browsers (Chrome, Firefox, Safari)
- Set up the testing environment

### Manual Setup (Step by Step)

```bash
# 1. Install project dependencies
npm install

# 2. Install Playwright browsers
npm run install:browsers

# 3. Install system dependencies (Linux/Mac)
npx playwright install-deps
```

### Verify Installation

```bash
# Check if everything is working
npm run test:tmsandbox:line
```

**Expected output:**

```
🚀 Starting TM Sandbox API tests...
📍 API Endpoint: https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false
✅ AC1 PASSED: Name equals "Carbon credits"
✅ AC2 PASSED: CanRelist is true
✅ AC3 PASSED: Gallery promotion found with correct description
```

---

## 🧪 Getting Started with Tests

### Understanding the Test Structure

```
tests/
├── tmsandbox-category-details.spec.ts  # Main TM Sandbox API tests
├── jsonplaceholder.api.spec.ts         # Example API tests
└── advanced.api.spec.ts                # Advanced testing patterns
```

### Running Your First Test

```bash
# Run TM Sandbox API tests
npm run test:tmsandbox

# Run with detailed console output
npm run test:tmsandbox:line

# Run specific acceptance criteria
npm run test:acceptance

# Run performance tests
npm run test:performance
```

### Test Categories

#### **1. Acceptance Criteria Tests**

Validates the three main requirements:

- **AC1:** Name = "Carbon credits"
- **AC2:** CanRelist = true
- **AC3:** Gallery promotion description contains "Good position in category"

#### **2. Performance Tests**

- Response time validation (< 5 seconds)
- API reliability checks

#### **3. Data Integrity Tests**

- JSON structure validation
- Data type verification
- Error handling

---

## ✍️ Writing New Tests

### Basic Test Template

Create new test files following this pattern:

```typescript
import { test, expect } from "@playwright/test";

test.describe("My New API Tests", () => {
  test("should validate API response", async ({ request }) => {
    // Make API call
    const response = await request.get("https://api.example.com/endpoint");

    // Validate response
    expect(response.status()).toBe(200);

    // Validate data
    const data = await response.json();
    expect(data).toHaveProperty("expectedField");
  });
});
```

### Writing Tests for TM Sandbox API

```typescript
test("AC4: New acceptance criteria", async ({ request }) => {
  const response = await request.get(
    "https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false"
  );

  const data = await response.json();

  // Add your validation here
  expect(data.SomeField).toBe("ExpectedValue");
});
```

### Test Naming Conventions

- **Acceptance Criteria:** `AC1: Description of criteria`
- **Performance Tests:** `Performance: Description`
- **Error Handling:** `Error: Description`
- **Data Validation:** `Data: Description`

---

## 📊 Generating Reports

### Local Report Generation

```bash
# Run tests and generate report
npm run test:tmsandbox:report

# Generate report for specific tests
npm run test:acceptance:report
npm run test:performance:report

# View existing report
npm run test:report
```

### Report Locations

- **HTML Report:** `playwright-report/index.html`
- **JSON Results:** `test-results/results.json`
- **JUnit Report:** `test-results/results.xml`

### Report Features

#### **HTML Report Includes:**

- 📊 Test execution summary
- ⏱️ Performance metrics
- 🔍 Detailed test logs
- 📈 Visual charts and graphs
- 💻 Console output for debugging

#### **Accessing Reports:**

```bash
# Open report in default browser
npm run test:report

# View report on specific port
npx playwright show-report --host=localhost --port=9323
```

---

## 🛠 Useful Commands & Tips

### Essential Commands

```bash
# Quick test runs
npm run test:tmsandbox           # Run TM Sandbox tests
npm run test:tmsandbox:line      # With console output
npm run test:tmsandbox:debug     # Debug mode
npm run test:tmsandbox:headed    # With browser UI

# Test categories
npm run test:acceptance          # Acceptance criteria only
npm run test:performance         # Performance tests only
npm run test:comprehensive       # All criteria together

# Maintenance
npm run clean                    # Clean test artifacts
npm run lint                     # TypeScript type checking
```

### Debugging Tests

#### **Debug Mode:**

```bash
# Step through tests with debugger
npm run test:tmsandbox:debug
```

#### **UI Mode (Interactive):**

```bash
# Visual test runner
npm run test:ui
```

#### **Console Logging:**

Tests include comprehensive logging:

```
📊 API Response Status: 200
✅ AC1 PASSED: Name equals "Carbon credits"
⚡ API Response Time: 245ms
```

### IDE Setup (VS Code)

Recommended VS Code extensions:

- **Playwright Test for VSCode**
- **TypeScript Importer**
- **REST Client** (for API testing)

---

## 🔄 GitHub Actions CI/CD

### How Tests Run in GitHub Actions

The workflow automatically triggers on:

- **Push** to `main` or `develop` branches
- **Pull Requests** to `main` or `develop`
- **Manual trigger** via GitHub Actions tab

### Workflow Steps

#### **1. Setup Phase**

```yaml
- Checkout code
- Setup Node.js with caching
- Install dependencies (npm ci)
- Install Playwright browsers
```

#### **2. Test Execution**

```yaml
- Run TM Sandbox API tests (fail-fast)
- Run all API tests (continue on error)
```

#### **3. Report Generation**

```yaml
- Generate HTML report
- Create test artifacts
- Deploy to GitHub Pages (public URL)
```

#### **4. Results & Artifacts**

```yaml
- Upload test results (30-day retention)
- Upload HTML reports (7-day retention)
- Create test summary in Actions tab
```

### Accessing CI/CD Results

#### **GitHub Pages Report:**

- URL: `https://yourusername.github.io/your-repo-name/`
- Updates automatically with each test run
- Publicly accessible for team sharing

#### **Artifacts Download:**

1. Go to **Actions** tab in GitHub
2. Click on latest workflow run
3. Scroll to **Artifacts** section
4. Download `test-results-XXX` or `playwright-report-XXX`

#### **Test Summary:**

- Visible in Actions run summary
- Shows pass/fail status
- Includes performance metrics
- Direct link to report

### Workflow Configuration

Located in: `.github/workflows/copilot-setup-steps.yml`

Key features:

- ✅ Parallel test execution
- ✅ Automatic report publishing
- ✅ Artifact management
- ✅ Failure handling
- ✅ Performance monitoring

---

## 🔧 Troubleshooting

### Common Issues

#### **1. Browser Installation Fails**

```bash
# Solution: Install with system dependencies
npx playwright install --with-deps
```

#### **2. Tests Timeout**

```bash
# Check API endpoint accessibility
curl https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false
```

#### **3. Permission Errors (Windows)**

```powershell
# Set execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### **4. Node.js Version Issues**

```bash
# Check version
node --version

# Update Node.js if < v16
# Download from https://nodejs.org/
```

### Debug Commands

```bash
# Clean everything and restart
npm run clean
npm run setup
npm run test:tmsandbox:line

# Check TypeScript issues
npm run lint

# Verbose test output
npx playwright test tmsandbox-category-details.spec.ts --reporter=list

# Test specific scenario
npx playwright test tmsandbox-category-details.spec.ts -g "AC1"
```

### Getting Help

#### **Console Output Analysis:**

- ✅ **Green checkmarks** = Tests passing
- ❌ **Red X marks** = Tests failing
- ⚡ **Lightning bolt** = Performance metrics
- 📊 **Chart icon** = Statistics

#### **Log Locations:**

- Test logs: Console output during test runs
- Error details: `test-results/` directory
- Screenshots: `test-results/` (on failures)
- Videos: `test-results/` (on failures)

---

## 📈 Next Steps

### After Successful Setup:

1. **Run Initial Tests**

   ```bash
   npm run test:tmsandbox:report
   ```

2. **Explore Reports**

   - Open the generated HTML report
   - Review test execution details
   - Check performance metrics

3. **Write Your First Test**

   - Copy existing test pattern
   - Modify for your requirements
   - Run and validate

4. **Set Up CI/CD**

   - Push code to trigger GitHub Actions
   - Verify workflow execution
   - Access published reports

5. **Team Integration**
   - Share repository access
   - Document API changes
   - Set up notifications

---

## 📞 Support & Resources

### Documentation Links

- [Playwright API Testing](https://playwright.dev/docs/api-testing)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [GitHub Actions](https://docs.github.com/en/actions)

### Project Structure

- **Tests:** `tests/tmsandbox-category-details.spec.ts`
- **Config:** `playwright.config.ts`
- **Scripts:** `package.json`
- **Workflows:** `.github/workflows/`

### Quick Reference

```bash
# Essential commands
npm run setup                    # Initial setup
npm run test:tmsandbox:report   # Run tests + report
npm run clean                   # Clean artifacts
npm run lint                    # Type checking
```

**🎉 You're now ready to start testing with the TM Sandbox API test suite!**
