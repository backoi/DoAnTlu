import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ButtonComponent, SpaceComponent } from "../../components";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RootStackParamList } from "../../assets/types/NavigationType";
import { appColor } from "../../constants/appColor";
import useCartStore from "../../store/cartStore";

const OrderSuccessScreen = () => {
  const { clearCart } = useCartStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(() => {
    clearCart();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1, margin: 10 }}>
      <TouchableOpacity
        style={{}}
        onPress={() => navigation.navigate("Tab", { screen: "Home" } as never)}
      >
        <FontAwesome name="remove" size={25}></FontAwesome>
      </TouchableOpacity>
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 30,
            }}
          >
            <View
              style={{
                height: 35,
                width: 35,
                borderRadius: 100,
                backgroundColor: appColor.primary_dark,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{}}>1</Text>
            </View>
            <View
              style={{ height: 2, flex: 1, backgroundColor: appColor.primary }}
            ></View>
            <View
              style={{
                height: 35,
                width: 35,
                borderRadius: 100,
                backgroundColor: appColor.primary_dark,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{}}>2</Text>
            </View>
            <View
              style={{ height: 2, flex: 1, backgroundColor: appColor.primary }}
            ></View>
            <View
              style={{
                height: 35,
                width: 35,
                borderRadius: 100,
                backgroundColor: appColor.primary_dark,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{}}>3</Text>
            </View>
          </View>

          <LottieView
            source={require("../../assets/json/thumbs.json")}
            // ref={animation}
            style={{
              height: 260,
              width: 300,
              alignSelf: "center",
              marginTop: 40,
              justifyContent: "center",
            }}
            autoPlay
            loop
            speed={0.7}
          />
          <Text
            style={{
              marginTop: 20,
              fontSize: 19,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Your order has been successful.
          </Text>
          <LottieView
            source={require("../../assets/json/sparkle.json")}
            style={{
              height: 300,
              position: "absolute",
              top: 100,
              width: 300,
              alignSelf: "center",
            }}
            autoPlay
            loop
            speed={0.7}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <ButtonComponent
            onPress={() =>
              navigation.navigate("Tab", { screen: "Order" } as never)
            }
            title="View Oder History"
          ></ButtonComponent>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({});
