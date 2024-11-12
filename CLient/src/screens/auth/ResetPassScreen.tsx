import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, HeaderBar, InputComponent, SpaceComponent, TextComponent } from '../../components'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from '../../constants/appColor';
import {  useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import { authService } from '../../utils/authService';
const ResetPassScreen = ({route}:any) => {
  const {email}=route.params
  const toast=useToast()
  const navigation=useNavigation()
  const [errorMessage,setErrorMessage]= useState('')
  const [password,setPassword]= useState('')
  const [confirmPassword,setConfirmPassword]= useState('')
  const handleChangePass=async()=>{
    //await authService.changePass(email,password)
    toast.show("Changed password!!",{type:'success',placement:'top'})
    navigation.navigate('Login' as never)
  }
  const validator =(key: string)=>{
    let error=""
    switch(key){
      case 'password':
        if(password.length<6){
          error='Password must be longer than 6 characters'
        }
        else{
          error=''
        }
      break
      case 'confirmPassword':
        if(!confirmPassword){
          error='Please enter confirm password'
        }
        else if(password!==confirmPassword){
          error='Password is not match'
        }
        break
    }
    setErrorMessage(error)
  }
  return (
    <View style={{marginHorizontal:10}}>
      <HeaderBar color='black' title='Reset Password'/>
      <SpaceComponent height={100}/>
      <View style={{alignItems:'center'}}>
        <TextComponent title text='Change new password'/>
        <TextComponent style={{textAlign:'center'}} text='Enter your password'/>
      </View>
      <SpaceComponent height={50}/>
      <InputComponent value={password} onChangeText={text=>setPassword(text)} onBlur={()=>validator('password')} password placeholder='Password'/>
        <SpaceComponent height={10}/>
        <InputComponent value={confirmPassword} onChangeText={text=>setConfirmPassword(text)} onBlur={()=>validator('confirmPassword')} password placeholder='Confirm Password'/>
        <SpaceComponent height={5}/>
      <SpaceComponent height={20}/>
      <Text>{errorMessage??errorMessage}</Text>
      <ButtonComponent onPress={()=>handleChangePass()} title='Change password'/>
    </View>
  )
}

export default ResetPassScreen