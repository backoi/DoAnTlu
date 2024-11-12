import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Cart, Heart } from "../assets/svg";
import { appColor } from "../constants/appColor";

interface Props {
  item: {
    id: number;
    name: string;
    //svg: React.FC<any>;
    img:any;
    price: string;
    backColor: string;
    origin: string;
  };
  onPress?:(id:any)=>void
}
const CardProductComponent = ({ item ,onPress}: Props) => {
  return (
    
    <TouchableOpacity onPress={onPress}
      style={{alignItems: "center",marginHorizontal: 10,
        backgroundColor: "white",height: 260,
        width: 170,rowGap:5
      }}
    >
<TouchableOpacity style={{alignSelf:'flex-end',marginTop:10,marginRight:10}}>
      <Heart height={20} width={20} />
      </TouchableOpacity> 
      <View style={{height: 90,width: 90,
          borderRadius: 100,backgroundColor: item.backColor,
          justifyContent: "center",alignItems: "center",marginBottom:15
        }}
      >
        
      <View style={{top:15}}>
         {/* <item.svg width={100} height={100} />  */}
         <Image source={item.img} style={{height:50,width:50}}></Image>
        </View>
      </View>
      <Text style={{color:appColor.primary_dark,fontWeight:'500'}}>${item.price}</Text>
      <Text style={{fontSize:18,fontWeight:'500'}}>{item.name} </Text>
      
      <Text style={{color:appColor.text}}>{item.origin}</Text>
      <View
        style={{flex:1,flexDirection: "row",width: "100%",
          borderTopWidth:1,borderColor:appColor.border,backgroundColor: "white",justifyContent:'center',alignItems:'center'
        }}
      >
        <Cart height={20} width={20} />
        <Text style={{marginHorizontal:5}}>Add to cart</Text>
      </View>
    </TouchableOpacity>
  
  );
};
//contentcontainerclassname gap-2
//collunmwraper
export default CardProductComponent;
