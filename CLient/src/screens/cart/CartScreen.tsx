import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useAuthStore from '../../store/authStore'

const CartScreen = () => {
  const {logout}= useAuthStore()
  return (
    <View>
      <TouchableOpacity onPress={logout} style={{width:80,height:50,backgroundColor:'red'}}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CartScreen