import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, HeaderBar, InputComponent, SpaceComponent } from '../../components'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from '../../constants/appColor';
import { addAddresses, getAddresses, removeValue,  } from '../../utils/addressStore';
import useAuthStore from '../../store/authStore';

type Props = {}

const AddAddressScreen = (props: Props) => {
  const {addAddress}= useAuthStore()
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [address,setAddress]=useState('')
  const [city,setCity]=useState('')
  const handleAddAddress = async() => {
    const newAddress ={
        name,
        phone,
        address,
        city
    }
    await addAddress(newAddress)
    //await addAddresses(newAddress)
    
  };
  const handleSee = () => {
    getAddresses()
  };
    

  return (
    <View style={{flex:1,backgroundColor:'#C4C4C4'}}>
      <HeaderBar color='black' title='Add Address'/>
      <SpaceComponent height={23}/>
      <View style={{flex:1,justifyContent:'space-between',marginHorizontal:10,marginBottom:20}}>
        <View>

        <InputComponent value={name} onChangeText={setName} placeholder='Name' leftIC={<MaterialCommunityIcons
                  name="account-circle-outline"
                  size={23}
                  color={appColor.text}
                  />} ></InputComponent>
        <InputComponent value={phone} placeholder='Phone' leftIC={<MaterialCommunityIcons
                  name="phone-outline"
                  size={23}
                  color={appColor.text}
                  />} onChangeText={setPhone}></InputComponent>
        <InputComponent value={address}placeholder='Address' leftIC={<MaterialCommunityIcons
                  name="home-map-marker"
                  size={23}
                  color={appColor.text}
                  />} onChangeText={setAddress}></InputComponent>
        <InputComponent value={city} placeholder='City' leftIC={<MaterialCommunityIcons
                  name="map-outline"
                  size={23}
                  color={appColor.text}
                  />} onChangeText={setCity}></InputComponent>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Switch></Switch>
                    <Text>Save this address</Text>
                  </View>
        </View>
            <ButtonComponent onPress={handleAddAddress} title='Add address'></ButtonComponent>
      </View>
    </View>
  )
}


export default AddAddressScreen
//khi nao set default thì mới truyền lên api
const styles = StyleSheet.create({})