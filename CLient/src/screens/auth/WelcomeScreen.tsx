import {
  View,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import {
  ButtonComponent,
  HeaderBar,
  SpaceComponent,
  TextComponent,
} from "../../components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from "../../constants/appColor";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/NavigationType";

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/images/welcome/welcome.png")}
        style={{ width: "100%", height: "110%", flex: 1.7 }}
      >
        <HeaderBar
          onPress={() => navigation.navigate("OnBoarding")}
          title={""}
        ></HeaderBar>
      </ImageBackground>
      <View style={styles.textContainer}>
        <SpaceComponent height={20} />
        <TextComponent text="Welcome" title />
        <TextComponent
          text="Lorem ipsum dolor sit amet, consetetur 
sadipscing elitr, sed diam nonumy"
        />
        <SpaceComponent height={10} />
        <ButtonComponent
          icon={
            <MaterialCommunityIcons
              name="google"
              size={23}
              color={"gray"}
            ></MaterialCommunityIcons>
          }
          color={["white", "white"]}
          title="Continue with google"
          textColor="black"
        />
        <SpaceComponent height={10} />
        <ButtonComponent
          title="Login with Email"
          onPress={() => navigation.navigate("Login")}
          icon={
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={23}
              color={"white"}
            ></MaterialCommunityIcons>
          }
        />
        <SpaceComponent height={10} />
        <View style={styles.viewTextLogin}>
          <Text style={{ opacity: 0.5 }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ fontWeight: 600 }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
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
export default WelcomeScreen;
