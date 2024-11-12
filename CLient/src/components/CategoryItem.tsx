import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props{
    item:{
      id: number,
      name: string,
      svg: React.FC<any>,
      backColor:string,
    },

}
const CategoryItemComponent = ({item}:Props) => {
    
  return (
    <TouchableOpacity style={{alignItems:'center',marginHorizontal:10}}>
     <View style={{height:50,width:50,borderRadius:100,backgroundColor:item.backColor,justifyContent:'center',alignItems:'center'}}>
     <item.svg width={30} height={30} />
     </View>
       <Text>{item.name} </Text>
    </TouchableOpacity>
  )
}

export default CategoryItemComponent