// File: c:\automation\api\utils\tmSandboxHelper.ts

import { expect } from "@playwright/test";

/**
 * TM Sandbox API Helper
 * Utility functions specific to TM Sandbox API testing
 */
export class TMSandboxHelper {
  /**
   * Validates the basic structure of category details response
   */
  static validateCategoryDetailsStructure(data: any): void {
    const requiredFields = ["Name", "CanRelist", "Promotions"];

    requiredFields.forEach((field) => {
      expect(data).toHaveProperty(field);
    });

    expect(Array.isArray(data.Promotions)).toBe(true);

    console.log("✅ Category details structure validated");
  }

  /**
   * Finds a promotion by name in the promotions array
   */
  static findPromotionByName(promotions: any[], promotionName: string): any {
    if (!Array.isArray(promotions)) {
      throw new Error("Promotions must be an array");
    }

    const promotion = promotions.find((p) => p.Name === promotionName);

    if (!promotion) {
      const availablePromotions = promotions.map((p) => p.Name).join(", ");
      throw new Error(
        `Promotion with name '${promotionName}' not found. Available promotions: ${availablePromotions}`
      );
    }

    console.log(`📍 Found promotion: ${promotionName}`);
    return promotion;
  }

  /**
   * Validates promotion structure and required fields
   */
  static validatePromotionStructure(promotion: any): void {
    const requiredFields = ["Name", "Description"];

    requiredFields.forEach((field) => {
      expect(promotion).toHaveProperty(field);
      expect(typeof promotion[field]).toBe("string");
      expect(promotion[field].length).toBeGreaterThan(0);
    });

    console.log(`✅ Promotion structure validated for: ${promotion.Name}`);
  }

  /**
   * Validates that text contains expected substring (case-insensitive option)
   */
  static validateTextContains(
    text: string,
    expectedSubstring: string,
    caseSensitive: boolean = false
  ): void {
    if (!caseSensitive) {
      expect(text.toLowerCase()).toContain(expectedSubstring.toLowerCase());
    } else {
      expect(text).toContain(expectedSubstring);
    }

    console.log(
      `✅ Text validation passed: "${text}" contains "${expectedSubstring}"`
    );
  }

  /**
   * Validates API response structure and performance
   */
  static async validateApiResponse(
    response: any,
    expectedStatus: number = 200,
    maxResponseTime?: number
  ): Promise<any> {
    // Validate status code
    expect(response.status()).toBe(expectedStatus);

    // Validate content type
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("application/json");

    // Parse JSON response
    const data = await response.json();
    expect(data).toBeDefined();

    console.log(`✅ API response validated (Status: ${response.status()})`);
    return data;
  }

  /**
   * Logs detailed API response information for debugging
   */
  static logApiResponse(response: any, data: any): void {
    console.log("\n=== TM SANDBOX API RESPONSE DETAILS ===");
    console.log(`Status: ${response.status()}`);
    console.log(`Status Text: ${response.statusText()}`);
    console.log("Headers:", JSON.stringify(response.headers(), null, 2));
    console.log("Response Data:", JSON.stringify(data, null, 2));
    console.log("========================================\n");
  }

  /**
   * Validates all acceptance criteria in one function
   */
  static validateAllAcceptanceCriteria(data: any): {
    ac1Result: boolean;
    ac2Result: boolean;
    ac3Result: boolean;
    galleryPromotion?: any;
  } {
    const results = {
      ac1Result: false,
      ac2Result: false,
      ac3Result: false,
      galleryPromotion: undefined as any,
    };

    try {
      // AC1: Name = "Carbon credits"
      if (data.Name === "Carbon credits") {
        results.ac1Result = true;
        console.log('✅ AC1 PASSED: Name equals "Carbon credits"');
      } else {
        console.log(
          `❌ AC1 FAILED: Expected "Carbon credits", got "${data.Name}"`
        );
      }

      // AC2: CanRelist = true
      if (data.CanRelist === true) {
        results.ac2Result = true;
        console.log("✅ AC2 PASSED: CanRelist is true");
      } else {
        console.log(`❌ AC2 FAILED: Expected true, got ${data.CanRelist}`);
      }

      // AC3: Gallery promotion with correct description
      const galleryPromotion = data.Promotions?.find(
        (p: any) => p.Name === "Gallery"
      );
      if (
        galleryPromotion &&
        galleryPromotion.Description?.includes("Good position in category")
      ) {
        results.ac3Result = true;
        results.galleryPromotion = galleryPromotion;
        console.log("✅ AC3 PASSED: Gallery promotion has correct description");
      } else {
        console.log(
          "❌ AC3 FAILED: Gallery promotion not found or incorrect description"
        );
      }
    } catch (error) {
      console.error("Error during acceptance criteria validation:", error);
    }

    return results;
  }

  /**
   * Creates a comprehensive test report
   */
  static generateTestReport(data: any, responseTime: number): string {
    const report = `
=== TM SANDBOX API TEST REPORT ===
Timestamp: ${new Date().toISOString()}
API Endpoint: https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false
Response Time: ${responseTime}ms

ACCEPTANCE CRITERIA RESULTS:
AC1 - Name: "${data.Name}" ${
      data.Name === "Carbon credits" ? "✅ PASS" : "❌ FAIL"
    }
AC2 - CanRelist: ${data.CanRelist} ${
      data.CanRelist === true ? "✅ PASS" : "❌ FAIL"
    }
AC3 - Gallery Description: ${
      this.checkGalleryDescription(data) ? "✅ PASS" : "❌ FAIL"
    }

DATA STRUCTURE:
${JSON.stringify(data, null, 2)}
===================================
`;
    return report;
  }

  private static checkGalleryDescription(data: any): boolean {
    const galleryPromotion = data.Promotions?.find(
      (p: any) => p.Name === "Gallery"
    );
    return (
      galleryPromotion?.Description?.includes("Good position in category") ||
      false
    );
  }
}
