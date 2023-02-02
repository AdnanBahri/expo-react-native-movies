import {
  Platform,
  StyleSheet,
  StatusBar as RNStatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import React from "react";
import Text from "../components/ui/Text";
import { COLORS, WEIGHTS } from "../theme";
import { StatusBar } from "expo-status-bar";
import Slider from "../components/slider/Slider";
import Container from "../components/container/Container";
import Movie from "../components/movie/Movie";
import { Client } from "../api/Client";
import { ENDPOINTS } from "../utils/Urls";
import ItemSeperator from "../components/itemseperator/ItemSeperator";
import { useQueries } from "react-query";

const HomeScreen = ({ navigation }) => {
  const [popularQuery, nowQuery, comingQuery] = useQueries([
    {
      queryKey: ["popular"],
      queryFn: async () => {
        const resp = await Client.get(ENDPOINTS.POPULAR);
        const data = await resp?.data;
        return await data;
      },
    },
    {
      queryKey: ["now_playing"],
      queryFn: async () => {
        const resp = await Client.get(ENDPOINTS.NOW_PLAYING);
        const data = await resp?.data;
        return await data;
      },
    },
    {
      queryKey: ["up_coming"],
      queryFn: async () => {
        const resp = await Client.get(ENDPOINTS.UP_COMING);
        const data = await resp?.data;
        return await data;
      },
    },
  ]);

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 12,
        }}
      >
        <Slider />
        <Container
          horizontal
          justifyContent="space-between"
          style={{ marginTop: 8 }}
        >
          <Text weight={WEIGHTS.h3}>MOST POPULAR</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("LoadMore", {
                keyQueries: "popular_all",
                endpoint: ENDPOINTS.POPULAR,
              })
            }
          >
            <Text weight={WEIGHTS.h3} color={COLORS.light.accent}>
              See More
            </Text>
          </TouchableOpacity>
        </Container>
        {!popularQuery.isLoading && !popularQuery.isError ? (
          <FlatList
            style={{ marginTop: 8 }}
            data={popularQuery.data.results.filter(
              (movie) => movie.poster_path !== null
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Movie large movie={item} />}
            horizontal
            ItemSeparatorComponent={<ItemSeperator width={8} />}
            showsHorizontalScrollIndicator={false}
          />
        ) : popularQuery.isError ? (
          <Text>Something Went Wrong: {popularQuery.error.message}</Text>
        ) : (
          <ActivityIndicator size="small" color={COLORS.light.accent} />
        )}
        <Container
          horizontal
          justifyContent="space-between"
          style={{ marginTop: 8 }}
        >
          <Text weight={WEIGHTS.h3}>NEW</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("LoadMore", {
                keyQueries: "now_playing_all",
                endpoint: ENDPOINTS.NOW_PLAYING,
              })
            }
          >
            <Text weight={WEIGHTS.h3} color={COLORS.light.accent}>
              See More
            </Text>
          </TouchableOpacity>
        </Container>
        {!nowQuery.isLoading && !nowQuery.isError ? (
          <FlatList
            style={{ marginTop: 8 }}
            data={nowQuery.data.results.filter(
              (movie) => movie.poster_path !== null
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Movie movie={item} />}
            ItemSeparatorComponent={<ItemSeperator width={8} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : nowQuery.isError ? (
          <Text>Something Went Wrong: {nowQuery.error.message}</Text>
        ) : (
          <ActivityIndicator size="small" color={COLORS.light.accent} />
        )}
        <Container
          horizontal
          justifyContent="space-between"
          style={{ marginTop: 8 }}
        >
          <Text weight={WEIGHTS.h3}>COMING SOON</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("LoadMore", {
                keyQueries: "up_coming_all",
                endpoint: ENDPOINTS.UP_COMING,
              })
            }
          >
            <Text weight={WEIGHTS.h3} color={COLORS.light.accent}>
              See More
            </Text>
          </TouchableOpacity>
        </Container>
        {!comingQuery.isLoading && !comingQuery.isError ? (
          <FlatList
            style={{ marginTop: 8 }}
            data={comingQuery.data.results.filter(
              (movie) => movie.poster_path !== null
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Movie movie={item} />}
            ItemSeparatorComponent={<ItemSeperator width={8} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : comingQuery.isError ? (
          <Text>Something Went Wrong: {comingQuery.error.message}</Text>
        ) : (
          <ActivityIndicator size="small" color={COLORS.light.accent} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    paddingTop: Platform.OS === "android" && RNStatusBar.currentHeight,
  },
});
