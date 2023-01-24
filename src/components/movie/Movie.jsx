import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../ui/Text";
import { COLORS, MovieSizes, WEIGHTS } from "../../theme";
import Image from "../ui/Image";
import { TMDB_IMAGE_BASE_URL } from "../../utils/Urls";
import Container from "../container/Container";

const Movie = ({
  id,
  title,
  vote_average,
  poster_path,
  small,
  medium,
  large,
  push,
}) => {
  const movieStyle = StyleSheet.flatten([
    MovieSizes.medium,
    small !== undefined && MovieSizes.small,
    medium !== undefined && MovieSizes.medium,
    large !== undefined && MovieSizes.large,
  ]);
  return (
    <View style={[movieStyle, { backgroundColor: COLORS.light.primary }]}>
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
          <Text
            small
            weight={WEIGHTS.h3}
            color={COLORS.light.accent}
            style={{ paddingHorizontal: 4 }}
          >
            {vote_average}
          </Text>
        )}
      </Container>
    </View>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
