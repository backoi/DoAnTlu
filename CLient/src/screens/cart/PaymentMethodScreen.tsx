import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ButtonComponent, HeaderBar } from "../../components";
import { appColor } from "../../constants/appColor";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useStripe } from "@stripe/stripe-react-native";
import { paymentService } from "../../utils/paymentService";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/NavigationType";
import useAuthStore from "../../store/authStore";

type Props = {};
const MethodType={
  CASH:'Cash',
  CARD:'Card',
}
const PaymentMethodScreen = ({route}:any,props:Props,) => {
  const deliveryAddress=route.params.deliveryAddress
  //const {deliveryAddress}=useAuthStore()
  //const address=(route.params.deliveryAddress=='Home')?:'';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {accessToken}=useAuthStore()
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [method, setMethod] = useState<string>();
  const items=route.params.cartItems
  console.log(items)
  // const items = [
  //   { product: "673b561ae94ddc75ed2ee89e", price: 2, quantity: 1 },
  //   { product: "673b57c3e94ddc75ed2ee956", price: 2, quantity: 3 },
  //   { product: "6735f5a01eae9f4224c95dc3", price: 2.5, quantity: 2 },
  // ];
  const createInit = async () => {
    const res = await paymentService.createPayment(items,accessToken);
    const { clientSecret } = res.data;
    console.log("key", clientSecret); //doan nay
    const ress = await initPaymentSheet({
      merchantDisplayName: "Customer",
      paymentIntentClientSecret: clientSecret,
      defaultBillingDetails: { name: "Customer" },
    });
    console.log("data", ress);
  };

  const handlePay = async () => {
    console.log('accestoken',accessToken)

    if (method == MethodType.CARD) {
      try {
        console.log('Card');
        //Create a new customer
        // const customer = await paymentService.createCustomer("John Doe");
        // console.log('customer',customer)
        // //Attach the customer to the payment
        // const attachCustomerRes = await paymentService.attachCustomerToPayment(customer.id, items);
        // console.log('attachCustomerRes',attachCustomerRes)
        // //Confirm the payment
        // const confirmPaymentRes = await paymentService.confirmPayment(items,customer.id,MethodType.CARD)
        // console.log('confirmPaymentRes',confirmPaymentRes)
        // Alert.alert("Payment successful");
        //Create a intent
        const res = await paymentService.createPayment(items,accessToken);
        const { clientSecret } = res.data;
        //console.log('clientSecret',clientSecret)
        const { error } = await initPaymentSheet({
          merchantDisplayName: "Customer",
          paymentIntentClientSecret: clientSecret,
          defaultBillingDetails: { name: "Customer" },
        });

        
        if (error) {
          Alert.alert("Payment failed", error.message);
        } else {
          //open payment sheet
          const { error } = await presentPaymentSheet();
          if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
          } else {
            paymentService.confirmPayment(accessToken,items,deliveryAddress,undefined,"Stripe Card",)
            //Alert.alert("Payment successful");
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    } 
    else {
      paymentService.confirmPayment(accessToken,items,deliveryAddress,undefined,MethodType.CASH)
      //Alert.alert("Payment cash successful");
      navigation.navigate('OrderSuccess')
    }
 
  };
  //  useEffect(()=>{
  //    //setItems(route.params.cartItems);
  //  },[])
  return (
    <View style={{ backgroundColor: appColor.background, flex: 1 }}>
      <HeaderBar color="black" title="Payment Mothod"></HeaderBar>
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
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{}}>2</Text>
        </View>
        <View
          style={{ height: 2, flex: 1, backgroundColor: appColor.border }}
        ></View>
        <View
          style={{
            height: 35,
            width: 35,
            borderRadius: 100,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{}}>3</Text>
        </View>
      </View>

      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <TouchableOpacity
          onPress={() => {
            setMethod(MethodType.CASH);
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            width: 200,
            borderWidth: 2,
            paddingHorizontal: 10,
            margin: 10,
          }}
        >
          {method == MethodType.CASH ? (
            <FontAwesome name="dot-circle-o"></FontAwesome>
          ) : (
            <FontAwesome name="circle-o"></FontAwesome>
          )}
          <Text style={{ padding: 10 }}>Cash on Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMethod(MethodType.CARD)
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            width: 200,
            borderWidth: 2,
            paddingHorizontal: 10,
            margin: 10,
          }}
        >
          {method == MethodType.CARD ? (
            <FontAwesome name="dot-circle-o"></FontAwesome>
          ) : (
            <FontAwesome name="circle-o"></FontAwesome>
          )}
          <Text style={{ padding: 10 }}>Pay by credit card</Text>
        </TouchableOpacity>
      </View>
      <View style={{ bottom: 10, right: 0, left: 0, position: "absolute" }}>
        <ButtonComponent disabled={!method} onPress={handlePay} title="Next"></ButtonComponent>
      </View>
    </View>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({});