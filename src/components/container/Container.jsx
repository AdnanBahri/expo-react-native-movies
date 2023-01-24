import { StyleSheet, View } from "react-native";
import React from "react";

const Container = ({
  children,
  horizontal,
  justifyContent,
  alignItems,
  center,
  style,
  ...props
}) => {
  const containerStyle = StyleSheet.flatten([
    horizontal !== undefined && { flexDirection: "row" },
    justifyContent !== undefined && { justifyContent: justifyContent },
    alignItems !== undefined && { alignItems: alignItems },
    center !== undefined && { alignItems: "center", justifyContent: "center" },
  ]);
  return (
    <View style={[containerStyle, style]} {...props}>
      {children}
    </View>
  );
};

export default Container;
