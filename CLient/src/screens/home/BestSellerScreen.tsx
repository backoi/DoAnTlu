import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CardProduct, HeaderBar, SpaceComponent } from "../../components";
import { productService } from "../../utils/productService";

type Props = {};

const BestSellerScreen = (props: Props) => {
  const [allBestSeller, setAllBestSeller] = useState();
  const getAllBestSeller = async () => {
    const res = await productService.getBestSeller();
    console.log("du lieu nhan duoc", res?.data);
    setAllBestSeller(res?.data);
  };
  //fetch the best
  useEffect(() => {
    //fetch the best seller
    getAllBestSeller();
  }, []);
  return (
    <View>
      <HeaderBar back color="black" title="Best Seller"></HeaderBar>
      <FlatList
      ListFooterComponent={<SpaceComponent height={20} />}
        numColumns={2}
        keyExtractor={(item) => item._id}
    showsVerticalScrollIndicator={false}
        data={allBestSeller}
        renderItem={({ item }) => <CardProduct item={item}  />} />  
        
    </View>
  );
};

export default BestSellerScreen;

const styles = StyleSheet.create({});
