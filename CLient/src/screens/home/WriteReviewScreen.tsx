import { Dimensions, StyleSheet, Text, TextBase, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { ButtonComponent, HeaderBar, SpaceComponent } from '../../components'
import { Rating } from 'react-native-ratings';

type Props = {}
const { width, height } = Dimensions.get("window");
const WriteReviewScreen = (props: Props) => {
    const commentRef = useRef(''); // Biến tạm lưu giá trị comment
    const [comment,setComment]=useState('')
    const [rate,setRate]=useState(3)
    
    const handleRate =(rate:any)=>{
       setRate(rate)
    }
    console.log('render')
  return (
    <View style={{flex:1}}>
      <HeaderBar color='black' title='Write Review'></HeaderBar>
      <View style={{backgroundColor:'#D1D5DB',flex:1}}>
        <SpaceComponent height={30}/>
        <View style={{alignItems:'center'}}>
            <Text style={{fontWeight:700,fontSize:20}}>What do you think ?</Text>
            <Text>please give your rating by clicking on
            the stars below</Text>
        <Rating tintColor={'#D1D5DB'} startingValue={3} jumpValue={1} style={{}} onFinishRating={(rate:any)=>setRate(rate)}/>
        </View>
        <View style={{margin:20,position:'absolute',width:width*0.8,alignSelf:'center',bottom:0}}>
            <TextInput value={comment} multiline numberOfLines={10} style={{
                backgroundColor:'white',textAlignVertical:'top',padding:5,borderRadius:5
                
            }} placeholder='Tell us about your experience' onChangeText={(text)=>commentRef.current=text}></TextInput>
            <SpaceComponent height={10}/>
            <ButtonComponent onPress={()=>console.log('giá trị comment',commentRef.current)} title='Post Review'></ButtonComponent>
        </View>
      </View>
    </View>
  )
}

export default WriteReviewScreen

const styles = StyleSheet.create({})