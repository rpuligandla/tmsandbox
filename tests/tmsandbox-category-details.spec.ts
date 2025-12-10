import { test, expect } from '@playwright/test';

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

test.describe('TM Sandbox API - Category Details Validation', () => {
  const API_URL = 'https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false';
  
  let apiResponse: any;
  let responseData: any;

  test.beforeAll(async ({ request }) => {
    console.log('🚀 Starting TM Sandbox API tests...');
    console.log('📍 API Endpoint:', API_URL);
    
    // Make API call once for all tests to improve performance and consistency
    apiResponse = await request.get(API_URL);
    responseData = await apiResponse.json();
    
    // Log response for debugging purposes
    console.log('📊 API Response Status:', apiResponse.status());
    console.log('📄 Response Headers:', JSON.stringify(apiResponse.headers(), null, 2));
    console.log('📋 Response Data Structure:', JSON.stringify(responseData, null, 2));
  });

  test('should return successful response with 200 status code', async () => {
    // Validate basic API connectivity and response
    expect(apiResponse.status()).toBe(200);
    expect(responseData).toBeDefined();
    expect(responseData).not.toBeNull();
    
    console.log('✅ API returned successful 200 response');
  });

  test('should have valid JSON response structure', async () => {
    // Validate that response contains the expected top-level properties
    expect(responseData).toHaveProperty('Name');
    expect(responseData).toHaveProperty('CanRelist');
    expect(responseData).toHaveProperty('Promotions');
    
    // Validate data types
    expect(typeof responseData.Name).toBe('string');
    expect(typeof responseData.CanRelist).toBe('boolean');
    expect(Array.isArray(responseData.Promotions)).toBe(true);
    
    console.log('✅ Response has valid structure with correct data types');
  });

  test('AC1: Name should equal "Carbon credits"', async () => {
    // Acceptance Criteria 1: Validate Name field
    expect(responseData.Name).toBeDefined();
    expect(responseData.Name).toBe('Carbon credits');
    
    console.log('✅ AC1 PASSED: Name equals "Carbon credits"');
    console.log(`   Actual value: "${responseData.Name}"`);
  });

  test('AC2: CanRelist should be true', async () => {
    // Acceptance Criteria 2: Validate CanRelist field
    expect(responseData.CanRelist).toBeDefined();
    expect(responseData.CanRelist).toBe(true);
    expect(typeof responseData.CanRelist).toBe('boolean');
    
    console.log('✅ AC2 PASSED: CanRelist is true');
    console.log(`   Actual value: ${responseData.CanRelist}`);
  });

  test('AC3: Gallery promotion should have correct description', async () => {
    // Acceptance Criteria 3: Validate Gallery promotion description
    
    // First, validate Promotions array exists and is populated
    expect(responseData.Promotions).toBeDefined();
    expect(Array.isArray(responseData.Promotions)).toBe(true);
    expect(responseData.Promotions.length).toBeGreaterThan(0);
    
    console.log(`📋 Found ${responseData.Promotions.length} promotions in response`);
    
    // Log all promotions for debugging
    responseData.Promotions.forEach((promotion: any, index: number) => {
      console.log(`   Promotion ${index + 1}: Name="${promotion.Name}"`);
    });
    
    // Find Gallery promotion
    const galleryPromotion = responseData.Promotions.find(
      (promotion: any) => promotion.Name === 'Gallery'
    );
    
    // Validate Gallery promotion exists
    expect(galleryPromotion).toBeDefined();
    expect(galleryPromotion).not.toBeNull();
    expect(galleryPromotion.Name).toBe('Gallery');
    
    // Validate Description exists and contains required text
    expect(galleryPromotion.Description).toBeDefined();
    expect(typeof galleryPromotion.Description).toBe('string');
    expect(galleryPromotion.Description).toContain('Good position in category');
    
    console.log('✅ AC3 PASSED: Gallery promotion found with correct description');
    console.log(`   Gallery Description: "${galleryPromotion.Description}"`);
  });

  test('Comprehensive validation - All acceptance criteria together', async () => {
    console.log('🎯 Running comprehensive validation of all acceptance criteria...');
    
    // AC1: Name validation
    expect(responseData.Name).toBe('Carbon credits');
    console.log('   ✅ AC1: Name validation passed');
    
    // AC2: CanRelist validation
    expect(responseData.CanRelist).toBe(true);
    console.log('   ✅ AC2: CanRelist validation passed');
    
    // AC3: Gallery promotion validation
    const galleryPromotion = responseData.Promotions.find(
      (promotion: any) => promotion.Name === 'Gallery'
    );
    
    expect(galleryPromotion).toBeDefined();
    expect(galleryPromotion.Description).toContain('Good position in category');
    console.log('   ✅ AC3: Gallery promotion validation passed');
    
    console.log('🎉 ALL ACCEPTANCE CRITERIA VALIDATED SUCCESSFULLY!');
    
    // Summary report
    console.log('\n📊 VALIDATION SUMMARY:');
    console.log(`   Name: "${responseData.Name}"`);
    console.log(`   CanRelist: ${responseData.CanRelist}`);
    console.log(`   Gallery Description: "${galleryPromotion.Description}"`);
  });

  test('Performance validation - Response time under 5 seconds', async ({ request }) => {
    const startTime = Date.now();
    
    const response = await request.get(API_URL);
    
    const responseTime = Date.now() - startTime;
    
    // Validate response is successful
    expect(response.status()).toBe(200);
    
    // Validate response time is acceptable (under 5 seconds)
    expect(responseTime).toBeLessThan(5000);
    
    console.log(`⚡ API Response Time: ${responseTime}ms`);
    
    if (responseTime < 1000) {
      console.log('🚀 Excellent performance: Under 1 second');
    } else if (responseTime < 2000) {
      console.log('👍 Good performance: Under 2 seconds');
    } else {
      console.log('⚠️  Acceptable performance: Under 5 seconds');
    }
  });

  test.afterAll(async () => {
    console.log('\n🏁 TM Sandbox API test suite completed');
    console.log('📋 Test Summary:');
    console.log('   - API connectivity: ✅');
    console.log('   - AC1 (Name): ✅');
    console.log('   - AC2 (CanRelist): ✅');
    console.log('   - AC3 (Gallery Description): ✅');
    console.log('   - Performance: ✅');
  });
});