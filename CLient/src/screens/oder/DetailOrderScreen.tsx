import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { HeaderBar } from "../../components";
import { appColor } from "../../constants/appColor";

type Props = {};

const DetailOrderScreen = ({ route }: any, props: Props) => {
  
  const { item } = route.params;
  console.log(item);
  return (
    <View style={{marginHorizontal:10}}>
      <HeaderBar color="black" title="Detail Order"></HeaderBar>
      <View>
        <Text style={{}}>Order ID: <Text style={{fontSize:17}}>{item._id}</Text></Text>
        <Text>Status: <Text style={{color:item.status=='OnGoing'?'green':'red',fontSize:17}}>{item.status}</Text></Text>
        <Text>Delivery Address: <Text style={{fontSize:17}}>{item.deliveryAddress}</Text></Text>
        <Text>Payment Method: <Text style={{fontSize:17}}>{item.paymentMethod}</Text></Text>
        <Text>Payment Status: <Text  style={{fontSize:17,color:item.paymentStatus=="Pending"?'red':'green'}}> {item.paymentStatus}</Text></Text>
        <Text>Date: <Text style={{fontSize:17}}>2022-01-01</Text></Text>
        <Text>Total Price:<Text style={{fontSize:17}}> {item.totalAmount}$</Text></Text>
      </View>
      <View>
        <Text>Items:</Text>
        <FlatList
          data={item.items}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: appColor.primary_light,
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                marginVertical:10
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: appColor.border,
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                    marginRight: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.product.imgUrl }}
                    style={{ width: "100%", height: "100%", marginTop: 5 }}
                  ></Image>
                </View>
                <View>
                  <Text style={{ color: appColor.primary_dark }}>
                    {item.product.price}$ x {item.quantityPurchased}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {item.product.name}
                  </Text>
                  <Text>{item.product.unit}</Text>
                </View>
              </View>
            </View>
          )}
        >
          {" "}
        </FlatList>
        
      </View>
    </View>
  );
};

export default DetailOrderScreen;

const styles = StyleSheet.create({});
