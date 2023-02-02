import { createStackNavigator } from "@react-navigation/stack";
import CastScreen from "../screens/CastScreen";
import DetailsScreen from "../screens/DetailsScreen";
import FullScreen from "../screens/FullScreen";
import HomeScreen from "../screens/HomeScreen";
import LoadMoreScreen from "../screens/LoadMoreScreen";
import ShowAllScreen from "../screens/ShowAllScreen";
import { COLORS } from "../theme";

const MainStack = createStackNavigator();

export const AppNavigator = () => (
  <MainStack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      headerStyle: { elevation: 0 },
      cardStyle: { backgroundColor: COLORS.light.secondary },
    }}
  >
    <MainStack.Screen name="Home" component={HomeScreen} />
    <MainStack.Screen name="Details" component={DetailsScreen} />
    <MainStack.Screen name="Cast" component={CastScreen} />
    <MainStack.Screen name="FullImage" component={FullScreen} />
    <MainStack.Screen
      name="LoadMore"
      component={LoadMoreScreen}
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerLeft: () => null,
      }}
    />
    <MainStack.Screen
      name="ShowAll"
      component={ShowAllScreen}
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerLeft: () => null,
      }}
    />
  </MainStack.Navigator>
);
