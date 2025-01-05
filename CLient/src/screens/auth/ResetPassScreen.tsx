import { Text, View } from "react-native";
import React, { useState } from "react";
import {
  ButtonComponent,
  HeaderBar,
  InputComponent,
  Loading,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { useToast } from "react-native-toast-notifications";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { authService } from "../../utils/authService";
import { RootStackParamList } from "../../assets/types/NavigationType";
const ResetPassScreen = ({ route }: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  console.log("route", route);
  const email = route.params;
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChangePass = async () => {
    const res = await authService.changePass(email, password);
    console.log("res", res?.data);
    toast.show("Changed password!!", { type: "success", placement: "top" });
    navigation.navigate("Login");
  };
  const validator = (key: string) => {
    let error = "";
    switch (key) {
      case "password":
        if (password.length < 6) {
          error = "Password must be longer than 6 characters";
        } else {
          error = "";
        }
        break;
      case "confirmPassword":
        if (!confirmPassword) {
          error = "Please enter confirm password";
        } else if (password !== confirmPassword) {
          error = "Password is not match";
        }
        break;
    }
    setErrorMessage(error);
  };
  return (
    <View style={{ marginHorizontal: 10 }}>
      <HeaderBar color="black" title="Reset Password" />
      <SpaceComponent height={100} />
      <View style={{ alignItems: "center" }}>
        <TextComponent title text="Change new password" />
        <TextComponent
          style={{ textAlign: "center" }}
          text="Enter your password"
        />
      </View>
      <SpaceComponent height={50} />
      <InputComponent
        value={password}
        onChangeText={(text) => setPassword(text)}
        onBlur={() => validator("password")}
        password
        placeholder="Password"
      />
      <SpaceComponent height={10} />
      <InputComponent
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        onBlur={() => validator("confirmPassword")}
        password
        placeholder="Confirm Password"
      />
      <SpaceComponent height={5} />
      <SpaceComponent height={20} />
      <Text>{errorMessage ?? errorMessage}</Text>
      <ButtonComponent
        onPress={() => handleChangePass()}
        title="Change password"
      />
      <Loading visiable={loading}></Loading>
    </View>
  );
};

export default ResetPassScreen;
