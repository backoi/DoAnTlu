import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import useUserStore from "../../store/userStore";
import { HeartFill } from "../../assets/svg";
import { HeaderBar } from "../../components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/NavigationType";

type Props = {};
const { width, height } = Dimensions.get("window");
const FavoriteScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { favItems, toggleFavItem } = useUserStore();
  return (
    <View>
      <HeaderBar color="black" back title="Favorite Items"></HeaderBar>
      <FlatList
        scrollEnabled={false}
        numColumns={2}
        data={favItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detail", { id: item.id })}
          >
            <ImageBackground
              source={{ uri: item.urlImg }}
              style={{
                width: width * 0.45,
                height: height * 0.3,
                backgroundColor: "gray",
                margin: 10,
                justifyContent: "space-between",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity onPress={() => toggleFavItem(item)}>
                <HeartFill />
              </TouchableOpacity>
              <View>
                <Text style={{ fontSize: 17, color: "white" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 17, color: "white" }}>
                  {item.price}$
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
