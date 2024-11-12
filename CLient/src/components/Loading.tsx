import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

type Props={
    visiable:boolean,
    message?:string
}

const Loading = ({visiable,message}:Props) => {
    
  return (
    <Modal
            transparent={true}
            visible={visiable}
            animationType="fade"
        >
            <View style={{flex:1,justifyContent:'center',backgroundColor:'rgba(52, 52, 52, 0.8)',}}>
                <View >
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>{message}</Text>
                </View>
            </View>
        </Modal>
       
  )
}

export default Loading

