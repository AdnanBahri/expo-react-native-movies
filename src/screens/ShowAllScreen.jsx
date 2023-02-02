import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { getCastMovies } from "../api/MovieService";
import Container from "../components/container/Container";
import { COLORS } from "../theme";
import Image from "../components/ui/Image";
import { TMDB_IMAGE_BASE_URL } from "../utils/Urls";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const ShowAllScreen = ({ route: { params }, navigation }) => {
  const { keyQueries, endpoint, castMovies } = params;
  const { isLoading, isError, error, data } = useQuery(keyQueries, async () =>
    getCastMovies(endpoint)
  );

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <Container center>
          <ActivityIndicator size="large" color={COLORS.light.accent} />
        </Container>
      ) : isError && !isLoading ? (
        <Container center>
          <Text>{error.message}</Text>
        </Container>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={data.movies.filter((movie) => movie.poster_path !== null)}
          contentContainerStyle={{ marginHorizontal: 16 }}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => navigation.push("Details", { ...item })}
              style={[
                {
                  width: (SCREEN_WIDTH - 44) * 0.5,
                  height: SCREEN_HEIGHT * 0.38,
                  borderRadius: 8,
                  marginLeft: (index % 2) * 12,
                },
              ]}
            >
              <Image
                uri={`${TMDB_IMAGE_BASE_URL}original/${item.poster_path}`}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      )}
    </View>
  );
};

export default ShowAllScreen;

const styles = StyleSheet.create({});
