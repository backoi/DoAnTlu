import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ButtonComponent, HeaderBar } from "../../components";
import { appColor } from "../../constants/appColor";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";
import { useStripe } from "@stripe/stripe-react-native";
import { paymentService } from "../../utils/paymentService";
import axios from "axios";

type Props = {};

const PaymentMothodScreen = (props: Props) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [method, setMethod] = useState<any>();
 
  const items = [
    { product: "673b561ae94ddc75ed2ee89e", price: 2, quantity: 1 },
    { product: "673b57c3e94ddc75ed2ee956", price: 2, quantity: 3 },
    { product: "6735f5a01eae9f4224c95dc3", price: 2.5, quantity: 2 },
  ];
  const createInit=async()=>{
    const res = await paymentService.createPayment(items, "card", 13);
        const { clientSecret } = res.data;
        console.log('key',clientSecret)//doan nay
        const ress = await initPaymentSheet({
          merchantDisplayName: "Customer",
          paymentIntentClientSecret: clientSecret,
          defaultBillingDetails: { name: "Customer" },
        });
        console.log('data',ress)
  }
  const handlePay = async () => {
    if (method == "Card") {
      try {
        //Create a new customer
        const res = await paymentService.createPayment(items, "card", 13);
        //console.log('data secret', res.data);
         const { clientSecret } = res.data;
         //console.log('clientSecret',clientSecret)
         const { error } = await initPaymentSheet({
           merchantDisplayName: "Customer",
          paymentIntentClientSecret: clientSecret,
          defaultBillingDetails: { name: "Customer" },
          
         });
        
      
        
        //await openPaymentSheet()
         console.log(" hien card xong");
         if (error) {
            Alert.alert("Payment failed", error.message);
          } else {
           console.log("bat dau hien card");
         const { error } = await presentPaymentSheet();
           console.log("hien card xong");
          //console.log(present)
            if (error) {
              Alert.alert(`Error code: ${error.code}`, error.message);
            } else {
              Alert.alert("Success", "Your order is confirmed!");
            }
          console.log("ket thuc");
          Alert.alert("Payment successful");
          // Gửi xác nhận thanh toán đến backend
          // await axios.post('http://localhost:3000/payment/confirm-payment', {
          //     orderId: res.data.orderId,
          //     paymentStatus: 'Paid',
          // });
        }
        //const { clientSecret } = response.data;
      } catch (error) {
        console.log("error", error);
      }
    } else console.log("Cash");
  };
  const openPaymentSheet = async () => {
    console.log("chuan bi hien card");
    const { error } = await presentPaymentSheet({timeout: 3000});
    console.log("da hien card");
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };
  const checkout = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      // handle error
    } else {
      // success
    }
  };
  const handleSaveCard = (item: any) => {
    
  };
  useEffect(()=>{
    //createInit()
    console.log('đã ren xong')
  },[])

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
            setMethod("Cash")
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
          {method == "Cash" ? (
            <FontAwesome name="dot-circle-o"></FontAwesome>
          ) : (
            <FontAwesome name="circle-o"></FontAwesome>
          )}
          <Text style={{ padding: 10 }}>Cash on Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMethod("Card");

            //handleOpenCard()
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
          {method == "Card" ? (
            <FontAwesome name="dot-circle-o"></FontAwesome>
          ) : (
            <FontAwesome name="circle-o"></FontAwesome>
          )}
          <Text style={{ padding: 10 }}>Pay by credit card</Text>
        </TouchableOpacity>
      </View>
      <View style={{ bottom: 10, right: 0, left: 0, position: "absolute" }}>
        <ButtonComponent onPress={handlePay} title="Next"></ButtonComponent>
      </View>

    </View>
  );
};

export default PaymentMothodScreen;

const styles = StyleSheet.create({});
