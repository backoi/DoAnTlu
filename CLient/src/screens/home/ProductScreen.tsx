import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { CardProduct, HeaderBar } from '../../components'

const products: any = [
    {
      id: 1,
      name: "Fresh Peach",
      price:'8.00',
      
      origin:'Cambodia',
      backColor: "#E6F2EA",
      img: require('../../assets/images/products/lemon.png'),
      des:"Organic Mountain works as a seller for many organic growers of organic lemons. Organic lemons are easy to spot in your produce aisle. They are just like regular lemons, but they will usually have a few more scars on the outside of the lemon skin. Organic lemons are considered to be the world's finest lemon for juicing"
    },
    {
      id: 2,
      name: "Avacoda",
      price:'8.00',
      origin:'Cambodia',
      
      backColor: "#FFE9E5",
    },
    {
      id: 3,
      name: "Beverages",
      
      price:'8.00',
      origin:'Cambodia',
      backColor: "#FFF6E3",
    },
    {
      id: 4,
      name: "Pomegranate",
      price:'8.00',
      
      origin:'Cambodia',
      backColor: "#FFE8F2",
    },
    {
      id: 5,
      name: "Fresh B roccoli",
      price:'8.00',
      
      origin:'Cambodia',
      backColor: "#ECE2FF",
    },
    {
      id: 6,
      name: "Black Grapes",
      price:'8.00',
      
      origin:'Cambodia',
      backColor: "#ECE2FF",

    },
  ];
  const handleDetail:(item:any)=>void=(item)=> {
    //navigation.navigate('Detail',{item:{id:item.id,ten:item.name,img:item.img}})
  }
const ProductScreen = () => {
  return (
    <View>
      <HeaderBar title='Product'/>
      <View>
      <FlatList scrollEnabled={false} numColumns={2} 
      keyExtractor={item=>item.id} data={products} 
      renderItem={({item})=><CardProduct onPress={()=>handleDetail(item)} item={item}/>}/>

      </View>
    </View>
  )
}

export default ProductScreen