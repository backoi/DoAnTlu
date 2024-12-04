import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddAddressScreen, CategoryScreen, DetailScreen, ForgetPassScreen, LoginScreen, OnBoardingScreen, OTPScreen, PaymentMothodScreen, ResetPassScreen, ReviewScreen, SearchScreen, SignUpScreen, WelcomeScreen, WriteReviewScreen } from '../screens';
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
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="WriteReview" component={WriteReviewScreen} />
        <Stack.Screen name="Payment" component={PaymentMothodScreen} />
        <Stack.Screen name="AddAddress" component={AddAddressScreen} />

      </Stack.Navigator>
  )
}

export default MainNavigator