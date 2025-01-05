import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { ReactNode } from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import { appSize } from "../constants/appSize";
import { useNavigation } from "@react-navigation/native";

interface Props {
  rightIC?: ReactNode;
  title: string;
  color?: string;
  back?: boolean;
  onPress?: () => void;
}
const HeaderBarComponent = (props: Props) => {
  const navigation = useNavigation();
  const { title, rightIC, color, back, onPress } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: appSize.xsmall,
      }}
    >
      {back ? (
        <TouchableOpacity
          onPress={onPress ? onPress : () => navigation.goBack()}
        >
          <Icon name="arrow-left" size={appSize.icon} color={color ?? "white"}></Icon>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      <Text style={[styles.text, { color: color ?? "white" }]}>{title}</Text>
      {rightIC ? rightIC : <View />}
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: appSize.medium,
    fontWeight: "bold",
  },
});
export default HeaderBarComponent;
