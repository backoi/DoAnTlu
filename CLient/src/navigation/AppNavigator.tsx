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
import useAuthStore from "../store/authStore";
import MainNavigator from "./MainNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNavigator = () => {
  const [isSplash, setIsSplash] = useState(true);
  const {login,token,isRemember,isAuth,loadStoredToken}=useAuthStore()
  // const { getItem } = useAsyncStorage("accessToken");
  useEffect(() => {
    console.log("co nho mat khau",isRemember)
    loadStoredToken()
  }, [loadStoredToken]);

  return (
    <>
      {isAuth?<MainNavigator/>:<AuthNavigator/>}
    </>
      
    
  );
};

export default AppNavigator;
