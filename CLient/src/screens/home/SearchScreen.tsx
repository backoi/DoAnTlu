import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CardProduct, InputComponent } from '../../components'
import { Back, Heart, Search } from '../../assets/svg'
import { productService } from '../../utils/productService'
import { useNavigation } from '@react-navigation/native'

type Props = {}


const SearchScreen = ({route}:any,props:Props) => {
  const navigation=useNavigation()
  const {text,category}=route?.params||''
  
  const [data,setData]=useState()
  const [searchText,setSearchText]=useState('')
  
  const getProducts=async(search:any,category:any)=>{
    //console.log('gia tri category',category)
    
    {
      const res=await productService.getProducts(search,category)
      //console.log('du lieu',res?.data)
      setData(res?.data)
      return res
    }
    
    
  }
  useEffect(()=>{
    const fetchProducts = async () => {
      
      if(text||category)
      {
        //console.log(category)
        setSearchText(text)
        getProducts(text,category) // Sử dụng giá trị từ route
      }
      
    }
    fetchProducts()
    //getProducts(searchText)
  },[])
  return (
    <View style={{backgroundColor:'#F4F5F9',flex:1,marginHorizontal:5}}>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
         <TouchableOpacity onPress={()=>navigation.goBack()} style={{margin:5}}><Back height={30}></Back></TouchableOpacity> 
        <InputComponent leftIC={<TouchableOpacity onPress={()=>getProducts(searchText,category)}><Search height={23}></Search></TouchableOpacity>} value={searchText} placeholder='Search a keyword' onChangeText={(text)=>setSearchText(text)} rightIC={<Heart height={23}></Heart>}></InputComponent>
        
      </View>
      <View>
        <FlatList numColumns={2} data={data} 
        renderItem={({item})=>(<CardProduct item={item}></CardProduct>)}
        ListEmptyComponent={<Text>khong tim thay</Text>}
        ></FlatList>
      </View>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  //F4F5F9
})