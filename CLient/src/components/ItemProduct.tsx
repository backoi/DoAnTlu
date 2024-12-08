 import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
 import React from 'react'
 import { Minus, Plus, Trash } from '../assets/svg'
 import { appColor } from '../constants/appColor'
 import Swipeable from 'react-native-gesture-handler/Swipeable';
import useCartStore from '../store/cartStore';
type Props = {
  item:{
    id:number,
    name:string,
    price:number,
    urlImg:string,
    quantity:number,
    unit:string,
  }
    counter?:boolean,
    onPress?:()=>void
}

 const ItemProduct = ({counter,onPress,item}: Props) => {
  console.log('link anh',item.urlImg)
  const {cartItems,decreaseQuantity,increaseQuantity,totalPrice,removeItem}=useCartStore()

    const deleteAction=()=>{
        return(
            <TouchableOpacity onPress={()=>removeItem(item.id)} style={{backgroundColor:'red',justifyContent:"center",alignItems:'center',width:50}}>
                <Trash height={23}></Trash>
            </TouchableOpacity>
            
        )
    }
  return (
     <Swipeable renderRightActions={deleteAction}
     >

     <View style={{flexDirection:'row',backgroundColor:appColor.primary_light,alignItems:'center',justifyContent:'space-between',padding:10}}>
         <View style={{flexDirection:'row'}}>

       <View style={{backgroundColor:appColor.border,borderRadius:100,width:50,height:50,marginRight:10}}>
         <Image source={{uri:item.urlImg}} style={{width:'100%',height:'100%',marginTop:5}}></Image>
       </View>
       <View>
         <Text style={{color:appColor.primary_dark}}>${item.price}x{item.quantity}</Text>
         <Text style={{fontSize:16,fontWeight:500}}>{item.name}</Text>
         <Text >{item.unit}</Text>
       </View>

         </View>
         
         {
             !counter?<View style={{alignItems:'center'}}>
              <TouchableOpacity onPress={()=>increaseQuantity(item.id)}>

             <Plus height={16} width={16}></Plus>
              </TouchableOpacity>
             <Text style={{fontSize:20}}>{item.quantity}</Text>
             <TouchableOpacity onPress={()=>decreaseQuantity(item.id)}>

             <Minus height={16} width={16}></Minus>
             </TouchableOpacity>
           </View>:<></>
         }
      
     </View>
         </Swipeable>
   )
}

 export default ItemProduct

 const styles = StyleSheet.create({})