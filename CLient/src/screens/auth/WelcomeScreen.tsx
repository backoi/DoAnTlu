import { View, Text, Image, ImageBackground, StatusBar, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  ButtonComponent,
  HeaderBar,
  SpaceComponent,
  TextComponent,
} from "../../components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from "../../constants/appColor";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation=useNavigation()
  return (
    <View style={{ flex: 1, }}>
      <StatusBar></StatusBar>
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/images/welcome.png")}
        style={{ width: "100%", height: "110%",flex:1.7}}
      >
        <HeaderBar
          onPress={() => navigation.navigate("OnBoarding" as never)} title={""}        ></HeaderBar>
      </ImageBackground>
      <View style={styles.textContainer}>
        <SpaceComponent height={20}/>
        <TextComponent text="Welcome" title />
        <TextComponent
          text="Lorem ipsum dolor sit amet, consetetur 
sadipscing elitr, sed diam nonumy"
        />
        <SpaceComponent height={10}/>
        <ButtonComponent icon={<MaterialCommunityIcons name='google' size={23} color={'gray'}></MaterialCommunityIcons>} color={['white','white']} title="Continue with google" textColor="black"/>
        <SpaceComponent height={10}/>
        <ButtonComponent title="Create an account" onPress={()=>navigation.navigate('SignUp' as never)} icon={<MaterialCommunityIcons name="account-circle-outline" size={23} color={'white'}></MaterialCommunityIcons>} />
        <SpaceComponent height={10}/>
        <View style={styles.viewTextLogin}>
        <Text style={{opacity:0.5}}>Already have an account? </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Login' as never)}>
          <Text style={{fontWeight:600}}>Login</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textContainer:{backgroundColor:appColor.background,flex:1,borderTopLeftRadius:20,borderTopRightRadius:20,paddingHorizontal:20},
  viewTextLogin:{
      justifyContent:'center',alignItems:'center',flexDirection:'row'
  },
  
})
export default WelcomeScreen;
