import * as React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

// Installation des outils de navigation => voir : https://reactnative.dev/docs/navigation + https://reactnavigation.org/docs/tab-based-navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./components/Home";

function HomeScreen() {
  return (
    <View style={{ marginVertical:40 }}>
     <Home />
    </View>
  );
}



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator

      ScreenOptions={{
        style:{
          height:65,
          backgroundColor: '#cfcfcf',
          color: 'white',
          borderColor: 'white',
          borderWidth: 2,
        },
        // Custom the menu labels (option 1)
        labelStyle: {
          fontSize: 20,
          margin: 20,
          padding: 0,
          color: 'white',
          borderColor:'white',
          borderWidth: 2
        },
      }}
      >
        <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel:({ focused, color })=>(<Text style={{color:focused?"orangered":"#5c5c5c", fontSize: 16 }}>Accueil</Text>),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}