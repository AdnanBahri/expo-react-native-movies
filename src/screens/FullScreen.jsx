import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Image from "../components/ui/Image";

const { width, height } = Dimensions.get("window");

const FullScreen = ({ route: { params } }) => {
  const { uri } = params;
  return (
    <View style={{ flex: 1 }}>
      <Image uri={uri} style={{ width: "100%", height: "100%" }} />
      <StatusBar translucent={true} />
    </View>
  );
};

export default FullScreen;

const styles = StyleSheet.create({});
