import {
  ActivityIndicator,
  Alert,
  
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ButtonComponent,
  CardProduct,
  InputComponent,
  Loading,
} from "../../components";
import { Back, Filter, NotFound, Reload, Search } from "../../assets/svg";
import { productService } from "../../utils/productService";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { appColor } from "../../constants/appColor";
import { Rating } from "react-native-ratings";
import { RootStackParamList } from "../../assets/types/NavigationType";
import { FlatList } from "react-native-gesture-handler";

type Props = {};

const SearchScreen = ({ route }: any, props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { category } = route?.params || "";
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [minRate, setMinRate] = useState(0);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchText, setSearchText] = useState("");
  //const [isNewSearch, setIsNewSearch] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const minPriceInputRef = useRef<TextInput>(null);
  const maxPriceInputRef = useRef<TextInput>(null);
  const handleOpenFIlter = () => {
    bottomSheetRef.current?.expand();
  };


  // const handleSearch = async () => {
  //   console.log('Search text:', searchText);
  //   const minPriceValue = minPrice ? minPrice : 0;
  //   const maxPriceValue = maxPrice ? maxPrice : Infinity;
  //   console.log(!hasMore, loading);
  //   if (!hasMore || loading) return;
  //   // setLoading(true);
  //    try {
  //     setLoading(true);
  //       const res = await productService.getProducts(
  //         searchText,
  //         category,
  //         minPriceValue,
  //         maxPriceValue,
  //         minRate,
  //         offset,
  //         limit
  //       );
  //       const { products: newProducts, hasMore: moreData } = res?.data;
  //       console.log("newProducts:", newProducts, 'gia tri hasMore',moreData);
  //       setData(newProducts);
  //       setOffset((prevOffset) => prevOffset + newProducts.length);
  //       //setOffset(newProducts.length);
  //       setHasMore(moreData);
  //       setLoading(false);
  //   } catch (error) {
  //     console.error("Error searching products:", error);
  //     Alert.alert("Error", "Failed to search products");
  //     setLoading(false);
  //   }
  // };

  const handleSearch = async () => {
    console.log("Search text:", searchText);
    const minPriceValue = minPrice ? parseFloat(minPrice) : 0;
    const maxPriceValue = maxPrice ? parseFloat(maxPrice) : Infinity;
  
    if (loading) return;
  
    try {
      setLoading(true);
      setOffset(0);
      setHasMore(true);
  
      const res = await productService.getProducts(
        searchText,
        category,
        minPriceValue,
        maxPriceValue,
        minRate,
        0, // Offset luôn là 0 khi tìm kiếm mới
        limit
      );
  
      const { products: newProducts, hasMore: moreData } = res?.data;
      console.log("newProducts:", newProducts, "gia tri hasMore", moreData);
  
      // Thay thế dữ liệu cũ bằng dữ liệu mới
      setData(newProducts);
      setOffset(newProducts.length);
      setHasMore(moreData);
      setLoading(false);
    } catch (error) {
      console.error("Error searching products:", error);
      Alert.alert("Error", "Failed to search products");
      setLoading(false);
    }
  };
  const handleLoadMore = async () => {
    const minPriceValue = minPrice ? parseFloat(minPrice) : 0;
    const maxPriceValue = maxPrice ? parseFloat(maxPrice) : Infinity;
  
    if (loading || !hasMore) return;
  
    try {
      setLoading(true);
  
      const res = await productService.getProducts(
        searchText,
        category,
        minPriceValue,
        maxPriceValue,
        minRate,
        offset, // Sử dụng offset hiện tại để tải thêm dữ liệu
        limit
      );
  
      const { products: newProducts, hasMore: moreData } = res?.data;
      console.log("newProducts:", newProducts, "gia tri hasMore", moreData);
  
      // Nối dữ liệu mới vào danh sách hiện tại
      setData((prevData: any) => [...prevData, ...newProducts]);
      setOffset((prevOffset) => prevOffset + newProducts.length);
      setHasMore(moreData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading more products:", error);
      Alert.alert("Error", "Failed to load more products");
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     if (text || category) {
  //       setSearchText(text);
  //       await getProducts(text, category);
  //     }
  //   };
  //   fetchProducts();
  // }, [text, category]);

  const handleApplyFilter = () => {
    const minPriceValue = parseFloat(minPrice.toString());
    const maxPriceValue = parseFloat(maxPrice.toString());
  
    // Nếu giá trị không phải là số, đặt giá trị mặc định
    if(isNaN(minPriceValue) ||isNaN(maxPriceValue)){
      Alert.alert("Invalid Input", "Please enter valid price values.");
    }
    // Đảm bảo minPrice không lớn hơn maxPrice
    if (minPriceValue > maxPriceValue) {
      Alert.alert("Invalid Input", "Min price cannot be greater than max price.");
      return;
    }
    setMinRate(minRate);
    bottomSheetRef.current?.close();
  };

  const handleResetFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    setMinRate(0);
  };

  const renderItem = ({ item }: any) => <CardProduct item={item} />;

  const onEndReached = () => {
    // Kích hoạt tải thêm khi đạt ngưỡng
    if (hasMore && !loading) {
      handleLoadMore()
    }
  };
  //console.log('isnews',isNewSearch)
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{ backgroundColor: "#F4F5F9", flex: 1, marginHorizontal: 5 }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ margin: 5 }}
          >
            <Back height={30}></Back>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <InputComponent
              leftIC={
                <TouchableOpacity
                  onPress={handleSearch}
                >
                  <Search height={23}></Search>
                </TouchableOpacity>
              }
              value={searchText}
              placeholder="Search a keyword"
              onChangeText={(text) => setSearchText(text)}
              rightIC={
                <TouchableOpacity onPress={handleOpenFIlter}>
                  <Filter height={23}></Filter>
                </TouchableOpacity>
              }
            ></InputComponent>
          </View>
        </View>
        <View>
          <View>
            <FlatList
              keyExtractor={(item) => item._id}
              style={{ height: "95%" }}
              numColumns={2}
              data={data}
              renderItem={renderItem}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.5} //ngưỡng kích hoạt tải thêm
              ListEmptyComponent={
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 50,
                  }}
                >
                  <NotFound height={70} width={70}></NotFound>
                  <Text style={{ fontSize: 23 }}>
                    Not found product, please change search
                  </Text>
                </View>
              }
            ></FlatList>
          </View>
        </View>
        <BottomSheet
          style={{}}
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          onClose={() => {
            minPriceInputRef.current?.blur();
            maxPriceInputRef.current?.blur();
          }}
        >
          <BottomSheetView
            style={{
              backgroundColor: appColor.background,
              flex: 1,
              marginBottom: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginVertical: 10,
                justifyContent: "space-between",
              }}
            >
              <View></View>
              <Text style={{ fontSize: 18 }}>Apply filters</Text>
              <TouchableOpacity onPress={handleResetFilter}>
                <Reload></Reload>
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <View style={{ padding: 10, backgroundColor: "white" }}>
                <View style={{}}>
                  <Text style={{ fontSize: 18, marginBottom: 10 }}>
                    Price Range
                  </Text>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <TextInput
                      ref={minPriceInputRef}
                      keyboardType="phone-pad"
                      value={minPrice.toString()}
                      onChangeText={setMinPrice}
                      style={{
                        flex: 1,
                        paddingLeft: 10,
                        height: 50,
                        backgroundColor: appColor.background,
                      }}
                      placeholder="Min."
                    ></TextInput>
                    <TextInput
                      ref={maxPriceInputRef}
                      keyboardType="phone-pad"
                      value={maxPrice?.toString()}
                      onChangeText={setMaxPrice}
                      style={{
                        flex: 1,
                        paddingLeft: 10,
                        height: 50,
                        backgroundColor: appColor.background,
                      }}
                      placeholder="Max."
                    ></TextInput>
                  </View>
                </View>
                <View style={{ backgroundColor: "white" }}>
                  <Text style={{ fontSize: 18, marginBottom: 10 }}>
                    Star Rating
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Rating
                      startingValue={0}
                      ratingCount={5}
                      jumpValue={0.5}
                      onFinishRating={(rate: any) => setMinRate(rate)}
                    ></Rating>
                    <Text style={{ fontSize: 15 }}>{minRate} Star</Text>
                  </View>
                </View>
              </View>
            </View>

            <ButtonComponent
              onPress={handleApplyFilter}
              title="Apply filter"
            ></ButtonComponent>
          </BottomSheetView>
        </BottomSheet>
        <Loading visiable={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  //F4F5F9
});
