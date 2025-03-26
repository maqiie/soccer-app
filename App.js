// import React from "react";
// import AppNavigator from "./navigation/AppNavigator";

// export default function App() {
//   return <AppNavigator />;
// }
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./store";
import HomeScreen from "./app/screens/HomeScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import MatchDetailsScreen from "./app/screens/MatchDetailsScreen";
import FavoritesScreen from "./app/screens/FavoritesScreen"; 
import { GluestackUIProvider } from "@gluestack-ui/themed"; 
import { config } from "@gluestack-ui/config";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./colors"; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Profile") {
                  iconName = focused ? "person" : "person-outline";
                } else if (route.name === "Favorites") {
                  iconName = focused ? "heart" : "heart-outline";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: "gray",
              tabBarStyle: {
                backgroundColor: colors.surface,
                borderTopWidth: 0,
                paddingBottom: 5,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                marginBottom: 5,
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
}
