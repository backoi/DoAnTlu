import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { User } from "../../assets/types/UserType";
import { authService } from "../../utils/authService";
import { useToast } from "react-native-toast-notifications";
import { RootStackParamList } from "../../assets/types/NavigationType";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../store/authStore";
const SignUpScreen = () => {
  const toast = useToast();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user, login, setIsRemember,setDeliveryAddress } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const handleSignUp = async ({ username, email, password }: FormikValues) => {
    const newUser: User = { username, email, password };
    try {
      setIsLoading(true);
      const response = await authService.register(newUser);
      console.log('data nhận được: ',response);
      const {accessToken}=response.data
      const user={ username,email,phone:'',address:''}
      login( user, accessToken);
      //navigation.navigate("Tab", { screen: "Home", params: {code:response.data.discountCode} } as never);
      setIsLoading(false);
      toast.show("Sign up success", { type: "success", placement: "top" });
      Alert.alert("Welcome to EcoMarket", "You get a discount code for new user: "+response.data.discountCode);
    } catch (error: any) {
      Alert.alert("Sign Up Failed", error.message || "An error occurred");
    }
    setIsLoading(false);
  };
  const SignupSchema = Yup.object().shape({
    username: Yup.string(),
    email: Yup.string()
      .email("Định dạng email không hợp lệ")
      .required("Bắt buộc nhập email"),
    password: Yup.string()
      .min(6, "Password phải có ít nhất 6 ký tự")
      .required("Bắt buộc nhập password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Password không khớp")
      .required("Bắt buộc nhập xác nhận password"),
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/images/welcome2.png")}
        style={{ width: "100%", height: "140%", flex: 0.7 }}
      >
        <HeaderBar title="Sign Up"></HeaderBar>
      </ImageBackground>
      <View style={styles.textContainer}>
        <SpaceComponent height={10} />
        <TextComponent text="Create an account" title />
        <TextComponent text="Quickly create account" />
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values: FormikValues) => handleSignUp(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }: FormikValues) => (
            <View>
              <InputComponent
                value={values.username}
                onChangeText={handleChange("username")}
                placeholder="Enter your name"
                leftIC={
                  <MaterialCommunityIcons
                    name="account-circle-outline"
                    size={23}
                    color={appColor.text}
                  />
                }
              />

              <InputComponent
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
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
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                password
                placeholder="Password"
              />
              <InputComponent
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                password
                placeholder="Confirm Password"
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: "red" }}>
                  {(touched.email && errors.email) ||
                    (touched.password && errors.password) ||
                    (touched.confirmPassword && errors.confirmPassword)}
                </Text>
              </View>
              <SpaceComponent height={5} />
              <ButtonComponent
                title="Create an account"
                onPress={handleSubmit}
              />
              <SpaceComponent height={10} />
            </View>
          )}
        </Formik>
        <View style={styles.viewTextLogin}>
          <Text style={{ opacity: 0.5 }}>Already have an account ? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login" as never)}
          >
            <Text style={{ fontWeight: 600 }}>Login</Text>
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
export default SignUpScreen;
