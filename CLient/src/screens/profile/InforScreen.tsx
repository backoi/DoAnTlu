import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, HeaderBar, InputComponent } from '../../components'
import { AboutMe, Email, Heart, Mark, Phone } from '../../assets/svg'
import { userService } from '../../utils/userService'
import useAuthStore from '../../store/authStore'

type Props = {}

const InforScreen = (props: Props) => {
    const {accessToken}=useAuthStore()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [address,setAddress]=useState('')

    const getInfor=async()=>{
        const res=await userService.getInfor(accessToken)
        const {user}=res.data
        console.log(res?.data.user)
        setName(user.username)
        setEmail(user.email)
        setPhone(user.phone)
        setAddress(user.address)
    }
    useEffect(() => {
        getInfor()
    },[])


  return (
    <View>
      <HeaderBar color='black' title='About me'/>
      <View>
        <View>
            <Text>Presonal details</Text>
            <InputComponent leftIC={<AboutMe/>} onChangeText={setName} value={name} ></InputComponent>
            <InputComponent leftIC={<Email/>} onChangeText={setEmail} value={email} ></InputComponent>
            <InputComponent leftIC={<Phone/>} onChangeText={setPhone} value={phone} ></InputComponent>
            <InputComponent leftIC={<Mark/>} onChangeText={setAddress} value={address} ></InputComponent>
        </View>

        <ButtonComponent title='Save Change'></ButtonComponent>
      </View>
    </View>
  )
}

export default InforScreen

const styles = StyleSheet.create({})