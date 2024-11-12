import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./src/navigation/AuthNavigator";
import TabNavigator from "./src/navigation/TabNavigator";
import { HomeScreen, OnBoardingScreen, SplashScreen } from "./src/screens";
import AppNavigator from "./src/navigation/AppNavigator";
import { ToastProvider } from 'react-native-toast-notifications'
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <AppNavigator/>     
    </NavigationContainer>
    </ToastProvider>
  //   isSplash ? (
  //     <SplashScreen />
  //   ) : (
  //     <NavigationContainer>
  //       <AuthNavigator />
  //     </NavigationContainer>
  //   )
  // );

  // <OnBoardingScreen/>
  
//<AuthNavigator/>
  
  
  
  )
}