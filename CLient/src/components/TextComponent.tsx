import { View, Text, TextStyle } from 'react-native'
import React from 'react'
import { appSize } from '../constants/appSize'
import { appColor } from '../constants/appColor'
interface Props{
    text:string,
    title?:boolean,
    color?:string,
    style?:TextStyle,
    numberOfLine?:number,
}
const TextComponent = (props:Props) => {
    const {text,color,title,style,numberOfLine}=props
  return (
    <View>
      <Text numberOfLines={numberOfLine} style={[{fontSize:title?appSize.title:appSize.para,color:color?color:title?'black':appColor.text,fontWeight:title?'bold':'normal'},style,]}>{text}</Text>
    </View>
  )
}

export default TextComponent