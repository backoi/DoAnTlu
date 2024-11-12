import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { CategoryItem, HeaderBar } from '../../components'
import {
    Vegetables,
    Fruits,
    Beverages,
    Household,
    Grocery,
  } from "../../assets/svg";
const categories: any = [
    {
      id: 1,
      name: "Vegetables",
      svg: Vegetables,
      backColor: "#E6F2EA",
    },
    {
      id: 2,
      name: "Fruits",
      svg: Fruits,
      backColor: "#FFE9E5",
    },
    {
      id: 3,
      name: "Beverages",
      svg: Beverages,
      backColor: "#FFF6E3",
    },
    {
      id: 4,
      name: "Household",
      svg: Household,
      backColor: "#FFE8F2",
    },
    {
      id: 5,
      name: "Grocery",
      svg: Grocery,
      
      backColor: "#ECE2FF",
    },
  ];
const CategoryScreen = () => {
  return (
    <View>
      <HeaderBar title='Category'></HeaderBar>
      <View>
      <FlatList
            showsHorizontalScrollIndicator={false}
            numColumns={3}
            keyExtractor={(item) => item.id}
            data={categories}
            renderItem={({ item }) => <CategoryItem item={item} />}
          />
      </View>
    </View>
  )
}

export default CategoryScreen