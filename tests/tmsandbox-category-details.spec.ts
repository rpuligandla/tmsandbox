import { expect, test } from "@playwright/test";
import { getExpectedValue } from "../data/tmSandboxTestData";
import { debugConfig, debugLog } from "../utils/debugConfig";

/**
 * TM Sandbox API Test Suite
 *
 * Testing API: https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false
 *
 * Acceptance Criteria:
 * AC1: Name = "Carbon credits"
 * AC2: CanRelist = true
 * AC3: Promotions element with Name = "Gallery" has Description containing "Good position in category"
 
 */

test.describe("TM Sandbox API - Category Details Validation", () => {
  const apiUrl =
    "https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false";

  let apiResponse: any;
  let responseData: any;

  test.beforeAll(async ({ request }) => {
    debugLog(`Starting TM Sandbox API tests using: ${apiUrl}`);

    apiResponse = await request.get(apiUrl);
    responseData = await apiResponse.json();

    debugLog("API Response Status:", apiResponse.status(), "logApiResponses");
    debugLog(
      "Response Headers:",
      JSON.stringify(apiResponse.headers(), null, 2),
      "logApiResponses"
    );
    debugLog(
      "Response Data Structure:",
      JSON.stringify(responseData, null, 2),
      "logApiResponses"
    );
  });

  test("should return successful response with 200 status code", async () => {
    expect(apiResponse.status()).toBe(200);
    expect(responseData).toBeDefined();
    expect(responseData).not.toBeNull();

    debugLog("API returned successful with 200 response");
  });

  test("should have valid JSON response structure", async () => {
    expect(responseData).toHaveProperty("Name");
    expect(responseData).toHaveProperty("CanRelist");
    expect(responseData).toHaveProperty("Promotions");

    expect(typeof responseData.Name).toBe("string");
    expect(typeof responseData.CanRelist).toBe("boolean");
    expect(Array.isArray(responseData.Promotions)).toBe(true);

    debugLog("Response has valid structure with correct data types");
  });

  test('AC1: Name should equal "Carbon credits"', async () => {
    expect(responseData.Name).toBeDefined();
    expect(responseData.Name).toBe(getExpectedValue("name"));

    debugLog('AC1 PASSED: Name equals "Carbon credits"');
    debugLog(`   Actual value: "${responseData.Name}"`);
    debugLog(`   Expected value: "${getExpectedValue("name")}"`);
  });

  test("AC2: CanRelist should be true", async () => {
    expect(responseData.CanRelist).toBeDefined();
    expect(responseData.CanRelist).toBe(getExpectedValue("canRelist"));
    expect(typeof responseData.CanRelist).toBe("boolean");

    debugLog("AC2 PASSED: CanRelist is true");
    debugLog(`   Actual value: ${responseData.CanRelist}`);
  });

  test("AC3: Gallery promotion should have correct description", async () => {
    expect(responseData.Promotions).toBeDefined();
    expect(Array.isArray(responseData.Promotions)).toBe(true);
    expect(responseData.Promotions.length).toBeGreaterThan(0);

    // Debug logging for promotions - controlled by debugConfig
    debugLog(
      `Found ${responseData.Promotions.length} promotions in response`,
      undefined,
      "logApiResponses"
    );

    // Log all promotions for debugging
    if (debugConfig.enabled && debugConfig.logApiResponses) {
      responseData.Promotions.forEach((promotion: any, index: number) => {
        debugLog(
          `   Promotion ${index + 1}: Name="${promotion.Name}"` +
            " && " +
            ` Description="${promotion.Description}"`,
          undefined,
          "logApiResponses"
        );
      });
    }

    const galleryPromotion = responseData.Promotions.find(
      (promotion: any) => promotion.Name === "Gallery"
    );

    expect(galleryPromotion).toBeDefined();
    expect(galleryPromotion).not.toBeNull();
    expect(galleryPromotion.Name).toBe("Gallery");

    expect(galleryPromotion.Description).toBeDefined();
    expect(typeof galleryPromotion.Description).toBe("string");
    expect(galleryPromotion.Description).toContain(
      getExpectedValue("galleryDescriptionText")
    );
  });

  test("Comprehensive validation - All acceptance criteria together", async () => {
    debugLog("Running comprehensive validation of all acceptance criteria...");

    // AC1: Name validation
    expect(responseData.Name).toBe("Carbon credits");
    debugLog("   AC1: Name validation passed");

    // AC2: CanRelist validation
    expect(responseData.CanRelist).toBe(true);
    debugLog("   AC2: CanRelist validation passed");

    // AC3: Gallery promotion validation
    const galleryPromotion = responseData.Promotions.find(
      (promotion: any) => promotion.Name === "Gallery"
    );

    expect(galleryPromotion).toBeDefined();
    expect(galleryPromotion.Description).toContain("Good position in category");
    debugLog("   AC3: Gallery promotion validation passed");

    debugLog("ALL ACCEPTANCE CRITERIA VALIDATED SUCCESSFULLY!");

    debugLog("\nValidation Summary:");
    debugLog(
      `Name: "${responseData.Name}", CanRelist: ${responseData.CanRelist}`
    );
  });

  test("Performance validation - Response time under 5 seconds", async ({
    request,
  }) => {
    const startTime = Date.now();

    const response = await request.get(apiUrl);

    const responseTime = Date.now() - startTime;

    expect(response.status()).toBe(200);

    // Validate response time is acceptable (under 5 seconds)
    expect(responseTime).toBeLessThan(5000);

    debugLog(
      `API Response Time: ${responseTime}ms`,
      undefined,
      "logPerformance"
    );

    if (responseTime < 1000) {
      debugLog(
        "Excellent performance: Under 1 second",
        undefined,
        "logPerformance"
      );
    } else if (responseTime < 2000) {
      debugLog(
        "Good performance: Under 2 seconds",
        undefined,
        "logPerformance"
      );
    } else {
      debugLog(
        "Acceptable performance: Under 5 seconds",
        undefined,
        "logPerformance"
      );
    }
  });

  test.afterAll(async () => {
    debugLog("TM Sandbox API tests completed.");
  });
});
