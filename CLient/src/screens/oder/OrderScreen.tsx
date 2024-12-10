import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderBar, ItemProduct } from "../../components";
import { orderService } from "../../utils/orderService";
import useAuthStore from "../../store/authStore";
import { Box } from "../../assets/svg";
import { appColor } from "../../constants/appColor";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/NavigationType";
import useCartStore from "../../store/cartStore";

const OderScreen = () => {
  //làm đẹp, search,tính phí,socket
  const { accessToken } = useAuthStore();
  const {addItem}=useCartStore();
  //const [listOrder,setListOrder] = useState<any>()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [activeOrder, setActiveOrder] = useState("On going");
  const cancelOrder = async (id: any) => {
    const res = await orderService.cancelOrder(id, accessToken);
    //console.log('da huy don hang',res)
    fetchOrders();
  };
  const complatedOrder = async (id: any) => {
    console.log('click')
    const res = await orderService.updateStatus(id, accessToken);
    //console.log('da huy don hang',res)
    fetchOrders();
  };
  const handleReOrder =  (item: any) => {
    console.log('-------',item.items)
    item.items.map((item: any) =>{ 
      const product = {
        id: item.product._id,
        name: item.product.name,
        urlImg: item.product.imgUrl,
        price: item.product.price,
        stock: item.product.stock,
        quantity: 1,
        unit: item.product.unit,
      };
      console.log('so luong',item.quantityPurchased)
      addItem(product,item.quantityPurchased); // Thêm vào gi�� hàng
      console.log('đã ađd')
    }
    )
  }
  const fetchOrders = async () => {
    const res = await orderService.getUserOrders(accessToken);
    //console.log('data',res);
    setOngoingOrders(res.data.ongoing);
    setOrderHistory(res.data.history);
  };

  //  useEffect(() => {
  //    // Lắng nghe sự kiện focus của màn hình
  //    const unsubscribe = navigation.addListener('focus', () => {
  //      fetchOrders(); // Gọi lại hàm để cập nhật danh sách
  //    });

  //    // Cleanup sự kiện khi component unmount
  //    return unsubscribe;
  //  }, []); //[navigation] //neu cai nay thi goi nhieu qua
  //neu tao store thi thua` k can thiet
  useEffect(() => {
    fetchOrders();
  }, [activeOrder]); //neu chon cai nay thi khi them orders no ko cap nhat
  return (
    <View style={{ marginHorizontal: 10 }}>
      <HeaderBar color="black" title="Orders"></HeaderBar>
      {/* <TouchableOpacity onPress={fetchOrders}>
        <Text>get</Text>
      </TouchableOpacity> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setActiveOrder("On going")}
          style={{
            borderBottomColor: activeOrder == "On going" ? "green" : "white",
            borderBottomWidth: 2,
          }}
        >
          <Text>On going</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveOrder("History")}
          style={{
            borderBottomColor: activeOrder == "History" ? "green" : "white",
            borderBottomWidth: 2,
          }}
        >
          <Text>History</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={activeOrder == "History" ? orderHistory : ongoingOrders}
        renderItem={({ item, index }: any) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("DetailOrder", { item: ongoingOrders[index] })//doan nay chua xem chi tiet o lich su
            }
            style={{
              marginBottom: 10,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 10,
              gap: 10,
            }}
          >
            <View style={{}}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <View
                  style={{
                    justifyContent: "center",
                    backgroundColor: appColor.primary_light,
                    borderRadius: 50,
                    padding: 5,
                  }}
                >
                  <Box width={70}></Box>
                </View>
                <View>
                <View style={{flexDirection:'row'}}>

                  <Text>Status: </Text> 
                  <View style={{backgroundColor:item.status=='Canceled'?'red':item.status=='Completed'?'green':'white',borderRadius:5}}> 
                    <Text> {item.status} </Text>
                  </View>
                </View>
                

                  <Text>Order#{item._id}</Text>
                  <Text>Date: 26/12/2024</Text>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <Text>Items: {item.totalItems}</Text>
                    <Text>Price: {(item.totalAmount).toFixed(2)}$</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              {activeOrder == "History" ? (
                <>
                  
                  <TouchableOpacity
                    onPress={() => handleReOrder(item)}// duyệt r add tung cai vao cart
                    style={{
                      borderRadius: 10,
                      padding: 5,
                      minWidth: 90,
                      alignItems: "center",
                      borderColor: appColor.primary_dark,
                      borderWidth: 1,
                    }}
                  >
                    <Text>Re-Order</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity onPress={()=>complatedOrder(item._id)}
                    style={{
                      borderRadius: 10,
                      padding: 5,
                      minWidth: 90,
                      alignItems: "center",
                      backgroundColor: appColor.primary_dark,
                    }}
                  >
                    <Text>Comfirm order</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => cancelOrder(item._id)}
                    style={{
                      borderRadius: 10,
                      padding: 5,
                      minWidth: 90,
                      alignItems: "center",
                      borderColor: appColor.primary_dark,
                      borderWidth: 1,
                    }}
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
};

export default OderScreen;
