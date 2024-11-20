import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { ButtonComponent, HeaderBar, Quantity, SpaceComponent } from '../../components';
import { Cart, Heart } from '../../assets/svg';
import { appColor } from '../../constants/appColor';
import { Rating } from 'react-native-ratings';
import { productService } from '../../utils/productService';

interface Props {
  onPress?:(id:any)=>void
}

const DetailScreen = ({route,navigation}:any) => {
  const [product,setProduct]= useState<any>()
  const [reviews,setReviews]= useState<any>()
  
  
  const getProduct=async (id:any)=>{
    const res= await productService.getProductWithID(id);
    console.log('first', res?.data)
    setProduct(res?.data.product)
    setReviews(res?.data.reviews)
  }
  useEffect(()=>{
    getProduct(route?.params.id)
  },[])
  return (
    <View style={{flex:1,backgroundColor:product?.backColor,paddingHorizontal:10}}>
      <HeaderBar color='black' title=''/>
      
      <View style={{flex:1,backgroundColor:product?.backColor}}>
            <Image source={{uri:product?.imgUrl}} style={{width:'100%',height:'100%'}}></Image>
      </View>
      <View style={{}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',}}>
          <Text style={{fontSize:18,fontWeight:'800',color:appColor.primary_dark}}>${product?.price}</Text>
          <Heart height={23} width={23}/>
        </View>
        <View>
          <Text style={{fontSize:23,fontWeight:'500',color:'black'}}>{product?.name}</Text>
          <Text style={{color:appColor.text}}>{product?.unit}</Text>

          <TouchableOpacity onPress={()=>{navigation.navigate('Review')}} style={{flexDirection:'row'}}>
            <Text>4.5</Text>
            

          <Rating style={{alignItems:'flex-start'}} fractions={1} jumpValue={0.5} imageSize={20} type='star' ratingCount={5} tintColor={product?.backColor} readonly
          />
          <Text style={{color:appColor.text}}>(80 reviews)</Text>
          
          </TouchableOpacity>

          
          <Text style={{fontSize:16,color:appColor.text}}>{product?.description}</Text>
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
