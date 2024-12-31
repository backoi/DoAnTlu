import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddAddressScreen, CategoryScreen, DetailScreen, 
  ForgetPassScreen, LoginScreen, OrderSuccessScreen, 
  OnBoardingScreen, OTPScreen, PaymentMethodScreen, ResetPassScreen, 
  ReviewScreen, SearchScreen, SignUpScreen, WelcomeScreen, 
  WriteReviewScreen, DetailOrderScreen, InforScreen, FavoriteScreen, 
  TrackOrderScreen,
  CouponScreen,
  BestSellerScreen,
  NotificationScreen} from '../screens';
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
        <Stack.Screen name="Payment" component={PaymentMethodScreen} />
        <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
        <Stack.Screen name="DetailOrder" component={DetailOrderScreen} />
        <Stack.Screen name="Infor" component={InforScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
        <Stack.Screen name="Coupon" component={CouponScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />

      </Stack.Navigator>
  )
}

export default MainNavigator