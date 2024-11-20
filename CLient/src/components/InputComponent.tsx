import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { ReactNode, useState } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from '../constants/appColor';

interface Props{
  placeholder?:string,
  leftIC?:ReactNode,
  password?:boolean,
  rightIC?:ReactNode,
  value?:string,
  onChangeText:(val:string)=>void|undefined
  onBlur?:(e:any)=>void
  //onblur
}

const InputComponent = (props:Props) => {
  const {placeholder,leftIC,password,rightIC,value,onChangeText,onBlur}=props
  const [isShowedPass,setIsShowedPass] =useState(true)
  return (
    <View style={styles.inputContainer}>
      {
        password?<MaterialCommunityIcons name="lock-outline" size={23} color={appColor.text} />:leftIC
      }
      
      <TextInput onChangeText={text=>onChangeText(text)} onBlur={onBlur} value={value} secureTextEntry={password&&isShowedPass} placeholder={placeholder} style={styles.textInput}></TextInput>
      {
        password?<TouchableOpacity onPress={()=>setIsShowedPass(!isShowedPass)}><MaterialCommunityIcons name={isShowedPass?'eye-off-outline':'eye-outline'} size={23} color={appColor.text} /></TouchableOpacity>:null
      }
      {
        rightIC??rightIC
      }
      
    
    </View>
  )
}
const styles = StyleSheet.create({
  inputContainer:{flex:1,backgroundColor:'white',flexDirection:'row',height:50,alignItems:'center',borderRadius:5,paddingHorizontal:10,},
  textInput:{marginLeft:10,fontSize:17,flex:1}
  
})
export default InputComponent