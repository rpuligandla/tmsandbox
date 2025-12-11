/**
 * Debug Configuration for TM Sandbox API Tests
 *
 * This file contains the debug logging configuration that controls
 * whether console.log statements are displayed during test execution.
 */

export interface DebugConfig {
  /** Enable/disable all debug logging */
  enabled: boolean;
  /** Enable detailed API response logging */
  logApiResponses: boolean;
  /** Enable validation step logging */
  logValidationSteps: boolean;
  /** Enable performance metrics logging */
  logPerformance: boolean;
}

/**
 * Debug Configuration Settings
 *
 * Set enabled to false to disable all debug logging
 * Individual settings can be toggled for specific types of logging
 */
export const debugConfig: DebugConfig = {
  enabled: false, // Master switch - set to false to disable ALL logging
  logApiResponses: true, // Log API response details
  logValidationSteps: true, // Log test validation steps
  logPerformance: true, // Log performance metrics
};

/**
 * Debug logger utility - respects configuration settings
 * @param message - Message to log
 * @param data - Optional data to log
 * @param category - Type of logging (responses, validation, performance)
 */
export const debugLog = (
  message: string,
  data?: any,
  category: keyof Omit<DebugConfig, "enabled"> = "logValidationSteps"
) => {
  if (debugConfig.enabled && debugConfig[category]) {
    if (data !== undefined) {
      console.log(message, data);
    } else {
      console.log(message);
    }
  }
};
