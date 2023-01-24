import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Text from "../ui/Text";
import { COLORS, WEIGHTS } from "../../theme";
import { FlatList } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const data = [
  {
    id: 1,
    content: "image 1",
  },
  {
    id: 2,
    content: "image 2",
  },
  {
    id: 3,
    content: "image 3",
  },
];

const Slider = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text weight={WEIGHTS.h3} color={COLORS.light.primary}>
          Content Slider
        </Text>
      </View>
    </View>
    // <ScrollView
    //   horizontal
    //   pagingEnabled
    //   bounces
    //   onScro
    //   showsHorizontalScrollIndicator={false}
    //   style={styles.container}
    // >
    //   {data.map((item, index) => (
    //     <View style={styles.contentWrapper} key={index}>
    //       <Text color={COLORS.light.primary}>{item.content}</Text>
    //     </View>
    //   ))}
    // </ScrollView>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height * 0.3,
    marginTop: 8,
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: COLORS.light.accent,
  },
});
