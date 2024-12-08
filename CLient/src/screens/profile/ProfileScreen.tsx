import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useAuthStore from '../../store/authStore'
//cap nhat thong tin sdt address
//doi mat khau
//favors
//logout
//có thể, address hiện cái trên sv,và danh sach local để xoá //dí vào ở address ở cart =>xoá
// có thể có thông báo, thông báo cập nhật thông tin, huỷ đơn...
const ProfileScreen = () => {
  const {logout}=useAuthStore()
  return (
    <View>
      <Text>ProfileScreen</Text>
      <TouchableOpacity onPress={logout}>

      <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen