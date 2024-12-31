import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  CardProduct,
  CategoryItem,
  InputComponent,
  SpaceComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { Right, Search } from "../../assets/svg";
import { appSize } from "../../constants/appSize";
import {
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/NavigationType";
import useAuthStore from "../../store/authStore";
import { categoryService } from "../../utils/categoryService";
import { productService } from "../../utils/productService";
import useCartStore from "../../store/cartStore";
import * as Notifications from "expo-notifications";
import { deviceService } from "../../utils/deviceService";
//San pham ban chay nhat
const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState<any | undefined>();
  const [features, setFeatures] = useState<any | undefined>();
  const { accessToken } = useAuthStore();

  const handleSearch = () => {
    setSearchText("");
    navigation.navigate("Search", { text: searchText });
  };

  const getCategories = async () => {
    const res = await categoryService.getAll();
    setCategories(res?.data.categories);
  };

  const getBestSellerProducts = async () => {
    const res = await productService.getBestSeller();
    //console.log("du lieu nhan duoc", res?.data);
    //chi lay 6 san pham
    const data= res?.data.slice(0, 6);
    setFeatures(data);
  };

  const registerForPushNotificationsAsync = async () => {
    const projectId = "61d8e604-72a4-4074-8d9d-8dccaa86942b";
    const token = (
      await Notifications.getExpoPushTokenAsync({ projectId })
    ).data;
    await deviceService.registerDevice(token);
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
    getCategories();
    getBestSellerProducts();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <InputComponent
            placeholder="Search keyword..."
            leftIC={
              <TouchableOpacity onPress={handleSearch}>
                <Search height={23} />
              </TouchableOpacity>
            }
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        <Image
          style={styles.bannerImage}
          source={require("../../assets/images/adv.png")}
        />
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Category")}>
              <Right/>
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item) => item._id}
            data={categories}
            renderItem={({ item }) => <CategoryItem item={item} />}
          />
          <SpaceComponent height={20} />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best seller products</Text>
            <TouchableOpacity onPress={() => navigation.navigate("BestSeller")}>
              <Right/>
            </TouchableOpacity>
          </View>
          <FlatList
            columnWrapperStyle={styles.productList}
            scrollEnabled={false}
            numColumns={2}
            keyExtractor={(item) => item._id}
            data={features}
            renderItem={({ item }) => <CardProduct item={item} />}
          />
          <SpaceComponent height={20} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    marginHorizontal: 10,
  },
  bannerImage: {
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: appSize.large,
    fontWeight: "500",
  },
  productList: {
    marginBottom: 10,
  },
});
