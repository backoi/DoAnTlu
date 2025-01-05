import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Minus, Plus } from "../assets/svg";
import { appColor } from "../constants/appColor";

const QuantityComponent = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: appColor.background,
        height: 40,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: appColor.text, marginLeft: 10 }}>Quantity</Text>
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View
          style={{
            borderRightWidth: 0.5,
            justifyContent: "center",
            borderRightColor: appColor.text,
          }}
        >
          <TouchableOpacity>
            <Minus height={25} width={25} style={{ marginRight: 5 }} />
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 25, marginHorizontal: 15 }}>3</Text>
        <View
          style={{
            borderLeftWidth: 0.5,
            borderLeftColor: appColor.text,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <Plus height={25} width={35} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default QuantityComponent;
