import { View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import { ButtonComponent, SpaceComponent } from "../../components";
import { appColor } from "../../constants/appColor";
import { useNavigation } from "@react-navigation/native";
import SwiperScreen from "./SwiperScreen";



const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const items = [
    {
      id: 0,
      title: `Premium Food
  At Yur Doorstep`,
      img: require("../../assets/images/onboard/onboarding1.png"),
      des: `Lorem ipsum dolor sit amet, consetetur 
sadipscing elitr, sed diam nonumy`,
    },
    {
      id: 1,
      title: `Premium Food
  At Yur Doorstep`,
      img: require("../../assets/images/onboard/onboarding2.png"),
      des: `Lorem ipsum dolor sit amet, consetetur 
sadipscing elitr, sed diam nonumy`,
    },
    {
      id: 2,
      title: `Premium Food
  At Yur Doorstep`,
      img: require("../../assets/images/onboard/onboarding3.png"),
      des: `Lorem ipsum dolor sit amet, consetetur 
sadipscing elitr, sed diam nonumy`,
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <Swiper showsPagination activeDotColor={appColor.primary_dark}>
        {items.map((item, index) => (
          <SwiperScreen
            key={index}
            item={items[index]}
            index={items[index].id}
          />
        ))}
      </Swiper>
      <View style={{ paddingHorizontal: 20 }}>
        <ButtonComponent
          title="Get started"
          onPress={() => navigation.navigate("Welcome" as never)}
        />
      </View>
      <SpaceComponent height={40} />
    </View>
  );
};

export default OnBoardingScreen;
