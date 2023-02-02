import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StatusBar as RNStatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Image from "../components/ui/Image";
import { ENDPOINTS, TMDB_IMAGE_BASE_URL } from "../utils/Urls";
import { StatusBar } from "expo-status-bar";
import { COLORS, WEIGHTS } from "../theme";
import Text from "../components/ui/Text";
import Container from "../components/container/Container";
import { Client } from "../api/Client";
import ItemSeperator from "../components/itemseperator/ItemSeperator";
import Cast from "../components/cast/Cast";
import Movie from "../components/movie/Movie";
import Genre from "../components/genre/Genre";
import { useQueries } from "react-query";

const { width, height } = Dimensions.get("window");

const DetailsScreen = ({ route: { params }, navigation }) => {
  const {
    id,
    poster_path,
    backdrop_path,
    title,
    overview,
    vote_average,
    release_date,
    genre_ids,
  } = params;

  const [castQuery, similarQuery] = useQueries([
    {
      queryKey: ["cast_crew", id],
      queryFn: async () => {
        const resp = await Client.get(ENDPOINTS.MOVIE_CREDITS(params.id));
        const data = await resp?.data;
        console.log(
          "useQuery Similar Cast and Crew Length",
          data.cast.length + data.crew.length
        );
        return data;
      },
    },
    {
      queryKey: ["similar", id],
      queryFn: async () => {
        const resp = await Client.get(
          ENDPOINTS.SIMILAR_MOVIES_BY_ID(params.id)
        );
        const data = await resp?.data;
        console.log("useQuery Similar Movies Length", data.results.length);
        return await data;
      },
    },
  ]);

  return (
    <View>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0,0,0,.7)", "rgba(0,0,0,.4)", "transparent"]}
        style={styles.statusbar}
      />
      <StatusBar style="light" />
      <ScrollView>
        <Image
          uri={`${TMDB_IMAGE_BASE_URL}original/${backdrop_path}`}
          resizeMode="cover"
          style={styles.backdrop}
        />
        <Image
          uri={`${TMDB_IMAGE_BASE_URL}original/${poster_path}`}
          resizeMode="cover"
          style={styles.poster}
        />
        <View
          style={{
            width: width - 146,
            height: width * 0.3,
            marginLeft: 146,
            bottom: 0,
            paddingHorizontal: 8,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Container
              horizontal
              alignItems="center"
              justifyContent="space-between"
            >
              <Text
                h3
                weight={WEIGHTS.big}
                lines={1}
                style={{
                  flex: 1,
                  marginRight: 4,
                }}
                color={COLORS.light.tertiary}
              >
                {title}
              </Text>
              <Text
                h3
                weight={WEIGHTS.big}
                color={COLORS.light.accent}
                style={{
                  marginLeft: 4,
                }}
                lines={1}
              >
                {vote_average.toFixed(1)}
              </Text>
            </Container>
            <Container horizontal>
              {(genre_ids.length > 3 ? genre_ids.slice(0, 3) : genre_ids).map(
                (item) => (
                  <Genre
                    id={item}
                    key={item}
                    small
                    color={COLORS.light.tertiary}
                    weight={WEIGHTS.p}
                    style={{ marginRight: 2 }}
                  />
                )
              )}
            </Container>
          </View>
          <Text small weight={WEIGHTS.h3} color={COLORS.light.gray}>
            {release_date}
          </Text>
        </View>
        <Text
          h3
          weight={WEIGHTS.big}
          style={{ marginTop: 12, marginLeft: 16 }}
          color={COLORS.light.tertiary}
        >
          STORYLINE
        </Text>
        <Text
          small
          weight={WEIGHTS.text}
          color={COLORS.light.gray}
          style={{ marginTop: 4, marginHorizontal: 16 }}
        >
          {overview}
        </Text>
        <Text
          h3
          weight={WEIGHTS.big}
          style={{ marginTop: 8, marginLeft: 16 }}
          color={COLORS.light.tertiary}
        >
          CAST
        </Text>
        {!castQuery.isLoading && !castQuery.isError ? (
          <FlatList
            style={{ marginHorizontal: 16, marginTop: 8 }}
            data={castQuery.data.cast.filter(
              (cast) => cast.profile_path !== null
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Cast item={item} />}
            ItemSeparatorComponent={<ItemSeperator width={8} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : castQuery.isError ? (
          <Text>Something Went Wrong: {castQuery.error.message}</Text>
        ) : (
          <ActivityIndicator size="small" color={COLORS.light.accent} />
        )}
        <Container
          horizontal
          justifyContent="space-between"
          style={{ marginTop: 8, marginHorizontal: 16 }}
        >
          <Text h3 weight={WEIGHTS.big} color={COLORS.light.tertiary}>
            SIMILAR
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.push("LoadMore", {
                keyQueries: "similar_all",
                endpoint: ENDPOINTS.SIMILAR_MOVIES_BY_ID(params.id),
              })
            }
          >
            <Text weight={WEIGHTS.h3} color={COLORS.light.accent}>
              See More
            </Text>
          </TouchableOpacity>
        </Container>
        {!similarQuery.isLoading && !similarQuery.isError ? (
          <FlatList
            style={{ marginHorizontal: 16, marginTop: 8 }}
            data={similarQuery.data.results.filter(
              (movie) => movie.poster_path !== null
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Movie push movie={item} />}
            ItemSeparatorComponent={<ItemSeperator width={8} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : similarQuery.isError ? (
          <Text>Something Went Wrong: {similarQuery.error.message}</Text>
        ) : (
          <ActivityIndicator size="small" color={COLORS.light.accent} />
        )}
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  statusbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 25,
    zIndex: 10,
  },
  backdrop: {
    width: width,
    height: width * 0.7,
  },
  poster: {
    width: width * 0.32,
    height: width * 0.45,
    borderRadius: 8,
    position: "absolute",
    left: 0,
    top: -width * 0.15,
    marginStart: 16,
  },
});
