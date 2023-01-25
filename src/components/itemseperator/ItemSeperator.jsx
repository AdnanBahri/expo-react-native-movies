import { View, Text } from "react-native";
import React from "react";

const ItemSeperator = ({ width, height }) => <View style={{ height, width }} />;

ItemSeperator.defaultProps = {
  height: 0,
  width: 0,
};

export default ItemSeperator;
