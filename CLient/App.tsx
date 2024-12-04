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
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import MainNavigator from "./src/navigation/MainNavigator";
import { StripeProvider } from "@stripe/stripe-react-native";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <StripeProvider  urlScheme="your-url-scheme"
    merchantIdentifier="merchant.identifier"
    publishableKey="pk_test_51QRxCpFWO9StdPGrHUJoiIrseSZeNsHxfzILLiGXPZQ1F05bm8Kvz5NzhBTtKvH83BRk37t3GhebOsVddX4jWkvq002GrA5Blx">

        <GestureHandlerRootView>
    <ToastProvider>
      <NavigationContainer>
         
        
          <AppNavigator/>
       
      </NavigationContainer>
    </ToastProvider>
    </GestureHandlerRootView>
      </StripeProvider>
    

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