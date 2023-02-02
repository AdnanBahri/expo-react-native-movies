import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image as RNImage,
  View,
  StyleSheet,
} from "react-native";
import * as FileSystem from "expo-file-system";
import shorthash from "shorthash";
import { COLORS } from "../../theme";

const Image = ({ uri, big, ...props }) => {
  const [source, setSource] = useState(null);
  const [resLoaded, setResLoaded] = useState(false);

  useEffect(() => {
    setResLoaded(false);
    (async () => {
      const name = shorthash.unique(uri);
      // console.log(name);
      const path = `${FileSystem.cacheDirectory}${name}`;
      const image = await FileSystem.getInfoAsync(path);
      if (image.exists) {
        // console.log("read image from cache");
        setSource({ uri: image.uri });
      } else {
        console.log("Downloading image to cache");
        const newImage = await FileSystem.downloadAsync(uri, path);
        setSource({ uri: newImage.uri });
      }
      setResLoaded(true);
    })();
  }, []);
  resLoaded;
  return (
    <>
      {!resLoaded && (
        <View style={styles.container}>
          <ActivityIndicator
            color={COLORS.light.accent}
            size={big ? "large" : "small"}
          />
        </View>
      )}
      {resLoaded && (
        <View style={styles.container}>
          <RNImage source={source} style={styles.style} {...props} />
        </View>
      )}
    </>
  );
};

export default Image;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  style: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
