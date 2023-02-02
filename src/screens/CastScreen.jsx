import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Image from "../components/ui/Image";
import { COLORS, WEIGHTS } from "../theme";
import Text from "../components/ui/Text";
import { useNavigation } from "@react-navigation/native";
import { ENDPOINTS, TMDB_IMAGE_BASE_URL } from "../utils/Urls";
import { StatusBar } from "expo-status-bar";
import { Client } from "../api/Client";
import { LinearGradient } from "expo-linear-gradient";
import Container from "../components/container/Container";
import ItemSeperator from "../components/itemseperator/ItemSeperator";
import { AntDesign } from "@expo/vector-icons";
import Genre from "../components/genre/Genre";
import { useQueries } from "react-query";
import { getCastMovies } from "../api/MovieService";

const { width, height } = Dimensions.get("window");

const CastScreen = ({ route: { params }, navigation }) => {
  const { profile_path, id, name } = params;

  const [detailsQuery, photosQuery, moviesQuery] = useQueries([
    {
      queryKey: ["details", id],
      queryFn: async () => {
        const resp = await Client.get(ENDPOINTS.PERSON_DETAILS_BY_ID(id));
        const data = await resp?.data;
        return await data;
      },
    },
    {
      queryKey: ["photos", id],
      queryFn: async () => {
        const resp = await Client.get(ENDPOINTS.PERSON_PHOTOS_BY_ID(id));
        const data = await resp?.data;
        return await data;
      },
    },
    {
      queryKey: ["movies", id],
      queryFn: async () => getCastMovies(ENDPOINTS.PERSON_MOVIES_BY_ID(id)),
    },
  ]);

  // useEffect(() => {
  //   const getDetails = async () => {
  //     const resp = await Client.get(ENDPOINTS.PERSON_DETAILS_BY_ID(id));
  //     const data = await resp?.data;
  //     if (data) setCastDetails(data);
  //     console.log("Cast Details", data.place_of_birth);
  //   };

  //   const getPhotos = async () => {
  //     const resp = await Client.get(ENDPOINTS.PERSON_PHOTOS_BY_ID(id));
  //     const data = await resp?.data;
  //     if (data && data.profiles.length > 0) setCastPhotos(data.profiles);
  //     else setCastPhotos(null);
  //     console.log("Cast Photos", data.profiles.length);
  //   };

  //   const getCastMovies = async () => {
  //     const resp = await Client.get(ENDPOINTS.PERSON_MOVIES_BY_ID(id));
  //     const data = await resp?.data;
  //     if (data != undefined && data.cast.length > 0) setCastMovies(data);
  //     else {
  //       setCastMovies(null);
  //       console.log("Cast Movies is Null");
  //     }
  //     console.log("Cast Movies", data.cast.length);
  //   };
  //   getDetails();
  //   getPhotos();
  //   getCastMovies();
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0,0,0,.5)", "rgba(0,0,0,.2)", "transparent"]}
        style={styles.statusbar}
      />
      <StatusBar style="light" />
      <ScrollView
        style={{ paddingTop: 25 }}
        contentContainerStyle={{ marginHorizontal: 12, paddingBottom: 16 }}
      >
        <Container
          horizontal
          style={{
            height: width * 0.45,
          }}
        >
          <Container center style={{ height: "100%", width: width * 0.45 }}>
            <Image
              uri={`${TMDB_IMAGE_BASE_URL}original/${profile_path}`}
              resizeMode="cover"
              style={styles.poster}
            />
          </Container>
          <Container
            justifyContent="space-between"
            style={{ paddingVertical: 20 }}
          >
            <Container>
              <Text
                h3
                weight={WEIGHTS.h3}
                color={COLORS.light.tertiary}
                lines={1}
              >
                {name}
              </Text>
              {!detailsQuery.isLoading && !detailsQuery.isError ? (
                <Text small weight={WEIGHTS.text} color={COLORS.light.gray}>
                  {typeof detailsQuery.data.known_for_department === "object" &&
                    detailsQuery.data.known_for_department.flat().join("/ ")}
                  {typeof detailsQuery.data.known_for_department === "string" &&
                    detailsQuery.data.known_for_department}
                </Text>
              ) : detailsQuery.isError ? (
                <Text>{detailsQuery.error.message}</Text>
              ) : (
                <ActivityIndicator size="small" color={COLORS.light.accent} />
              )}
            </Container>
            <Container>
              {detailsQuery.isLoading && !detailsQuery.isError ? (
                <ActivityIndicator />
              ) : !detailsQuery.isLoading && detailsQuery.isError ? (
                <Text>{detailsQuery.error.message}</Text>
              ) : (
                <>
                  <Container horizontal>
                    <Text weight={WEIGHTS.h3} color={COLORS.light.tertiary}>
                      Date Of Birth:
                    </Text>
                    <Text
                      weight={WEIGHTS.p}
                      color={COLORS.light.accent}
                      style={{ marginLeft: 4 }}
                      lines={1}
                    >
                      {detailsQuery.data.birthday}
                    </Text>
                  </Container>
                  <Container horizontal>
                    <Text weight={WEIGHTS.h3} color={COLORS.light.tertiary}>
                      Place Of Birth:
                    </Text>
                    <Text
                      weight={WEIGHTS.p}
                      color={COLORS.light.accent}
                      style={{ marginLeft: 4 }}
                      lines={1}
                    >
                      {detailsQuery.data.place_of_birth}
                    </Text>
                  </Container>
                  <Container horizontal>
                    <Text weight={WEIGHTS.h3} color={COLORS.light.tertiary}>
                      Movies:
                    </Text>
                    <Text
                      weight={WEIGHTS.p}
                      color={COLORS.light.accent}
                      style={{ marginLeft: 4 }}
                      lines={1}
                    >
                      {!moviesQuery.isLoading &&
                        !moviesQuery.isError &&
                        moviesQuery.data.movies.length}
                    </Text>
                  </Container>
                </>
              )}
            </Container>
          </Container>
        </Container>
        {!photosQuery.isError && !photosQuery.isLoading && (
          <Container>
            <Container horizontal>
              <Text h3 weight={WEIGHTS.h3} color={COLORS.light.tertiary}>
                PHOTOS
              </Text>

              {/* <TouchableOpacity
                onPress={() =>
                  navigation.push("ShowAll", {
                    castMovies: true,
                    keyQueries: ["photos", id],
                    endpoint: ENDPOINTS.PERSON_PHOTOS_BY_ID(id),
                  })
                }
              >
                <Text weight={WEIGHTS.h3} color={COLORS.light.accent}>
                  Show All
                </Text>
              </TouchableOpacity> */}
            </Container>
            <FlatList
              style={{ marginTop: 8 }}
              data={photosQuery.data.profiles.filter(
                (photo) => photo.profile_path !== null
              )}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={<ItemSeperator width={12} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.push("FullImage", {
                      uri: `${TMDB_IMAGE_BASE_URL}original${item.file_path}`,
                    })
                  }
                  style={{
                    borderRadius: 8,
                  }}
                >
                  <Image
                    uri={`${TMDB_IMAGE_BASE_URL}original${item.file_path}`}
                    style={{
                      width: 120,
                      aspectRatio: item.aspect_ratio,
                      borderRadius: 8,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </Container>
        )}
        <Container
          horizontal
          justifyContent="space-between"
          style={{ marginVertical: 12 }}
        >
          <Text h3 weight={WEIGHTS.h3} color={COLORS.light.tertiary}>
            {name} Movies
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.push("ShowAll", {
                castMovies: true,
                keyQueries: ["movies", id],
                endpoint: ENDPOINTS.PERSON_MOVIES_BY_ID(id),
              })
            }
          >
            <Text weight={WEIGHTS.h3} color={COLORS.light.accent}>
              Show All
            </Text>
          </TouchableOpacity>
        </Container>
        {/* <FlatList
          data=
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={<ItemSeperator width={12} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Text>{item.title}</Text>}
          numColumns={2}
        /> */}
        {!moviesQuery.isLoading &&
          !moviesQuery.isError &&
          (moviesQuery.data.movies.length > 25
            ? moviesQuery.data.movies.slice(0, 21)
            : moviesQuery.data.movies
          )
            .filter((movie) => movie.poster_path !== null)
            .map((movie, index) => (
              <Container
                horizontal
                key={index}
                style={{
                  marginBottom: 12,
                  height: 168,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.push("Details", { ...movie })}
                  style={{ borderRadius: 8 }}
                >
                  <Image
                    uri={`${TMDB_IMAGE_BASE_URL}original/${movie.poster_path}`}
                    style={{ width: 110, height: 154, borderRadius: 8 }}
                  />
                </TouchableOpacity>
                <Container
                  style={{
                    flex: 1,
                    marginHorizontal: 8,
                    paddingVertical: 12,
                  }}
                  justifyContent="space-between"
                >
                  <Container>
                    <Container
                      style={{ width: "100%" }}
                      horizontal
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text
                        style={{ flex: 1, marginRight: 4 }}
                        h3
                        weight={WEIGHTS.h3}
                        color={COLORS.light.tertiary}
                        lines={1}
                      >
                        {movie.title}
                      </Text>
                      <Container horizontal center style={{ marginStart: 2 }}>
                        <AntDesign
                          name="star"
                          size={14}
                          color={COLORS.light.accent}
                        />
                        <Text weight={WEIGHTS.h3} color={COLORS.light.accent}>
                          {movie.vote_average.toFixed(1)}
                        </Text>
                      </Container>
                    </Container>
                    <Text small weight={WEIGHTS.h3} color={COLORS.light.gray}>
                      {movie.character}
                    </Text>
                  </Container>
                  <Container>
                    <Container horizontal>
                      {(movie.genre_ids.length > 3
                        ? movie.genre_ids.slice(0, 3)
                        : movie.genre_ids
                      ).map((item) => (
                        <Genre
                          id={item}
                          key={item}
                          small
                          color={COLORS.light.tertiary}
                          weight={WEIGHTS.p}
                          style={{ marginRight: 2 }}
                        />
                      ))}
                    </Container>
                    <Text weight={WEIGHTS.h3} color={COLORS.light.gray}>
                      {movie.release_date}
                    </Text>
                  </Container>
                </Container>
              </Container>
            ))}
      </ScrollView>
    </View>
  );
};

export default CastScreen;

const styles = StyleSheet.create({
  statusbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 25,
    zIndex: 10,
  },
  poster: {
    height: width * 0.4,
    width: width * 0.4,
    borderRadius: width * 0.4,
  },
  detailsContainer: {
    width: "100%",
    height: width * 0.4,
    paddingVertical: 8,
    // backgroundColor: COLORS.light.accent,
    justifyContent: "space-between",
    marginLeft: 4,
  },
  moviesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  movieCard: {
    height: width * 0.7,
    width: (width - 40) / 2,
    marginBottom: 8,
    borderRadius: 8,
  },
  photo: {},
});
