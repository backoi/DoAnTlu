import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { HeaderBar } from "../../components";
import {
  AboutMeGreen,
  Coupon,
  GreenHeart,
  Notification,
  Right,
  SignOut,
} from "../../assets/svg";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/NavigationType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deviceService } from "../../utils/deviceService";

//có thể, address hiện cái trên sv,và danh sach local để xoá //dí vào ở address ở cart =>xoá
// có thể có thông báo, thông báo cập nhật thông tin, huỷ đơn...
const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [user, setUser] = useState({ username: "", email: "" });
  //lay thong tin nguoi dung trong async storage
  const getInfor = async () => {
    const userinfor = await AsyncStorage.getItem("authUser");
    //const newuser=JSON.parse(userinfor)
    console.log("user infor in profile:", userinfor);
    if (userinfor) {
      setUser(JSON.parse(userinfor));
    }
  };
  const { logout } = useAuthStore();
  const handleLogout = async () => {
    Alert.alert(
      "Confirm logout?",
      "Are you sure you want to logout??",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              logout();
              const res = await deviceService.deleleDevice();
              console.log("delete device:", res);
            } catch (error: any) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  useEffect(() => {
    getInfor();
  }, []);
  return (
    <View style={{ gap: 20 }}>
      <HeaderBar color="black" title="Profile"></HeaderBar>
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
          source={{
            uri: "https://topdanangcity.com/wp-content/uploads/2024/09/avatar-trang-1Ob2zMM.jpg",
          }}
        ></Image>

        <Text style={{ fontWeight: 500 }}>{user?.username}</Text>
        <Text>{user?.email}</Text>
      </View>
      <View style={{ marginHorizontal: 20, gap: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Infor")}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <AboutMeGreen></AboutMeGreen>
            <Text style={{ fontWeight: 500 }}>About me</Text>
          </View>
          <Right></Right>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Coupon")}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Coupon></Coupon>
            <Text style={{ fontWeight: 500 }}>Coupon</Text>
          </View>
          <Right></Right>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Favorite")}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <GreenHeart></GreenHeart>
            <Text style={{ fontWeight: 500 }}>My Favorite</Text>
          </View>
          <Right></Right>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notification")}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Notification></Notification>
            <Text style={{ fontWeight: 500 }}>Notification</Text>
          </View>
          <Right></Right>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <SignOut></SignOut>
            <Text style={{ fontWeight: 500 }}>Sign out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
