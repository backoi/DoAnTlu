import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { ButtonComponent, HeaderBar, Quantity, SpaceComponent } from '../../components';
import { Cart, Heart, HeartFill, Minus, Plus } from '../../assets/svg';
import { appColor } from '../../constants/appColor';
import { Rating } from 'react-native-ratings';
import { productService } from '../../utils/productService';
import useCartStore from '../../store/cartStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/NavigationType';
import useUserStore from '../../store/userStore';

interface Props {
  onPress?:(id:any)=>void
}
interface ItemCart{
  id:number,name:string,price:number,stock:number,urlImg:string,quantity:number,unit:string
}
interface FavItem{
  id:number,
  name:string,
  urlImg:string,
  price:number,
}
//xu ly add cart
const DetailScreen = ({route}:any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { favItems, toggleFavItem } = useUserStore();
  const [isLike, setIsLike] = useState(false);
  const [product,setProduct]= useState<any>()
  const [quantity,setQuantity]= useState(1)
  //const [reviews,setReviews]= useState<any>()
  
  const {addItem,cartItems,decreaseQuantity,increaseQuantity,totalPrice,clearCart}=useCartStore()
  const loadQuantityInCart=()=>{
    const item=cartItems.find((item)=>item.id===product?._id)
    if(item){
      console.log('item la:',item)
      //setProduct(item)
      setQuantity(item.quantity)
  }
}
  const getProduct=async (id:any)=>{
    const res= await productService.getProductWithID(id);
    console.log('chi tiết:', res?.data)
    setProduct(res?.data.product)
    //setReviews(res?.data.reviews)
  }
  const handleFavorite = () => {
    const favItem:FavItem={id:product._id,name:product.name,urlImg:product.imgUrl,price:product.price}
    toggleFavItem(favItem);
  };
   useEffect(() => {
      const exists = favItems.some((favItem) => favItem.id === route?.params.id);
      setIsLike(exists);
    }, [favItems, route?.params.id]);
  
  useEffect(()=>{
    getProduct(route?.params.id)
   
  },[])
  useEffect(()=>{
    loadQuantityInCart()
  },[cartItems])
  const handleAddToCart=()=> {
    const item:ItemCart={id: product._id, name: product.name, price: product.price, stock: product.stock, urlImg: product.imgUrl,
      quantity: 1,unit:product.unit}
    addItem(item,quantity)
    console.log('đã thêm ',quantity)
  }

  //console.log('review',reviews)
  return (
    <View style={{flex:1,backgroundColor:product?.backColor,paddingHorizontal:10}}>
      <HeaderBar back color='black' title='Detail Product'/>
      
      <View style={{flex:1,backgroundColor:product?.backColor}}>
            <Image source={{uri:product?.imgUrl}} style={{width:'100%',height:'100%'}}></Image>
      </View>
      <View style={{}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',}}>
          <Text style={{fontSize:18,fontWeight:'800',color:appColor.primary_dark}}>${product?.price}</Text>
          <TouchableOpacity onPress={handleFavorite}>

          {isLike ? (
            <HeartFill height={20}></HeartFill>
          ) : (
            <Heart height={20} width={20} />
          )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{fontSize:23,fontWeight:'500',color:'black'}}>{product?.name}</Text>
          <Text style={{color:appColor.text}}>{product?.unit}</Text>

          <TouchableOpacity onPress={()=>{navigation.navigate('Review',{productId:route?.params.id})}} style={{flexDirection:'row'}}>
            <Text>{Math.round(product?.averageRating)}</Text>
            
          <Rating style={{alignItems:'flex-start'}} fractions={1} startingValue={product?.averageRating} imageSize={20} type='star' ratingCount={5} tintColor={product?.backColor} readonly
          />
          <Text style={{color:appColor.text}}>({product?.reviewsCount} reviews)</Text>
          
          </TouchableOpacity>

          
          <Text style={{fontSize:16,color:appColor.text}}>{product?.description}</Text>
          <Text></Text>
          <View style={{flexDirection:'row',backgroundColor:appColor.background,height:40,alignItems:'center',justifyContent:'space-between'}}>
        <Text style={{color:appColor.text,marginLeft:10}}>Quantity</Text>
        <View style={{flexDirection:'row',height:'100%'}}>
          <View style={{borderRightWidth:0.5,justifyContent:'center',borderRightColor:appColor.text}}>

            <TouchableOpacity onPress={()=>decreaseQuantity(product?._id)} >
              <Minus height={25} width={25} style={{marginRight:5}}/>
            </TouchableOpacity>
          </View>
            

            <Text style={{fontSize:25,marginHorizontal:15}}>{quantity}</Text>
            <View style={{borderLeftWidth:0.5,borderLeftColor:appColor.text,justifyContent:'center'}}>

            <TouchableOpacity onPress={()=>increaseQuantity(product?._id)} >
              <Plus height={25} width={35}/>
              </TouchableOpacity>
            </View>
        </View>
      </View>
          <SpaceComponent height={10}/>
        <ButtonComponent disabled={product?.stock==0} onPress={handleAddToCart} title='Add to cart' icon={<Cart width={23} height={23} style={{}} />}/>
        <SpaceComponent height={30}/>
        </View>
      </View>

    </View>
  )
}

export default DetailScreen
