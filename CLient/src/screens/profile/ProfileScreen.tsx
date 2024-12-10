import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useAuthStore from '../../store/authStore'
import { HeaderBar } from '../../components'
import { AboutMe, GreenHeart, Heart, Lock, Notification, Right, SignOut } from '../../assets/svg'
//cap nhat thong tin sdt address
//doi mat khau
//favors
//logout
//có thể, address hiện cái trên sv,và danh sach local để xoá //dí vào ở address ở cart =>xoá
// có thể có thông báo, thông báo cập nhật thông tin, huỷ đơn...
const ProfileScreen = () => {
  const {user,logout}=useAuthStore()
  return (
    <View style={{gap:20}}> 
      <HeaderBar color='black' title='Profile'></HeaderBar>
      <View style={{alignItems:'center'}}>
        <Text style={{fontWeight:500}}>{user.username}</Text>
        <Text>{user.email}</Text>
      </View>
      <View style={{marginHorizontal:20,gap:20}}>
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
        <AboutMe></AboutMe>
        <Text style={{fontWeight:500}}>About me</Text>
          </View>
        <Right></Right>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
        <Lock></Lock>
        <Text style={{fontWeight:500}}>Change password</Text>
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