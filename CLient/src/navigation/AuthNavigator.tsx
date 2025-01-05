import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ForgetPassScreen,
  LoginScreen,
  OnBoardingScreen,
  OTPScreen,
  ResetPassScreen,
  SignUpScreen,
  WelcomeScreen,
} from "../screens";
import { RootStackParamList } from "../assets/types/NavigationType";
const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Forget" component={ForgetPassScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="ResetPass" component={ResetPassScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
