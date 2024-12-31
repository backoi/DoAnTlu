import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Cart, Heart, HeartFill } from "../assets/svg";
import { appColor } from "../constants/appColor";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../assets/types/NavigationType";
import useCartStore from "../store/cartStore";
import useUserStore from "../store/userStore";

interface Props {
  item: {
    _id: number;
    name: string;
    imgUrl: string;
    price: number;
    backColor: string;
    unit: string;
    stock: number;
  };
  onPress?: (id: any) => void;
}
interface FavItem{
  id:number,
  name:string,
  urlImg:string,
  price:number,
}
const CardProductComponent = ({ item, onPress }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { cartItems, decreaseQuantity, increaseQuantity, totalPrice, addItem } = useCartStore();
  const { favItems, toggleFavItem } = useUserStore();
  const [isLike, setIsLike] = useState(false);
  
  useEffect(() => {
    const exists = favItems.some((favItem) => favItem.id === item._id);
    setIsLike(exists);
  }, [favItems, item._id]);

  const handleFavorite = () => {
    const favItem:FavItem={id:item._id,name:item.name,urlImg:item.imgUrl,price:item.price}
    toggleFavItem(favItem);
  };

  return (
    <View
      style={{
        margin: 10,
        backgroundColor: "white",
        height: 240,
        width: 170,
      }}
    >
      <TouchableOpacity style={{}} onPress={() => navigation.navigate("Detail", { id: item._id })}>
        <TouchableOpacity
          onPress={handleFavorite}
          style={{ alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
        >
          {isLike ? (
            <HeartFill height={20}></HeartFill>
          ) : (
            <Heart height={20} width={20} />
          )}
        </TouchableOpacity>
        <View
          style={{
            height: 90,
            width: 90,
            borderRadius: 100,
            backgroundColor: item.backColor,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: 'center',
            marginBottom: 15,
          }}
        >
          <View style={{ top: 15 }}>
            <Image
              resizeMode="contain"
              source={{ uri: item?.imgUrl }}
              style={{ height: 100, aspectRatio: 1 }}
            ></Image>
          </View>
        </View>
        <Text style={{ color: appColor.primary_dark, fontWeight: "500", alignSelf: 'center', }}>
          ${item.price}
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "500", alignSelf: 'center', }}>{item.name} </Text>

        <Text style={{ color: appColor.text, alignSelf: 'center' }}>{item.unit}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          paddingVertical: 10,
          flexDirection: "row",
          width: "100%",
          borderTopWidth: 1,
          borderColor: appColor.border,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => addItem({
          id: item._id, name: item.name, price: item.price, stock: item.stock, urlImg: item.imgUrl,
          quantity: 1, unit: item.unit
        }, 1)}
      >
        <Cart height={20} width={20} />
        <Text style={{ marginHorizontal: 5 }}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardProductComponent;
