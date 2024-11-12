import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { appSize } from "../constants/appSize";
import { appColor } from "../constants/appColor";
interface Props {
  title: string,
  icon?: ReactNode,
  onPress?:()=>void,
  textColor?:string,
  color?:Array<string>,
  disabled?:boolean,
}
const ButtonComponent = (props: Props) => {
 
  const { title, icon,onPress,textColor,color,disabled } = props;
  return (
    <TouchableOpacity
      style={style.container} onPress={onPress} disabled={disabled}
    >
      <LinearGradient
        style={[style.linear,{paddingLeft:icon?30:0}]}
        start={{ x: 0.1, y: 0.2 }}
        colors={disabled?['black','gray']: color?color:[appColor.primary, appColor.primary_dark]}
      >
        {icon}
        <Text style={[style.text,{color:textColor??'white',marginRight:icon?60:0,}]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
    container:{
        width: "100%",
        minHeight:50,
        shadowColor: "#04fa4a",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowRadius: 16.0,
        elevation: 4,
        alignSelf:'center',
      },
  
  linear:{
    flex: 1,
    flexDirection: "row",
    alignItems:'center',
    borderRadius: 6,
  },
  text: {
    flex:1,
    textAlign:'center',
    fontSize: appSize.para,
    fontWeight:'500',
    
  },
});
export default ButtonComponent;
