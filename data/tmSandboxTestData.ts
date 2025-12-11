/**
 * Test data and expected values for TM Sandbox API tests
 */

export const tmSandboxTestData = {
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
};

// Helper function to get expected values
export function getExpectedValue(
  key: keyof typeof tmSandboxTestData.expectedValues
) {
  return tmSandboxTestData.expectedValues[key];
}
