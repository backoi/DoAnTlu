import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Cart, Heart, HeartFill } from "../assets/svg";
import { appColor } from "../constants/appColor";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../assets/types/NavigationType";

interface Props {
  item: {
    _id: number;
    name: string;
    imgUrl: string;
    price: string;
    backColor: string;
    origin: string;
  };
  onPress?: (id: any) => void;
}
const CardProductComponent = ({ item, onPress }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isLike, setIsLike] = useState(false);
  return (
    <View
      style={{
       // alignItems: "center",
        margin:10,
        backgroundColor: "white",
        height: 240,
        width: 170,
        
      }}
    >
      <TouchableOpacity style={{}} onPress={()=>navigation.navigate("Detail",{id:item._id})}>

      <TouchableOpacity
        onPress={() => setIsLike(!isLike)}
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
          alignSelf:'center',
          marginBottom: 15,
        }}
        >
        <View style={{ top: 15 }}>
          <Image
            resizeMode="contain"
            source={{ uri: item?.imgUrl }}
            style={{ height:100,aspectRatio:1 }}
            ></Image>
        </View>
      </View>
      <Text style={{ color: appColor.primary_dark, fontWeight: "500",alignSelf:'center', }}>
        ${item.price}
      </Text>
          
      <Text style={{ fontSize: 18, fontWeight: "500", alignSelf:'center',}}>{item.name} </Text>

      <Text style={{ color: appColor.text }}>{item.origin}</Text>

      </TouchableOpacity>

      <TouchableOpacity 
        style={{
          paddingVertical:10,
          flexDirection: "row",
          width: "100%",
          borderTopWidth: 1,
          borderColor: appColor.border,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Cart height={20} width={20} />
        <Text style={{ marginHorizontal: 5 }}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};
//contentcontainerclassname gap-2
//collunmwraper
export default CardProductComponent;
