import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../assets/services/firebaseConfig";
import LoginScreen from "../screens/LoginScreen";

const ProtectedScreen = ({ children }) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!auth.currentUser) {
      // Navigate to the Login screen if the user is not authenticated
      navigation.navigate("Login");
    }
  }, [navigation]);

  if (!auth.currentUser) {
    // Render the LoginScreen directly if the user is not authenticated
    return <LoginScreen />;
  }

  return <>{children}</>;
};

export default ProtectedScreen;
