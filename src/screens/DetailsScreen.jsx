import {
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
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const DetailsScreen = ({ route: { params } }) => {
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

  const [credits, setCredits] = useState({});
  const [similar, setSimilar] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      const resp = await Client.get(ENDPOINTS.MOVIE_CREDITS(params.id));
      const data = await resp?.data;
      if (data && data.cast && data.cast.length > 0) {
        setCredits(data);
      }
      console.log("Credits Cast Length", data.cast.length);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const resp = await Client.get(ENDPOINTS.SIMILAR_MOVIES_BY_ID(params.id));
      const data = await resp?.data?.results;
      if (data && data.length > 0) {
        setSimilar(data);
      }
      console.log("Similar Movies Length", data.length);
    };
    getData();
  }, []);

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
                {vote_average}
              </Text>
            </Container>
            <Container horizontal>
              {(genre_ids.length > 3 ? genre_ids.slice(0, 3) : genre_ids).map(
                (item) => (
                  <View>
                    <Genre
                      id={item}
                      key={item}
                      small
                      color={COLORS.light.tertiary}
                      weight={WEIGHTS.p}
                      style={{ marginRight: 2 }}
                    />
                  </View>
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
        <FlatList
          style={{ marginHorizontal: 16, marginTop: 8 }}
          data={credits.cast}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Cast item={item} />}
          ItemSeparatorComponent={<ItemSeperator width={8} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
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
          style={{ marginHorizontal: 16, marginTop: 8 }}
          data={similar}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Movie push movie={item} />}
          ItemSeparatorComponent={<ItemSeperator width={8} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
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
