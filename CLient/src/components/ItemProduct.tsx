 import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
 import React from 'react'
 import { Minus, Plus, Trash } from '../assets/svg'
 import { appColor } from '../constants/appColor'
 //import { Swipeable } from 'react-native-gesture-handler';
 import Swipeable from 'react-native-gesture-handler/Swipeable';
type Props = {
    counter?:boolean,
    onPress?:()=>void
}

 const ItemProduct = ({counter,onPress}: Props) => {
    const deleteAction=()=>{
        return(
            <TouchableOpacity onPress={onPress} style={{backgroundColor:'red',justifyContent:"center",alignItems:'center',width:50}}>
                <Trash height={23}></Trash>
            </TouchableOpacity>
            
        )
    }
  return (
     <Swipeable renderRightActions={deleteAction}
     >

     <View style={{flexDirection:'row',backgroundColor:appColor.primary_light,alignItems:'center',justifyContent:'space-between',padding:10}}>
         <View style={{flexDirection:'row'}}>

       <View style={{backgroundColor:appColor.border,borderRadius:100,width:50,height:50}}>
         <Image source={require('../assets/images/products/lemon.png')} style={{width:'100%',height:'100%',marginTop:5}}></Image>
       </View>
       <View>
         <Text style={{color:appColor.primary_dark}}>$2.00</Text>
         <Text style={{fontSize:16,fontWeight:500}}>Fresh daimon li</Text>
         <Text >1kg</Text>
       </View>

         </View>
         {
             !counter?<View style={{alignItems:'center'}}>
             <Plus height={16} width={16}></Plus>
             <Text style={{fontSize:20}}>3</Text>
             <Minus height={16} width={16}></Minus>
           </View>:<></>
         }
      
     </View>
         </Swipeable>
   )
}

 export default ItemProduct

 const styles = StyleSheet.create({})