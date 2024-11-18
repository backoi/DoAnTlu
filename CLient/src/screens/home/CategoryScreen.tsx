import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CategoryItem, HeaderBar } from '../../components'
import { categoryService } from '../../utils/categoryService';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/NavigationType';

const CategoryScreen = () => {
  const navigation= useNavigation<NavigationProp<RootStackParamList>>()
  const [category,setCategory]= useState<any>([])
  const getAllCateGory= async()=>{
    const res=await categoryService.getAll()
    //console.log('ben cate',res?.data)
    setCategory(res?.data)
  }
  const handleCategory=(id:any)=>{
    navigation.navigate("Search",{category:id})
    console.log('ten cua cate',id)
  }
  useEffect(()=>{
    getAllCateGory()
  },[])
  return (
    <View >
      <HeaderBar color='black' title='Category'></HeaderBar>
      <View style={{alignItems:'center',marginTop:10}}>
      <FlatList
            //horizontal
            contentContainerStyle={{}}
            columnWrapperStyle={{margin:10}}
            showsHorizontalScrollIndicator={false}
            numColumns={4}
            keyExtractor={(item) => item?._id}
            data={category}
            renderItem={({ item }) => <CategoryItem onPress={()=>handleCategory(item._id)} item={item} />}
          />
      </View>
    </View>
  )
}

export default CategoryScreen