import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CartScreen, DetailScreen, HomeScreen, OrderScreen, ProfileScreen } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Order" component={OrderScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        
      </Tab.Navigator>
    
  )
}

export default TabNavigator