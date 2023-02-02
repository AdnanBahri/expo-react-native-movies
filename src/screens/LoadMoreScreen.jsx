import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ItemSeperator from "../components/itemseperator/ItemSeperator";
import { COLORS } from "../theme";
import Image from "../components/ui/Image";
import { TMDB_IMAGE_BASE_URL } from "../utils/Urls";
import { useInfiniteQuery } from "react-query";
import { getCastMovies, getData } from "../api/MovieService";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const LoadMoreScreen = ({ route: { params }, navigation }) => {
  const { keyQueries, endpoint } = params;

  const {
    isLoading,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    keyQueries,
    async ({ pageParam }) => getData(endpoint, pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) return lastPage.page + 1;
        return false;
      },
    }
  );

  if (isError && !isFetching) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Something Went Wrong: {error.message}</Text>
      </View>
    );
  }

  const flattenData = data?.pages
    ? data.pages.flatMap((page) => [...page.movies])
    : [];

  return (
    <View style={{ flex: 1 }}>
      {!isError && !isLoading && data.pages && (
        <FlatList
          // ref={scrollRef}
          style={{ flex: 1 }}
          data={flattenData.filter((movie) => movie.poster_path !== null)}
          contentContainerStyle={{ marginHorizontal: 16 }}
          keyExtractor={(_, index) => index.toString()}
          onContentSizeChange={() => null}
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
          onEndReached={() => (hasNextPage ? fetchNextPage() : null)}
          onEndReachedThreshold={0.05}
        />
      )}
      {(isFetching || isFetchingNextPage) && (
        <ActivityIndicator
          size="small"
          color="#000"
          style={{ marginVertical: 8 }}
        />
      )}
    </View>
  );
};

export default LoadMoreScreen;

const styles = StyleSheet.create({});
