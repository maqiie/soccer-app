import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { GluestackProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <GluestackProvider config={config}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </GluestackProvider>
    </Provider>
  );
}
