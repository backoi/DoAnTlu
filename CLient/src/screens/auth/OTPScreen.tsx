import { TouchableOpacity, View,Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, HeaderBar, InputComponent, SpaceComponent, TextComponent } from '../../components'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from '../../constants/appColor';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { OtpInput } from 'react-native-otp-entry';
import { RootStackParamList } from '../../assets/types/NavigationType';
import { authService } from '../../utils/authService';
const OTPScreen = ({route}:any) => {
  const [limit,setLimit]=useState(60)
  let {code,email}=route.params
    const navigation=useNavigation<NavigationProp<RootStackParamList>>()
  const [otp,setOtp]= useState('')
  //console.log(otp)
  const handleVerify =()=>{
    if(!otp){
      Alert.alert('Vui lòng điền mã')
    }
    else if(otp!==code){
      Alert.alert('Sai mã')

    }
    else{
      navigation.navigate('ResetPass',email)

    }
  }
  const sendNewCode=async()=>{
    try {
      const res=await authService.forgotPass(email)
      code=res.data.code
      setLimit(60)
    } catch (error:any) {
      Alert.alert('loi',error.message)
    }
  }
  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);

    return (
    <View style={{marginHorizontal:10}}>
      <HeaderBar color='black' title='Verify number'/>
      <SpaceComponent height={100}/>
      <View style={{alignItems:'center'}}>
        <TextComponent title text='Verify your number'/>
        <Text>Check {email} to see code</Text>
        <TextComponent style={{textAlign:'center'}} text='Enter your OTP code below'/>
      </View>
      <SpaceComponent height={50}/>
      
      <OtpInput numberOfDigits={4} onFilled={(text) => setOtp(text)} 
      theme={{pinCodeContainerStyle:{
        width:50,height:50,
      },containerStyle:{width:300,alignSelf:'center'}}}/>
      <SpaceComponent height={20}/>
      <ButtonComponent onPress={()=>handleVerify()} title='Verify OTP'/>
      <SpaceComponent height={10}/>
      <View style={{alignSelf:'center'}}>
      <TextComponent text={`Didn't receive the code? Get new code in:`}></TextComponent>
      {
        limit==0?<TouchableOpacity onPress={()=>sendNewCode()}><TextComponent style={{fontWeight:500,color:'black',alignSelf:'center'}} 
        text='Resend a new code'></TextComponent></TouchableOpacity>:<Text style={{alignSelf:'center'}}>{limit}</Text>
      }
      </View>
    </View>
  )
}

export default OTPScreen