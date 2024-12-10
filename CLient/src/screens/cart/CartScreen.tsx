import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import React, { useEffect, useMemo, useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";
import { ButtonComponent, HeaderBar, ItemProduct, SpaceComponent } from "../../components";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/NavigationType";
import BottomSheet, {
  BottomSheetFlatList, //không mượt
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BigCart, Cart } from "../../assets/svg";
import { appColor } from "../../constants/appColor";
import axios from "axios";
import { paymentService } from "../../utils/paymentService";

const CartScreen = () => {
  const { logout,user,deliveryAddress ,accessToken} = useAuthStore();
  const {
    cartItems,
    totalQuantity,
    decreaseQuantity,
    increaseQuantity,
    totalPrice,
    clearCart,
  } = useCartStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const snapPoints = useMemo(() => ['25%', '40%',], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [coupon,setCoupon] = useState('')
  const [discountPerc,setDiscountPerc] = useState(0)
  const [address,setAddress]=useState<any>(deliveryAddress)
  const [listAddress,setListAddress]=useState<any>([])
  //const [totalAmount,setTotalAmount]=useState(totalPrice)
  
  const listItemsCart=cartItems.map((item)=>({product:item.id,quantityPurchased:item.quantity,amountPrice:(item.price*item.quantity)}))
  const handleOder = () => {
    //nhu nay hop ly k, bat nguoi dung nhap lai
    setCoupon('')
    setDiscountPerc(0)
    if(!address){
      Alert.alert('Vui lòng chọn đia chỉ giao hàng!')
      return;
    }
    navigation.navigate("Payment",{cartItems: listItemsCart,totalAmount:totalPrice,totalItems:totalQuantity,deliveryAddress:address,coupon});
  };
  const handleCoupon =async()=>{
    try {
      const res=await paymentService.validateCoupon(coupon,accessToken)
      if(res.data.isValid){
        const percentage=res.data.discountPercentage
        setDiscountPerc(percentage)
        //setTotalAmount((amount)=>amount-amount*percentage/100)
        Alert.alert('Mã khuyến mãi hop lệ!')
        console.log(totalPrice)
      }
      console.log('res',res.data);
    } catch (error) {
      console.log('Loi khi validate coupon:', error);
    }
  }
  const handleCancelCoupon =()=>{
    setCoupon(''),
    setDiscountPerc(0),
    //setTotalAmount(totalPrice),
    
    Alert.alert('Da huy ma khuyen mai!')
  }

  const handleOpenChangeLocation = () => {
    bottomSheetRef.current?.expand();
  };
  const handleChangeLocation = (item:any) => {
    setAddress(item.address)
    //thay doi o trong store nua
    bottomSheetRef.current?.close();
  };
  const fetchAddress = async() => {
    console.log('mang gia tri dia chi:',user.address);
    // const res = await getAddresses();
    setListAddress(user.address);
    const a=await AsyncStorage.getItem('authUser')
    console.log('kho',a)
  }
  //console.log('kho',AsyncStorage.getItem('a'))
  useEffect(() => {
    fetchAddress();
  },[user.address]);

  // useEffect(() => {
  //   // Lắng nghe sự kiện focus của màn hình
  //   const unsubscribe = navigation.addListener('focus', () => {
      // fetchAddress(); // Gọi lại hàm để cập nhật danh sách
  //   });

  //   // Cleanup sự kiện khi component unmount
  //   return unsubscribe;
   //}, [navigation]);
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 10,
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <HeaderBar color="black" title="My Cart"></HeaderBar>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text>Delivery location</Text>
          <Text style={{ fontWeight: 500 }}>{address}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={handleOpenChangeLocation}
            style={{ borderWidth: 1, borderRadius: 10, padding: 5 }}
          >
            <Text>Changle location</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "row",justifyContent:'space-between',borderRadius:15,borderWidth:1,padding:5,borderColor:appColor.border}}>
        <View>
          <TextInput value={coupon} onChangeText={setCoupon} placeholder="Enter your coupon"></TextInput>
        </View>
        <View style={{flexDirection:'row',gap:10}}> 
          <TouchableOpacity
            onPress={handleCoupon}
            style={{  borderRadius: 15,padding:5,justifyContent:'center',backgroundColor:appColor.primary_dark}}
          >
            <Text style={{color:'white'}}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCancelCoupon}
            style={{  borderRadius: 15,padding:5,justifyContent:'center',backgroundColor:'red', }}
          >
            <Text style={{color:'white'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SpaceComponent height={20}></SpaceComponent>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList style={{}}
          ListEmptyComponent={
            
           <View style={{alignItems:'center',justifyContent:'center',}}>
            <SpaceComponent height={50}></SpaceComponent>
            <BigCart></BigCart>
            <SpaceComponent height={20}></SpaceComponent>
            <Text style={{fontSize:20,fontWeight:600}}>Your cart is empty</Text>
           </View>
          }
          showsVerticalScrollIndicator
          //keyExtractor={(item) => item.id.toString()}
          data={cartItems}
          renderItem={({ item }) => (
            <ItemProduct key={item.id} item={item}></ItemProduct>
          )}
        ></FlatList>
      </View>
      {/* <Button title='clear' onPress={()=>clearCart()}></Button> */}

      <View style={{ position: "relative", bottom: 0, right: 0, left: 0,marginBottom:10 }}>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Subtotal</Text>
            <Text>${totalPrice.toFixed(2)}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Discount (%)</Text>
            {/* <Text>allQuantity{totalQuantity}</Text> */}
            <Text>{discountPerc}%</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderTopWidth: 1,
            }}
          >
            <Text>Total</Text>
            <Text>$
              {
              discountPerc?(totalPrice-totalPrice*discountPerc/100).toFixed(2):totalPrice.toFixed(2)
             //totalPrice.toFixed(2)
              }
              </Text> 
          </View>
          <ButtonComponent disabled={!(cartItems.length>0)}
            onPress={handleOder}
            title="Oder Now"
          ></ButtonComponent>
        </View>
      </View>
      <BottomSheet
        style={{ }}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <BottomSheetView style={{ flex: 1 }}>
          <View style={{ }}>
            <Text style={{fontWeight:600}}>Choose your delivery address</Text>
            <Text style={{fontWeight:300}}>Select a location you want to deliver</Text>
            <FlatList
            style={{margin:20}}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              ListFooterComponent={<TouchableOpacity onPress={()=>navigation.navigate('AddAddress')} style={{height: 100,
                width: 100,justifyContent:'center',borderWidth:1,alignItems:'center'}}><Text style={{color:'blue'}}>Add new address</Text></TouchableOpacity>}
              data={listAddress} // Thay thế 'item' bằng một mảng thực tế
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    minWidth:100,
                    minHeight:100,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:(deliveryAddress==item.address)?appColor.primary_dark:'white',
                    
                    borderWidth:1,
                    marginRight:10,
                    padding:5,
                  }}
                  onPress={()=>handleChangeLocation(item)}
                >
                  <Text>Name: {item.name}</Text>
                  <Text>Address: {`${item.address}, ${item.city} `}
                  <MaterialCommunityIcons name="home"></MaterialCommunityIcons></Text>
                </TouchableOpacity>
              )}

            />
          </View>
          <View style={{borderTopWidth:1}}>
            
          </View>
        </BottomSheetView>
      </BottomSheet>

    </View>
  );
};

export default CartScreen;


