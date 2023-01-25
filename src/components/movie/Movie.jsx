import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Text from "../ui/Text";
import { COLORS, MovieSizes, WEIGHTS } from "../../theme";
import Image from "../ui/Image";
import { TMDB_IMAGE_BASE_URL } from "../../utils/Urls";
import Container from "../container/Container";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Movie = ({ movie, small, medium, large, push }) => {
  const navigation = useNavigation();
  const { id, poster_path, title, vote_average } = movie;
  const movieStyle = StyleSheet.flatten([
    MovieSizes.medium,
    small !== undefined && MovieSizes.small,
    medium !== undefined && MovieSizes.medium,
    large !== undefined && MovieSizes.large,
  ]);
  return (
    <TouchableOpacity
      style={{
        borderRadius: 8,
      }}
      onPress={() => {
        console.log(id);
        push !== undefined
          ? navigation.push("Details", { ...movie })
          : navigation.navigate("Details", { ...movie });
      }}
    >
      <View style={[movieStyle]}>
        <Image
          uri={`${TMDB_IMAGE_BASE_URL}original/${poster_path}`}
          resizeMode="contain"
        />
        <Container
          style={[
            { height: 25 },
            large !== undefined && { height: 40 },
            small !== undefined && { height: 0 },
          ]}
        >
          {small === undefined ? (
            <Text
              small
              weight={WEIGHTS.h3}
              color={COLORS.light.gray}
              lines={1}
              style={{ marginTop: 4, paddingHorizontal: 4 }}
            >
              {title}
            </Text>
          ) : null}
          {large !== undefined && (
            <Container horizontal alignItems="center">
              <AntDesign
                name="star"
                size={14}
                style={{ marginStart: 2 }}
                color={COLORS.light.accent}
              />
              <Text
                small
                weight={WEIGHTS.h3}
                color={COLORS.light.accent}
                style={{ paddingHorizontal: 4 }}
              >
                {vote_average}
              </Text>
            </Container>
          )}
        </Container>
      </View>
    </TouchableOpacity>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
