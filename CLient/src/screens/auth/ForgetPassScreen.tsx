import { Alert, View } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, HeaderBar, InputComponent, SpaceComponent, TextComponent } from '../../components'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from '../../constants/appColor';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { authService } from '../../utils/authService';
import { RootStackParamList } from '../../assets/types/NavigationType';
const ForgetPassScreen = () => {
  const navigation=useNavigation<NavigationProp<RootStackParamList>>()
  const [email,setEmail]= useState('')
  const handleSentOTP=async()=>{
    try {
      const res=await authService.forgotPass(email)
    const {code}=res.data
    navigation.navigate("Otp",{code,email})
    } catch (error:any) {
      Alert.alert('loi',error.message)
    }
  }
  return (
    <View style={{marginHorizontal:10}}>
      <HeaderBar color='black' title='Password Recovery'/>
      <SpaceComponent height={100}/>
      <View style={{alignItems:'center'}}>
        <TextComponent title text='Forgot password'/>
        <TextComponent style={{textAlign:'center'}} text='Lorem ipsum dolor sit amet, consetetur 
sadipscing elitr, sed diam nonumy'/>
      </View>
      <SpaceComponent height={50}/>
      <InputComponent leftIC={<MaterialCommunityIcons name="email-outline" size={23} color={appColor.text} />} placeholder='Email address' value={email} onChangeText={(text)=>setEmail(text)}/>
      <SpaceComponent height={20}/>
      <ButtonComponent title='Send link' onPress={()=>handleSentOTP()} />
    </View>
  )
}

export default ForgetPassScreen