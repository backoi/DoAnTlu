import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../assets/types/NavigationType'

interface Props{
    item:{
      _id: number,
      name: string,
      img:string,
      //svg: React.FC<any>,
      backColor?:string,
    },
    onPress?:()=>void

}
const CategoryItemComponent = ({item,onPress}:Props) => {
  const navigation= useNavigation<NavigationProp<RootStackParamList>>()

  const handle=(id:any)=>{
    navigation.navigate("Search",{category:id})
  }  
  return (
    <TouchableOpacity onPress={()=>handle(item._id)} style={{alignItems:'center',marginHorizontal:10}}>
     <View style={{height:50,width:50,borderRadius:100,
       backgroundColor:item.backColor,
      justifyContent:'center',alignItems:'center'}}>
     {/* <item.svg width={30} height={30} /> */}
     <Image source={{uri:item.img}} style={{width:30,height:30,}} resizeMode='contain'></Image>
     </View>
       <Text>{item.name} </Text>
    </TouchableOpacity>
  )
}

export default CategoryItemComponent