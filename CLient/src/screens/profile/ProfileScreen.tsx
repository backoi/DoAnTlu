import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import useAuthStore from '../../store/authStore'
import { HeaderBar } from '../../components'
import { AboutMeGreen, GreenHeart, Notification, Right, SignOut } from '../../assets/svg'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../assets/types/NavigationType'
//cap nhat thong tin sdt address
//doi mat khau
//favors
//logout
//có thể, address hiện cái trên sv,và danh sach local để xoá //dí vào ở address ở cart =>xoá
// có thể có thông báo, thông báo cập nhật thông tin, huỷ đơn...
const ProfileScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const {user,logout}=useAuthStore()
  return (
    <View style={{gap:20}}> 
      <HeaderBar color='black' title='Profile'></HeaderBar>
      <View style={{alignItems:'center'}}>
                    <Image style={{width:50,height:50,borderRadius:50}} source={{uri:'https://topdanangcity.com/wp-content/uploads/2024/09/avatar-trang-1Ob2zMM.jpg'}}></Image>
        
        <Text style={{fontWeight:500}}>{user.username}</Text>
        <Text>{user.email}</Text>
      </View>
      <View style={{marginHorizontal:20,gap:20}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Infor')} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
        <AboutMeGreen></AboutMeGreen>
        <Text style={{fontWeight:500}}>About me</Text>
          </View>
        <Right></Right>
        </TouchableOpacity>
        
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
        <GreenHeart></GreenHeart>
        <Text style={{fontWeight:500}}>My Favorite</Text>
          </View>
        <Right></Right>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
        <Notification></Notification>
        <Text style={{fontWeight:500}}>Notification</Text>
          </View>
        <Right></Right>
        </TouchableOpacity>
       
        <TouchableOpacity onPress={logout} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
        <SignOut></SignOut>
        <Text style={{fontWeight:500}}>Sign out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileScreen