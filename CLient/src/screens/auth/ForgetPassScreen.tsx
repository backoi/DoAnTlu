import { Alert, View } from "react-native";
import React, { useState } from "react";
import {
  ButtonComponent,
  HeaderBar,
  InputComponent,
  Loading,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { authService } from "../../utils/authService";
import { RootStackParamList } from "../../assets/types/NavigationType";
import { Email } from "../../assets/svg";
const ForgetPassScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const handleSentOTP = async () => {
    try {
      setLoading(true);
      const res = await authService.forgotPass(email);
      const { code } = res.data;
      setLoading(false);
      navigation.navigate("OTP", { code, email });
    } catch (error: any) {
      setLoading(false);
      //console.log('error', error);
      Alert.alert("Error", error.message);
    }
  };
  return (
    <View style={{ marginHorizontal: 10 }}>
      <HeaderBar color="black" title="Password Recovery" />
      <SpaceComponent height={100} />
      <View style={{ alignItems: "center" }}>
        <TextComponent title text="Forgot password" />
        <TextComponent
          style={{ textAlign: "center" }}
          text="Lorem ipsum dolor sit amet, consetetur 
sadipscing elitr, sed diam nonumy"
        />
      </View>
      <SpaceComponent height={50} />
      <InputComponent
        leftIC={
          <Email
            color={appColor.text}
          />
        }
        placeholder="Email address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <SpaceComponent height={20} />
      <ButtonComponent title="Send link" onPress={handleSentOTP} />
      <Loading visiable={loading} />
    </View>
  );
};

export default ForgetPassScreen;
