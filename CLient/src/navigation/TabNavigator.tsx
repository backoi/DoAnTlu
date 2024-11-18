import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CartScreen, DetailScreen, HomeScreen } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import FavoriteScreen from '../screens/favorite/FavoriteScreen';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Favorite" component={FavoriteScreen} />
        
      </Tab.Navigator>
    
  )
}

export default TabNavigator