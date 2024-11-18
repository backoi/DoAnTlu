import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoryScreen, DetailScreen, ForgetPassScreen, LoginScreen, OnBoardingScreen, OTPScreen, ResetPassScreen, SearchScreen, SignUpScreen, WelcomeScreen } from '../screens';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../assets/types/NavigationType';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
const Stack = createNativeStackNavigator<RootStackParamList>();
const MainNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{
        headerShown:false
      }}>
        
        <Stack.Screen name="Tab" component={TabNavigator} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        
        
      </Stack.Navigator>
  )
}

export default MainNavigator