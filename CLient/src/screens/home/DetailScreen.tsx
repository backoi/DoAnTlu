import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { ButtonComponent, HeaderBar, Quantity, SpaceComponent } from '../../components';
import { Cart, Heart, Minus, Plus } from '../../assets/svg';
import { appColor } from '../../constants/appColor';
import { Rating } from 'react-native-ratings';
import { productService } from '../../utils/productService';
import useCartStore from '../../store/cartStore';

interface Props {
  onPress?:(id:any)=>void
}
interface ItemCart{
  id:number,name:string,price:number,stock:number,urlImg:string,quantity:number,unit:string
}
//xu ly add cart
const DetailScreen = ({route,navigation}:any) => {
  const [product,setProduct]= useState<any>()
  const [quantity,setQuantity]= useState(1)
  const [reviews,setReviews]= useState<any>()
  
  const {addItem,items,decreaseQuantity,increaseQuantity,totalPrice,clearCart}=useCartStore()
  
  const getProduct=async (id:any)=>{
    const res= await productService.getProductWithID(id);
    console.log('chi tiết:', res?.data)
    setProduct(res?.data.product)
    setReviews(res?.data.reviews)
  }
  useEffect(()=>{
    getProduct(route?.params.id)
  },[])
  const handleAddToCart=()=> {
    const item:ItemCart={id: product._id, name: product.name, price: product.price, stock: product.stock, urlImg: product.imgUrl,
      quantity: 1,unit:product.unit}
    addItem(item,quantity)
    console.log('đã thêm ',quantity)
  }

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
          <View style={{flexDirection:'row',backgroundColor:appColor.background,height:40,alignItems:'center',justifyContent:'space-between'}}>
        <Text style={{color:appColor.text,marginLeft:10}}>Quantity</Text>
        <View style={{flexDirection:'row',height:'100%'}}>
          <View style={{borderRightWidth:0.5,justifyContent:'center',borderRightColor:appColor.text}}>

            <TouchableOpacity onPress={()=>setQuantity(quantity>1?quantity-1:1)} >
              <Minus height={25} width={25} style={{marginRight:5}}/>
            </TouchableOpacity>
          </View>
            

            <Text style={{fontSize:25,marginHorizontal:15}}>{quantity}</Text>
            <View style={{borderLeftWidth:0.5,borderLeftColor:appColor.text,justifyContent:'center'}}>

            <TouchableOpacity onPress={()=>setQuantity(quantity+1)} >
              <Plus height={25} width={35}/>
              </TouchableOpacity>
            </View>
        </View>
      </View>
          <SpaceComponent height={10}/>
        <ButtonComponent onPress={handleAddToCart} title='Add to cart' icon={<Cart width={23} height={23} style={{}} />}/>
        <SpaceComponent height={30}/>
        </View>
      </View>

    </View>
  )
}

export default DetailScreen
