// làm tiếp phần login token
import { View, Text, TouchableOpacity, StatusBar, ImageBackground, StyleSheet, Switch, Alert, ActivityIndicator, Modal } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, HeaderBar, InputComponent, Loading, Quantity, SpaceComponent, TextComponent } from '../../components'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from '../../constants/appColor';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { authService } from '../../utils/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import { RootStackParamList } from '../../assets/types/NavigationType';
const LoginScreen = () => {
  const navigation=useNavigation<NavigationProp<RootStackParamList>>()
  const toast=useToast()
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toggleSwitch = () => setIsEnabled(!isEnabled);
  //console.log(isEnabled)
  const storeData = async () => {
    try {
      if(isEnabled){
        await AsyncStorage.setItem('accessToken', 'dãy số accessToken');
      }
    } catch (e) {
      // saving error
    }
  };
  //const [test, setTest] = useState('');
  const handleLogin=async()=>{
    if(!email||!password){
      Alert.alert('Login failed','Please enter your email and password !!!');
      return
    }
    try {
      setIsLoading(true)
      const response = await authService.login(email, password);
      toast.show("Login success",{type:'success'})
      setIsLoading(false)
      storeData()
      navigation.navigate('Tab')
  } catch (error:any) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials !');
  }
  setIsLoading(false)  
  }


  // const storeData = async () => {
  //   try {
  //     await AsyncStorage.setItem('my-key', 'backoi');
  //   } catch (e) {
  //     // saving error
  //   }
  // };
  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('my-key');
  //     if (value !== null) {
  //       setTest(value)
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  
  return (
    <View style={{ flex: 1, }}>
      <StatusBar></StatusBar>
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/images/welcome1.png")}
        style={{ width: "100%", height: "140%",flex:1}}
      >
        <HeaderBar
          title="Login"
        ></HeaderBar>
      </ImageBackground>
      <View style={styles.textContainer}>
        <SpaceComponent height={20}/>
        <TextComponent text="Welcome back !" title />
        <TextComponent
          text='Sign in to your account'
        />
        <SpaceComponent height={20}/>
        <InputComponent value={email} onChangeText={text=>setEmail(text)} placeholder='Email Address' leftIC={<MaterialCommunityIcons name="email-outline" size={23} color={appColor.text} />}/>
        <SpaceComponent height={10}/>
        <InputComponent value={password} password placeholder='Password' onChangeText={text=>setPassword(text)}/>
        <SpaceComponent height={10}/>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Switch thumbColor={isEnabled?appColor.primary_dark:appColor.text} trackColor={{false: appColor.text, true: appColor.primary}} value={isEnabled} onValueChange={toggleSwitch}/>
            <Text>Remember me</Text>
          </View>

          <View style={{justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>navigation.navigate("Forget" as never)}>
              <Text style={{color:appColor.link}}>Forget password</Text>
            </TouchableOpacity>
          </View>
        </View>



         <ButtonComponent title="Login" onPress={handleLogin} />
        
        <SpaceComponent height={10}/>
        <View style={styles.viewTextLogin}>
        <Text style={{opacity:0.5}}>Don't have an account ? </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
          <Text style={{fontWeight:600}}>Sign up</Text>
        </TouchableOpacity>
        </View>
      </View> 
      
       <Loading visiable={isLoading}/>
      
      
    </View>
  )
}
const styles = StyleSheet.create({
  textContainer:{backgroundColor:appColor.background,flex:1,borderTopLeftRadius:20,borderTopRightRadius:20,paddingHorizontal:20},
  viewTextLogin:{
      justifyContent:'center',alignItems:'center',flexDirection:'row'
  },
  
})
export default LoginScreen