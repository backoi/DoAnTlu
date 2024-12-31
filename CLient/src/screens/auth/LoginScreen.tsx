import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  ButtonComponent,
  HeaderBar,
  InputComponent,
  Loading,
  SpaceComponent,
  TextComponent,
} from "../../components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from "../../constants/appColor";
import { NavigationProp, StackActions, useNavigation } from "@react-navigation/native";
import { authService } from "../../utils/authService";
import { useToast } from "react-native-toast-notifications";
import { RootStackParamList } from "../../assets/types/NavigationType";
import useAuthStore from "../../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { replace } from "formik";
const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const toast = useToast();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleSwitch = () => setIsEnabled(!isEnabled);
  const { user, login, setIsRemember,setDeliveryAddress } = useAuthStore();
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Login failed", "Please enter your email and password !!!");
      return;
    }
    try {
      if(isEnabled){
        setIsRemember(isEnabled);
      }
      setIsLoading(true);
      const response = await authService.login(email, password);
      const { username,phone,address, accessToken } = response.data;
      const user={ username,email,phone,address}
      //console.log(response.data)
      login( user, accessToken);
      //neu khong luu mat khau thi phai xoa sach, khong la se bi su dung lai du lieu store
      //AsyncStorage.clear()
      //setDeliveryAddress(response)
      setIsLoading(false);
      toast.show("Login success", { type: "success" });
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Invalid credentials !");
    }
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/images/welcome/welcome1.png")}
        style={{ width: "100%", height: "140%", flex: 1 }}
      >
        <HeaderBar onPress={()=>navigation.dispatch(StackActions.replace("Welcome"))} title="Login"></HeaderBar>
      </ImageBackground>
      <View style={styles.textContainer}>
        <SpaceComponent height={20} />
        <TextComponent text="Welcome back !" title />
        <TextComponent text="Sign in to your account" />
        <InputComponent
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email Address"
          leftIC={
            <MaterialCommunityIcons
              name="email-outline"
              size={23}
              color={appColor.text}
            />
          }
        />
        <InputComponent
          value={password}
          password
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Switch
              thumbColor={isEnabled ? appColor.primary_dark : appColor.text}
              trackColor={{ false: appColor.text, true: appColor.primary }}
              value={isEnabled}
              onValueChange={toggleSwitch}
            />
            <Text>Remember me</Text>
          </View>

          <View style={{ justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Forget")}
            >
              <Text style={{ color: appColor.link }}>Forget password</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ButtonComponent title="Login" onPress={handleLogin} />
        <SpaceComponent height={10} />
        <View style={styles.viewTextLogin}>
          <Text style={{ opacity: 0.5 }}>Don't have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ fontWeight: 600 }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Loading visiable={isLoading} />
    </View>
  );
};
const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: appColor.background,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  viewTextLogin: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
export default LoginScreen;
