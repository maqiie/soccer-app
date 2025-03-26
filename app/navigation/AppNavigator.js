import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../assets/services/firebaseConfig";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MatchDetailsScreen from "../screens/MatchDetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../colors";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Home & Match Details
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} />
  </Stack.Navigator>
);

// Auth Stack (for login)
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

// Main App with Bottom Tabs
const MainApp = () => (
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
    <Tab.Screen name="Logins" component={LoginsScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainApp} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
// import React, { useState, useEffect } from "react";
// import { ActivityIndicator, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../assets/services/firebaseConfig";
// import LoginScreen from "../screens/LoginScreen";
// import HomeScreen from "../screens/HomeScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import MatchDetailsScreen from "../screens/MatchDetailsScreen";
// import FavoritesScreen from "../screens/FavoritesScreen";

// import { Ionicons } from "@expo/vector-icons";
// import { colors } from "../../colors";

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// // Stack Navigator for Home & Match Details
// const HomeStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//     <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} />
//   </Stack.Navigator>
// );

// // Auth Stack (for login)
// const AuthStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Login" component={LoginScreen} />
//   </Stack.Navigator>
// );

// // Main App with Bottom Tabs
// const MainApp = () => (
//   <Tab.Navigator
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ focused, color, size }) => {
//         let iconName;
//         if (route.name === "Home") {
//           iconName = focused ? "home" : "home-outline";
//         } else if (route.name === "Profile") {
//           iconName = focused ? "person" : "person-outline";
//         } else if (route.name === "Favorites") {
//           iconName = focused ? "heart" : "heart-outline";
//         }
//         return <Ionicons name={iconName} size={size} color={color} />;
//       },
//       tabBarActiveTintColor: colors.primary,
//       tabBarInactiveTintColor: "gray",
//       tabBarStyle: {
//         backgroundColor: colors.surface,
//         borderTopWidth: 0,
//         paddingBottom: 5,
//       },
//       tabBarLabelStyle: {
//         fontSize: 12,
//         marginBottom: 5,
//       },
//     })}
//   >
//     <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
//     <Tab.Screen name="Profile" component={ProfileScreen} />
//     <Tab.Screen name="Favorites" component={FavoritesScreen} />
//   </Tab.Navigator>
// );

// const AppNavigator = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });

//     return unsubscribe; // Cleanup listener on unmount
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color={colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {user ? (
//           <Stack.Screen name="Main" component={MainApp} />
//         ) : (
//           <Stack.Screen name="Auth" component={AuthStack} />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;
