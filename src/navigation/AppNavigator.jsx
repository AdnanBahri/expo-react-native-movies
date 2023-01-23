import { createStackNavigator } from "@react-navigation/stack";
import CastScreen from "../screens/CastScreen";
import DetailsScreen from "../screens/DetailsScreen";
import FullScreen from "../screens/FullScreen";
import HomeScreen from "../screens/HomeScreen";
import LoadMoreScreen from "../screens/LoadMoreScreen";

const MainStack = createStackNavigator();

export const AppNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={HomeScreen} />
    <MainStack.Screen name="Details" component={DetailsScreen} />
    <MainStack.Screen name="Cast" component={CastScreen} />
    <MainStack.Screen name="FullImage" component={FullScreen} />
    <MainStack.Screen name="LoadMore" component={LoadMoreScreen} />
  </MainStack.Navigator>
);
