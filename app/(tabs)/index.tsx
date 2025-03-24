import { Redirect } from "expo-router";
import Home from  "../../app/screens/HomeScreen"
import { View } from "react-native";


export default function Index() {
  return (
  <View style={{ flex: 1 }}>
  <Home />
</View>// Change "/home" to "/auth" if needed
  )
}
