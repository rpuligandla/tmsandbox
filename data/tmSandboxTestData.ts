// File: c:\automation\api\data\tmSandboxTestData.ts

/**
 * Test data and expected values for TM Sandbox API tests
 */

export const TMSandboxTestData = {
  // API Configuration
  apiEndpoint:
    "https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false",

  // Expected Values (Acceptance Criteria)
  expectedValues: {
    name: "Carbon credits",
    canRelist: true,
    galleryPromotionName: "Gallery",
    galleryDescriptionText: "Good position in category",
  },

  // Test Constants
  testConstants: {
    maxResponseTime: 5000, // 5 seconds
    expectedStatusCode: 200,
    expectedContentType: "application/json",
    minPromotionsCount: 1,
  },

  // Validation Rules
  validationRules: {
    nameValidation: {
      required: true,
      type: "string",
      expectedValue: "Carbon credits",
      caseSensitive: true,
    },
    canRelistValidation: {
      required: true,
      type: "boolean",
      expectedValue: true,
    },
    promotionsValidation: {
      required: true,
      type: "array",
      minLength: 1,
      requiredPromotions: ["Gallery"],
    },
    galleryPromotionValidation: {
      required: true,
      descriptionMustContain: "Good position in category",
      caseSensitive: false,
    },
  },

  // Error Messages
  errorMessages: {
    nameIncorrect: 'Name field does not match expected value "Carbon credits"',
    canRelistIncorrect: "CanRelist field is not true",
    galleryNotFound: "Gallery promotion not found in Promotions array",
    galleryDescriptionIncorrect:
      "Gallery promotion description does not contain required text",
    invalidResponseStructure: "Response does not have expected structure",
    performanceIssue: "API response time exceeds acceptable threshold",
  },

  // Test Scenarios
  testScenarios: {
    happyPath: {
      description: "All acceptance criteria should pass",
      expectedResult: "success",
    },
    performanceTest: {
      description: "API should respond within acceptable time limits",
      maxResponseTime: 5000,
    },
    dataIntegrityTest: {
      description: "All data types and structures should be valid",
      validateTypes: true,
    },
  },
};

// Helper function to get expected values
export function getExpectedValue(
  key: keyof typeof TMSandboxTestData.expectedValues
) {
  return TMSandboxTestData.expectedValues[key];
}

// Helper function to get validation rule
export function getValidationRule(
  key: keyof typeof TMSandboxTestData.validationRules
) {
  return TMSandboxTestData.validationRules[key];
}

// Helper function to get error message
export function getErrorMessage(
  key: keyof typeof TMSandboxTestData.errorMessages
) {
  return TMSandboxTestData.errorMessages[key];
}
