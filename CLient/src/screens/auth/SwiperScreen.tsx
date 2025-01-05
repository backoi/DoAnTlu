import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { SpaceComponent, TextComponent } from "../../components";
interface Props {
  item: any;
  index?: any;
}
const SwiperScreen = (props: Props) => {
  const { item, index } = props;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3 }}>
        <Image source={item?.img}></Image>
      </View>
      <View style={style.textView}>
        <SpaceComponent height={20} />
        <TextComponent
          style={{ textAlign: "center" }}
          text={item?.title}
          title
        />
        <SpaceComponent height={10} />
        <TextComponent style={{ textAlign: "center" }} text={item?.des} />
        <View style={{ flexDirection: "row" }}>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  textView: {
    flex: 1.5,
    backgroundColor: "white",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
});
export default SwiperScreen;
