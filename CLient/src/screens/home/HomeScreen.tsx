import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { CardProduct, CategoryItem, InputComponent, SpaceComponent } from "../../components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from "../../constants/appColor";
import {
  Vegetables,
  Fruits,
  Beverages,
  Household,
  Grocery,
} from "../../assets/svg";
import { appSize } from "../../constants/appSize";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/NavigationType";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import useAuthStore from "../../store/authStore";
const HomeScreen = () => {
  const{login,logout} =useAuthStore()
  const { getItem } = useAsyncStorage("authToken");
  const getToken=async ()=>{
     const tk=await getItem()
     console.log('token Home',tk)
  }
  

  const navigation= useNavigation<NavigationProp<RootStackParamList>>()
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
  const products: any = [
    {
      id: 1,
      name: "Fresh Peach",
      price:'8.00',
      unit:'1kg',
      //svg: Vegetables,
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
      //svg: Fruits,
      backColor: "#FFE9E5",
    },
    {
      id: 3,
      name: "Beverages",
      //svg: Beverages,
      price:'8.00',
      origin:'Cambodia',
      backColor: "#FFF6E3",
    },
    {
      id: 4,
      name: "Pomegranate",
      price:'8.00',
      //svg: Household,
      origin:'Cambodia',
      backColor: "#FFE8F2",
    },
    {
      id: 5,
      name: "Fresh B roccoli",
      price:'8.00',
      //svg: Grocery,
      origin:'Cambodia',
      backColor: "#ECE2FF",
    },
    {
      id: 6,
      name: "Black Grapes",
      price:'8.00',
      //svg: Grocery,
      origin:'Cambodia',
      backColor: "#ECE2FF",

    },
  ];
  //const navigation= useNavigation()
  const handleDetail:(item:any)=>void=(item)=> {
    navigation.navigate('Detail',{item})
  }
  const handleLogout =()=>{
    logout()
    //navigation.navigate("Login")
  }
  getToken()
  return (
    <SafeAreaView>
      <StatusBar></StatusBar>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 10 }}>
        <InputComponent placeholder="Search keyword..."
        leftIC={<MaterialCommunityIcons
          name="magnify"
          size={23}
          color={appColor.text} />}
        rightIC={<TouchableOpacity onPress={()=>AsyncStorage.clear()}>
          <MaterialCommunityIcons
            name="video-input-component"
            size={23}
            color={appColor.text} />
        </TouchableOpacity>} value={''} onChangeText={function (val: string): void {
          throw new Error("Function not implemented.");
        } }        />

        <Image source={require("../../assets/images/adv.png")}></Image>
        <TouchableOpacity onPress={()=>handleLogout()}><Text>dang xuat</Text></TouchableOpacity>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: appSize.large, fontWeight: 500 }}>
              Categories
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color={appColor.text}
            />
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item) => item.id}
            data={categories}
            renderItem={({ item }) => <CategoryItem item={item} />}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: appSize.large, fontWeight: 500 }}>
            Featured products
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color={appColor.text}
            />

            
          </View>
          <FlatList scrollEnabled={false} numColumns={2} 
          keyExtractor={item=>item.id} data={products} 
          renderItem={({item})=>
          <CardProduct onPress={()=>handleDetail(item)} item={item}/>}/>
          
          {/* {
            products.map((item:any,index:number)=><CardProductComponent key={item.id} onPress={()=>handleDetail(item)} item={item}/>)
            
          } */}
        <SpaceComponent height={20}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
//listheađercompinent của flatlist
export default HomeScreen;
