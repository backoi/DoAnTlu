import React from 'react'
import { FlatList } from 'react-native'
import CardProduct from './CardProduct'

interface Props{
    data:any,
    onPress?: ()=>{}
}
const ListProduct = ({data,onPress}:Props) => {
  return (
    <FlatList scrollEnabled={false} numColumns={2} keyExtractor={item=>item.id} data={data} renderItem={({item})=><CardProduct onPress={onPress} item={item}/>}></FlatList>

  )
}

export default ListProduct