import {
  Platform,
  StyleSheet,
  View,
  StatusBar as RNStatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Text from "../components/ui/Text";
import { COLORS, WEIGHTS } from "../theme";
import { StatusBar } from "expo-status-bar";
import Slider from "../components/slider/Slider";
import Container from "../components/container/Container";
import Image from "../components/ui/Image";
import Movie from "../components/movie/Movie";
import { Client } from "../api/Client";
import { ENDPOINTS } from "../utils/Urls";

const HomeScreen = ({ navigation }) => {
  const [popularMovies, setPopularMovies] = useState({ page: 0, results: [] });
  const [newMovies, setNewMovies] = useState({ page: 0, results: [] });
  const [comingMovies, setComingMovies] = useState({ page: 0, results: [] });

  useEffect(() => {
    const getData = async (endpoint, setData) => {
      try {
        const resp = await Client.get(endpoint);
        const data = await resp?.data;
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        console.log(endpoint, "Done");
      }
    };

    getData(ENDPOINTS.POPULAR, setPopularMovies);
    getData(ENDPOINTS.NOW_PLAYING, setNewMovies);
    getData(ENDPOINTS.UP_COMING, setComingMovies);
  }, []);

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
                endpoint: ENDPOINTS.POPULAR,
              })
            }
          >
            <Text weight={WEIGHTS.h3} color={COLORS.light.accent}>
              See More
            </Text>
          </TouchableOpacity>
        </Container>
        <FlatList
          style={{ marginTop: 8 }}
          data={popularMovies.results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                borderRadius: 8,
                marginRight: index === popularMovies.results.length - 1 ? 0 : 8,
              }}
              onPress={() => {
                console.log(item.id);
                navigation.navigate("Details", { ...item });
              }}
            >
              <Movie large {...item} />
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <Container
          horizontal
          justifyContent="space-between"
          style={{ marginTop: 8 }}
        >
          <Text weight={WEIGHTS.h3}>NEW</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("LoadMore", {
                endpoint: ENDPOINTS.NOW_PLAYING,
              })
            }
          >
            <Text weight={WEIGHTS.h3} color={COLORS.light.accent}>
              See More
            </Text>
          </TouchableOpacity>
        </Container>
        <FlatList
          style={{ marginTop: 8 }}
          data={newMovies.results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                borderRadius: 8,
                marginRight: index === popularMovies.results.length - 1 ? 0 : 8,
              }}
              onPress={() => {
                console.log(item.id);
                navigation.navigate("Details", { ...item });
              }}
            >
              <Movie {...item} />
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <Container
          horizontal
          justifyContent="space-between"
          style={{ marginTop: 8 }}
        >
          <Text weight={WEIGHTS.h3}>COMING SOON</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("LoadMore", {
                endpoint: ENDPOINTS.UP_COMING,
              })
            }
          >
            <Text weight={WEIGHTS.h3} color={COLORS.light.accent}>
              See More
            </Text>
          </TouchableOpacity>
        </Container>
        <FlatList
          style={{ marginTop: 8 }}
          data={comingMovies.results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                borderRadius: 8,
                marginRight: index === popularMovies.results.length - 1 ? 0 : 8,
              }}
              onPress={() => {
                console.log(item.id);
                navigation.navigate("Details", { ...item });
              }}
            >
              <Movie {...item} />
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
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
