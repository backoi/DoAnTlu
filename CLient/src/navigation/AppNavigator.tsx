import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DetailScreen,
  LoginScreen,
  OnBoardingScreen,
  SignUpScreen,
  WelcomeScreen,
} from "../screens";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import { RootStackParamList } from "../assets/types/NavigationType";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNavigator = () => {
  const [isSplash, setIsSplash] = useState(true);
  const { getItem } = useAsyncStorage("accessToken");
  const checkLogin = async () => {
    const token = await getItem();
    console.log("gia tri token", token);
    //luu vao zustand để dùng xem thử ngdung có lưu mật khẩu không, có thì vào thẳng home
  };
  useEffect(() => {
    // const timeout = setTimeout(() => {
    //   setIsSplash(false);
    // }, 1500);
    // return () => clearTimeout(timeout);
    checkLogin();
  }, []);

  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
