//slide itemproduct
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  CardProduct,
  CategoryItem,
  InputComponent,
  SpaceComponent,
} from "../../components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from "../../constants/appColor";
import { Search } from "../../assets/svg";
import { appSize } from "../../constants/appSize";
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/NavigationType";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import useAuthStore from "../../store/authStore";
import { categoryService } from "../../utils/categoryService";
import { productService } from "../../utils/productService";
import useCartStore from "../../store/cartStore";
import * as Notifications from "expo-notifications";
import axios from "axios";
const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState<any | undefined>();
  const [features, setFeatures] = useState<any | undefined>();
  const {cartItems,decreaseQuantity,increaseQuantity,totalPrice,addItem}=useCartStore()
  const {user,accessToken}= useAuthStore()
  //console.log("gia tri user trong store",user)
  const { getItem } = useAsyncStorage("authToken");
  // const getToken = async () => {
  //   const tk = await getItem();
  //   console.log("token Home", tk);
  // };


  const handleSearch = () => {
    setSearchText('')
    navigation.navigate("Search", { text: searchText });
  };
  //getToken()
  const getCategories = async () => {
    const res = await categoryService.getAll();

    setCategories(res?.data.categories);
  };
  const getFeatureProducts = async () => {
    const res = await productService.getFeatures();

    setFeatures(res?.data.products);
  };

   const registerForPushNotificationsAsync = async () => {
    const prjId="61d8e604-72a4-4074-8d9d-8dccaa86942b"
      const token = (await Notifications.getExpoPushTokenAsync({projectId:prjId})).data;
      console.log('mã token thiết bị: ',token);

      const res=await axios.post("http://192.168.1.10:3000/device/register", {
        token,
      },{headers:{Authorization:accessToken}});
      console.log('res',res.data)
      
   }
  useEffect(() => {
    registerForPushNotificationsAsync();
    getCategories();
    getFeatureProducts();
  }, []);
  return (
    <SafeAreaView style={{ marginHorizontal: 10 }}>
      <StatusBar></StatusBar>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View>
          <InputComponent
            placeholder="Search keyword..."
            leftIC={
              <TouchableOpacity onPress={handleSearch}>
                <Search height={23}></Search>
              </TouchableOpacity>
            }
            rightIC={
              <TouchableOpacity onPress={() => AsyncStorage.clear()}>
                <MaterialCommunityIcons
                  name="account"
                  size={23}
                  color={appColor.text}
                />
              </TouchableOpacity>
            }
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        <View>
          <Image
            style={{ marginBottom: 10 }}
            source={require("../../assets/images/adv.png")}
          ></Image>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Text style={{ fontSize: appSize.large, fontWeight: 500 }}>
              Categories
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Category")}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={30}
                color={appColor.text}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item) => item._id}
            data={categories}
            renderItem={({ item }) => <CategoryItem item={item} />}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text style={{ fontSize: appSize.large, fontWeight: 500 }}>
              Featured products
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color={appColor.text}
            />
          </View>
          <FlatList
            columnWrapperStyle={{ marginBottom: 10 }}
            scrollEnabled={false}
            numColumns={2}
            keyExtractor={(item) => item._id}
            data={features}
            renderItem={({ item }) => (
              <CardProduct item={item} />
            )}
          />
          <SpaceComponent height={20} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
//listheađercompinent của flatlist
export default HomeScreen;
