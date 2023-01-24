import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  light: {
    primary: "#f3f4f6",
    secondary: "#ffffff",
    tertiary: "#4b5563",
    accent: "#0891b2",
    tint: "#111827",
    gray: "#adb5bd",
  },
};

const TEXT_SIZE = 16;

export const SIZES = {
  base: 8,
  // text sizes
  h1: TEXT_SIZE + 2 * 5,
  h2: TEXT_SIZE + 2 * 4,
  h3: TEXT_SIZE + 2 * 3,
  h4: TEXT_SIZE + 2 * 2,
  h5: TEXT_SIZE + 2,
  p: TEXT_SIZE,
  small: TEXT_SIZE * 0.75,
};

// Movie Card Sizes
export const MovieSizes = StyleSheet.create({
  small: {
    width: width * 0.24,
    height: width * 0.32,
    borderRadius: 8,
  },
  medium: {
    width: width * 0.32,
    height: width * 0.45 + 25,
    borderRadius: 8,
  },
  large: {
    width: width * 0.45,
    height: width * 0.65 + 40,
    borderRadius: 8,
  },
});

export const WEIGHTS = {
  big: "bold",
  h1: "700",
  h2: "600",
  h3: "500",
  p: "400",
  small: "300",
  text: "normal",
};

export const SPACING = {
  xs: SIZES.base * 0.5,
  s: SIZES.base,
  sm: SIZES.base * 1.5,
  m: SIZES.base * 2,
  md: SIZES.base * 2.5,
  l: SIZES.base * 3,
  xl: SIZES.base * 3.5,
  xxl: SIZES.base * 4,
};
