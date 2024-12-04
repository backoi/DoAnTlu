import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ButtonComponent, CardProduct, InputComponent } from '../../components'
import { Back, Filter, Heart, Reload, Search } from '../../assets/svg'
import { productService } from '../../utils/productService'
import { useNavigation } from '@react-navigation/native'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { appColor } from '../../constants/appColor'
import { Rating } from 'react-native-ratings'
//validate
type Props = {}


const SearchScreen = ({route}:any,props:Props) => {
  const navigation=useNavigation()
  const {text,category}=route?.params||''
  const [data,setData]=useState()
  const [minRate,setMinRate]=useState(0)
  const [minPrice,setMinPrice]=useState('')
  const [maxPrice,setMaxPrice]=useState('')
  const [searchText,setSearchText]=useState('')
  const snapPoints = useMemo(() => ['25%', '50%',], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenFIlter = () => {
    bottomSheetRef.current?.expand();
  };
  const getProducts =async (text:string,category:string) =>{
    const res=await productService.getProducts(text,category) 
    console.log('du lieu',res?.data)
    setData(res?.data)
  }
  const handleSearch=async()=>{
    console.log('gia tri search',searchText)
    const minPriceValue = minPrice ? parseFloat(minPrice) : 0;
    const maxPriceValue = maxPrice ? parseFloat(maxPrice) : 99;
    
    {
      console.log('gia trị tìm kiếm',searchText,'giá nhỏ',minPrice,'giá to',maxPrice)
      if(minPrice||maxPrice){
        const res=await productService.getProducts(searchText,category,minPriceValue,maxPriceValue,minRate) 
        console.log('du lieu',res?.data)
        setData(res?.data)
        
        return res
      }
      else{
        const res=await productService.getProducts(searchText,category)
        console.log('du lieu',res?.data)
        setData(res?.data)
        
        return res
      }
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
  const handleApplyFilter=() => {
    console.log('gia tri filter min:',minPrice,'max:',maxPrice,'rate:',minRate)
   
    setMinRate(0)
    bottomSheetRef.current?.close()
  }

  const handleResetFilter=()=> {
   setMinPrice('')
   setMaxPrice('')
   setMinRate(2.5)
  }

  return (
    <View style={{backgroundColor:'#F4F5F9',flex:1,marginHorizontal:5}}>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
         <TouchableOpacity onPress={()=>navigation.goBack()} style={{margin:5}}><Back height={30}></Back></TouchableOpacity> 
        <InputComponent leftIC={<TouchableOpacity onPress={handleSearch}>
          <Search height={23}></Search></TouchableOpacity>} value={searchText} placeholder='Search a keyword' onChangeText={(text)=>setSearchText(text)} 
        rightIC={<TouchableOpacity onPress={handleOpenFIlter}><Filter height={23}></Filter></TouchableOpacity>}></InputComponent>
        
      </View>
      <View>
        <FlatList numColumns={2} data={data} 
        renderItem={({item})=>(<CardProduct item={item}></CardProduct>)}
        ListEmptyComponent={<Text>khong tim thay</Text>}
        ></FlatList>
      </View>

      <BottomSheet
        style={{ }}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <BottomSheetView style={{ backgroundColor: appColor.background, flex: 1,marginBottom:30}}>
          <View style={{flexDirection:'row',marginVertical:10,justifyContent:'space-between'}}>
            <View></View>
            <Text style={{fontSize:18}}>Apply filters</Text>
            <TouchableOpacity onPress={handleResetFilter}>
            <Reload></Reload>
            </TouchableOpacity>
          </View>
          <View style={{}}>
           <View style={{padding:10,backgroundColor:'white'}}>
            <View style={{}}>
              <Text style={{fontSize:18,marginBottom:10}}>Price Range</Text>
              <View style={{flexDirection:'row',gap:10}}>
                <TextInput value={minPrice?.toString()} onChangeText={setMinPrice} style={{flex:1,paddingLeft:10,height:50,backgroundColor:appColor.background}} placeholder='Min.'></TextInput>
                <TextInput value={maxPrice?.toString()} onChangeText={setMaxPrice} style={{flex:1,paddingLeft:10,height:50,backgroundColor:appColor.background}} placeholder='Max.'></TextInput>
              </View>
            </View>
            <View style={{backgroundColor:'white'}}>
              <Text style={{fontSize:18,marginBottom:10}}>Star Rating</Text>
             <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
              <Rating startingValue={0} ratingCount={5} jumpValue={0.5}  onFinishRating={(rate:any)=>setMinRate(rate)}></Rating>
              <Text style={{fontSize:15}}>{minRate} Star</Text>
             </View>
            </View>
           </View>
           
          </View>
          <View style={{position:'absolute',bottom:0,left:0,right:0}}>
            
          <ButtonComponent onPress={handleApplyFilter} title='Apply filter'></ButtonComponent>
          </View>
          
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  //F4F5F9
})