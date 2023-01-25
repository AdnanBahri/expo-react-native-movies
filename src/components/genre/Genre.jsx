import React from "react";
import { COLORS } from "../../theme";
import Text from "../ui/Text";

const Genre = ({ id, ...props }) => {
  switch (id) {
    case 28:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Action
        </Text>
      );

    case 12:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Adventur
        </Text>
      );

    case 16:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Animation
        </Text>
      );

    case 35:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Comedy
        </Text>
      );

    case 80:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Crime
        </Text>
      );

    case 99:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Document
        </Text>
      );

    case 18:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Drama
        </Text>
      );

    case 10:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Family
        </Text>
      );

    case 14:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Fantasy
        </Text>
      );

    case 36:
      return (
        <Text {...props} color={COLORS.light.gray}>
          History
        </Text>
      );

    case 27:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Horror
        </Text>
      );

    case 10:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Music
        </Text>
      );

    case 96:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Mystery
        </Text>
      );

    case 10749:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Romance
        </Text>
      );

    case 878:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Science Fiction
        </Text>
      );

    case 10770:
      return (
        <Text {...props} color={COLORS.light.gray}>
          TV Movie
        </Text>
      );

    case 53:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Thriller
        </Text>
      );

    case 10752:
      return (
        <Text {...props} color={COLORS.light.gray}>
          War
        </Text>
      );

    case 37:
      return (
        <Text {...props} color={COLORS.light.gray}>
          Western
        </Text>
      );

    default:
      return;
  }
};

export default Genre;
