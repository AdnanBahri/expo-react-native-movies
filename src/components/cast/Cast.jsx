import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../theme";
import Image from "../ui/Image";

const Cast = ({ item }) => {
  const { id, profile_path, name } = item;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(name, id);
        navigation.navigate("Cast", { ...item });
      }}
      style={styles.card}
    >
      <Image
        uri={"https://image.tmdb.org/t/p/original".concat(profile_path)}
        styles={[
          styles.poster,
          profile_path === null && { backgroundColor: COLORS.light.accent },
        ]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default Cast;

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 120,
  },
  shadowContainer: {
    width: "100%",
    height: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  poster: { width: "100%", height: "100%", borderRadius: 80 },
});
