import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import Icon from "react-native-vector-icons/FontAwesome6";
import { appSize } from '../constants/appSize';
import { useNavigation } from '@react-navigation/native';

interface Props{
    rightIC?: ReactNode,
    title: string,
    color?:string,
    onPress?:()=>void,
}
const HeaderBarComponent = (props:Props) => {
    const navigation=useNavigation()
    const {title,rightIC,color,onPress}=props
  return (
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <TouchableOpacity onPress={onPress?onPress:()=>navigation.goBack()}><Icon name='arrow-left' size={19} color={color??'white'}></Icon></TouchableOpacity>
    
    <Text style={[styles.text,{color:color??'white'}]}>{title}</Text>
    {
        rightIC?rightIC:<View/>
    }
    
    </View>
  )
};
const styles = StyleSheet.create({
    text:{
        fontSize:appSize.para,
        
    }
})
export default HeaderBarComponent

