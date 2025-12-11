import { expect } from "@playwright/test";
import { debugLog } from "./debugConfig";

/**
 * Validates the basic structure of category details response
 */
export function validateCategoryDetailsStructure(data: any): void {
  const requiredFields = ["Name", "CanRelist", "Promotions"];

  requiredFields.forEach((field) => {
    expect(data).toHaveProperty(field);
  });

  expect(Array.isArray(data.Promotions)).toBe(true);

  debugLog("Category details structure validated");
}

/**
 * Finds a promotion by name in the promotions array
 */
export function findPromotionByName(
  promotions: any[],
  promotionName: string
): any {
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

  debugLog(`Found promotion: ${promotionName}`);
  return promotion;
}

/**
 * Validates promotion structure and required fields
 */
export function validatePromotionStructure(promotion: any): void {
  const requiredFields = ["Name", "Description"];

  requiredFields.forEach((field) => {
    expect(promotion).toHaveProperty(field);
    expect(typeof promotion[field]).toBe("string");
    expect(promotion[field].length).toBeGreaterThan(0);
  });

  debugLog(`Promotion structure validated for: ${promotion.Name}`);
}

/**
 * Validates that text contains expected substring (case-insensitive option)
 */
export function validateTextContains(
  text: string,
  expectedSubstring: string,
  caseSensitive: boolean = false
): void {
  if (!caseSensitive) {
    expect(text.toLowerCase()).toContain(expectedSubstring.toLowerCase());
  } else {
    expect(text).toContain(expectedSubstring);
  }

  debugLog(`Text validation passed: "${text}" contains "${expectedSubstring}"`);
}

/**
 * Validates API response structure and performance
 */
export async function validateApiResponse(
  response: any,
  expectedStatus: number = 200
): Promise<any> {
  expect(response.status()).toBe(expectedStatus);

  const contentType = response.headers()["content-type"];
  expect(contentType).toContain("application/json");

  const data = await response.json();
  expect(data).toBeDefined();

  debugLog(`API response validated (Status: ${response.status()})`);
  return data;
}
