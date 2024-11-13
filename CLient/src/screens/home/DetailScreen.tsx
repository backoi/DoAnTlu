import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { ButtonComponent, HeaderBar, Quantity, SpaceComponent } from '../../components';
import { Cart, Heart } from '../../assets/svg';
import { appColor } from '../../constants/appColor';
import { Rating } from 'react-native-ratings';

interface Props {
  item: {
    id:number;
    name:string;
    //svg: React.FC<any>;
    price:string;
    unit:string;
    backColor:string;
    origin:string;
    des:string;
  };
  onPress?:(id:any)=>void
}

const DetailScreen = ({route,navigation}:any) => {
  
  const {item} = route?.params
  
  
  return (
    <View style={{flex:1,backgroundColor:item?.backColor,paddingHorizontal:10}}>
      <HeaderBar title=''/>
      
      <View style={{flex:1,backgroundColor:item?.backColor}}>
            <Image source={item?.img} style={{width:'100%',height:'100%'}}></Image>
      </View>
      <View style={{}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',}}>
          <Text style={{fontSize:18,fontWeight:'800',color:appColor.primary_dark}}>${item?.price}</Text>
          <Heart height={23} width={23}/>
        </View>
        <View>
          <Text style={{fontSize:23,fontWeight:'500',color:'black'}}>{item?.name}</Text>
          <Text style={{color:appColor.text}}>{item?.unit}</Text>

          <View style={{flexDirection:'row'}}>
            <Text>4.5</Text>
          <Rating style={{alignItems:'flex-start'}} fractions={1} jumpValue={0.5} imageSize={20} type='star' ratingCount={5} tintColor={item?.backColor} readonly
          />
          <Text style={{color:appColor.text}}>(80 reviews)</Text>
          </View>

          
          <Text style={{fontSize:16,color:appColor.text}}>{item?.des}</Text>
          <Text></Text>
          <Quantity/>
          <SpaceComponent height={10}/>
        <ButtonComponent title='Add to cart' icon={<Cart width={23} height={23} style={{}} />}/>
        <SpaceComponent height={30}/>
        </View>
      </View>

    </View>
  )
}

export default DetailScreen
{/* <View>
        <item.svg width={23} height={23} />  
      </View>
       */}