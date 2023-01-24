import { StyleSheet, Text as RNText } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../theme";

const Text = ({
  children,
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  small,
  color,
  weight,
  lines,
  style,
  ...props
}) => {
  const textStyle = StyleSheet.flatten([
    {
      fontSize: SIZES.p,
      fontWeight: "normal",
      color: COLORS.light.tint,
    },
    h1 !== undefined && { fontSize: SIZES.h1 },
    h2 !== undefined && { fontSize: SIZES.h2 },
    h3 !== undefined && { fontSize: SIZES.h3 },
    h4 !== undefined && { fontSize: SIZES.h4 },
    h5 !== undefined && { fontSize: SIZES.h5 },
    p !== undefined && { fontSize: SIZES.p },
    small !== undefined && { fontSize: SIZES.small },
    color !== undefined && { color: color },
    weight !== undefined && { fontWeight: weight },
  ]);
  return (
    <RNText style={[textStyle, style]} {...props} numberOfLines={lines}>
      {children}
    </RNText>
  );
};

export default Text;
