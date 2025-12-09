/**
 * Neumorphism shadow utilities
 * These functions generate the CSS box-shadow values for neumorphic effects
 */

export type NeuShadowType = "flat" | "pressed" | "convex" | "concave";

export interface NeuShadowConfig {
  distance?: number;
  blur?: number;
  intensity?: number;
}

/**
 * Default shadow configuration
 */
const defaultConfig: Required<NeuShadowConfig> = {
  distance: 6,
  blur: 12,
  intensity: 1,
};

/**
 * Get CSS classes for neumorphic shadow effects
 */
export function getNeuClasses(
  type: NeuShadowType = "flat",
  _isActive?: boolean
): string {
  const baseClasses = "transition-shadow duration-200 ease-in-out";
  
  switch (type) {
    case "flat":
      return `${baseClasses} shadow-neu-flat-light dark:shadow-neu-flat-dark`;
    case "pressed":
      return `${baseClasses} shadow-neu-pressed-light dark:shadow-neu-pressed-dark`;
    case "convex":
      return `${baseClasses} shadow-neu-flat-light dark:shadow-neu-flat-dark`;
    case "concave":
      return `${baseClasses} shadow-neu-pressed-light dark:shadow-neu-pressed-dark`;
    default:
      return baseClasses;
  }
}

/**
 * Generate inline shadow styles for more control
 */
export function getNeuStyle(
  type: NeuShadowType = "flat",
  config: NeuShadowConfig = {}
): React.CSSProperties {
  const { distance, blur } = { ...defaultConfig, ...config };
  
  const lightShadow = "hsl(var(--shadow-light))";
  const darkShadow = "hsl(var(--shadow-dark))";
  
  switch (type) {
    case "flat":
      return {
        boxShadow: `${-distance}px ${-distance}px ${blur}px ${lightShadow}, ${distance}px ${distance}px ${blur}px ${darkShadow}`,
      };
    case "pressed":
      return {
        boxShadow: `inset ${-distance}px ${-distance}px ${blur}px ${lightShadow}, inset ${distance}px ${distance}px ${blur}px ${darkShadow}`,
      };
    case "convex":
      return {
        boxShadow: `${-distance}px ${-distance}px ${blur}px ${lightShadow}, ${distance}px ${distance}px ${blur}px ${darkShadow}, inset 1px 1px 2px ${lightShadow}, inset -1px -1px 2px ${darkShadow}`,
      };
    case "concave":
      return {
        boxShadow: `${-distance}px ${-distance}px ${blur}px ${lightShadow}, ${distance}px ${distance}px ${blur}px ${darkShadow}, inset -1px -1px 2px ${lightShadow}, inset 1px 1px 2px ${darkShadow}`,
      };
    default:
      return {};
  }
}
