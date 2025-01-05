import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, HeaderBar, InputComponent, Loading } from '../../components'
import { AboutMe, Email, Heart, Lock, Mark, Phone } from '../../assets/svg'
import { userService } from '../../utils/userService'
import useAuthStore from '../../store/authStore'
import { useToast } from 'react-native-toast-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { validateEmail } from '../../utils/validate'
type Props = {}

const InforScreen = ({navigation}:any) => {
  const toast = useToast()
    const [isLoading, setIsLoading] = useState(false);
    const [userInfor,setUserInfor]=useState({username:'',email:'',phone:'',address:'',})
    const [passwordInfo, setPasswordInfo] = useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    const [emailError, setEmailError] = useState('');
        const getInforFormServer=async()=>{
        const res=await userService.getInfor()
        //const {user}=res.data
        console.log(res?.data.user)
        //setUserInfor(user)
    }
    const loadInfor=async()=>{
      const userinfor= await AsyncStorage.getItem('authUser')
      if(userinfor){
        setUserInfor(JSON.parse(userinfor))
      }
    }
    
    const validatePassword = () => {
      if(!passwordInfo.currentPassword&&!passwordInfo.newPassword&&!passwordInfo.confirmPassword){
        //Alert.alert('co the update', 'update duoc nha');
        return true;
      }
      if (!passwordInfo.currentPassword || !passwordInfo.newPassword || !passwordInfo.confirmPassword) {
        Alert.alert("All password fields are required!");
        return false;
      }
      if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
        Alert.alert("Passwords do not match!");
        return false;
      }
      if (passwordInfo.newPassword.length < 6) {
        Alert.alert("Password must be at least 8 characters!");
        return false;
      }
      return true;
    };
    // const handleSave2 = async () => {
    //   try {
    //     //const res = await userService.updateInfor(userInfor); // Gửi yêu cầu cập nhật
    //       if(validatePassword()){
    //         if (passwordInfo.currentPassword && passwordInfo.newPassword && passwordInfo.confirmPassword) {
    //           // Update both information and password
    //           await userService.updateInfor(userInfor);
    //           await userService.updatePassword({
    //             currentPassword: passwordInfo.currentPassword,
    //             newPassword: passwordInfo.newPassword,
    //           });

    //         } else {
    //           // Update information only
    //           await userService.updateInfor(userInfor);
    //         }
    //       }
    //       console.log('Thay đổi thành công'); // In ra dữ liệu mới trả về từ API
    //       toast.show('Update success', { type: 'success' }); //vui long dang xuat de cap nhat thong tin
    //       navigation.goBack();
        
    //   } catch (error:any) {
    //     Alert.alert('Update failed', error.message || 'An error occurred'); // Thông báo lỗi
    //     //console.error('Cập nhật thất bại', error);
    //   }
    // };
    const handleSave = async () => {
      try {
        if (emailError) {
          Alert.alert("Invalid Email", "Please enter a valid email address.");
          return;
        }
        if (validatePassword()) {
          const updateData:any = { ...userInfor }; // Tạo bản sao của thông tin người dùng để cập nhật
    
          // Chỉ thêm thông tin mật khẩu nếu người dùng muốn thay đổi mật khẩu
          if (passwordInfo.currentPassword && passwordInfo.newPassword && passwordInfo.confirmPassword) {
            updateData.currentPassword = passwordInfo.currentPassword;
            updateData.newPassword = passwordInfo.newPassword;
          }
          setIsLoading(true);
          await userService.updateInfor(updateData); // Gọi API cập nhật tất cả
          setIsLoading(false);
          console.log('Changes saved successfully');
          toast.show('Update success', { type: 'success' });
          navigation.goBack();
        }
      } catch (error: any) {
        setIsLoading(false);
        Alert.alert('Update failed', error.message || 'An error occurred');
        //console.error('Update failed:', error);
      }
    };
    
    useEffect(() => {
        loadInfor()
    },[])



  const handleEmailChange = (text: string) => {
    setUserInfor({ ...userInfor, email: text });

    if (!validateEmail(text)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  }

  return (
    <View style={{justifyContent:'space-between',flex:1,marginBottom:20,marginHorizontal:10}}>
      <View>
      <HeaderBar back color='black' title='About me'/>
      
        <View>
            <Text>Presonal details</Text>
            <InputComponent leftIC={<AboutMe/>} onChangeText={(text)=>setUserInfor({...userInfor,username:text})} value={userInfor.username} ></InputComponent>
            <InputComponent keyboardType='email-address' leftIC={<Email/>} onChangeText={handleEmailChange} value={userInfor.email} ></InputComponent>
            <InputComponent keyboardType='number-pad' leftIC={<Phone/>} onChangeText={(text)=>setUserInfor({...userInfor,phone:text})} value={userInfor.phone} ></InputComponent>
            <InputComponent leftIC={<Mark/>} onChangeText={(text)=>setUserInfor({...userInfor,address:text})} value={userInfor.address} ></InputComponent>
        </View>
        <View>
            <Text>Change password</Text>
            <InputComponent leftIC={<Lock/>} placeholder='Current password' onChangeText={(text)=>setPasswordInfo({...passwordInfo,currentPassword:text})} value={passwordInfo.currentPassword} ></InputComponent>
            <InputComponent leftIC={<Lock/>} placeholder='New password' onChangeText={(text)=>setPasswordInfo({...passwordInfo,newPassword:text})} value={passwordInfo.newPassword} ></InputComponent>
            <InputComponent leftIC={<Lock/>} placeholder='Confirm password' onChangeText={(text)=>setPasswordInfo({...passwordInfo,confirmPassword:text})} value={passwordInfo.confirmPassword} ></InputComponent>
        </View>
        </View>
        <ButtonComponent onPress={handleSave} title='Save Change'></ButtonComponent>
      
      <Loading visiable={isLoading}></Loading>
    </View>
  )
}

export default InforScreen

const styles = StyleSheet.create({})