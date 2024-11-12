import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { appColor } from '../constants/appColor'

const SplashScreen = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:appColor.primary_light}}>
      <Image
       style={{width:200,height:200}}
        source={require('../assets/images/logo.png')
        }
      />
      <ActivityIndicator size={30}></ActivityIndicator>
    </View>
  )
}

export default SplashScreen