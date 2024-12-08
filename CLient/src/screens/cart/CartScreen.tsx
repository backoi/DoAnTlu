import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
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
import { getAddresses } from "../../utils/addressStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BigCart, Cart } from "../../assets/svg";
import { appColor } from "../../constants/appColor";

const CartScreen = () => {
  const { logout,user,deliveryAddress } = useAuthStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const snapPoints = useMemo(() => ['25%', '40%',], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [address,setAddress]=useState<any>(deliveryAddress)
  const [listAddress,setListAddress]=useState<any>([])
  
  const {
    cartItems,
    totalQuantity,
    decreaseQuantity,
    increaseQuantity,
    totalPrice,
    clearCart,
  } = useCartStore();
  const listItemsCart=cartItems.map((item)=>({product:item.id,quantityPurchased:item.quantity,amountPrice:(item.price*item.quantity)}))
  const handleOder = () => {
    
    if(!address){
      Alert.alert('Vui lòng chọn đia chỉ giao hàng!')
      return;
    }
    navigation.navigate("Payment",{cartItems: listItemsCart,totalAmount:totalPrice,totalItems:totalQuantity,deliveryAddress:address});
  };
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
            <Text>{totalPrice.toFixed(2)}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Delivery fee</Text>
            {/* <Text>allQuantity{totalQuantity}</Text> */}
            <Text>0</Text>
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
            <Text>${totalPrice.toFixed(2)}</Text> 
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


