import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

const ImageSwiper = ({ images }: any) => {
  // Kiểm tra nếu không có ảnh
  if (!images || images.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={{ uri: "https://placehold.co/400x200?text=No+Image" }}
          style={styles.image}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Swiper
        autoplay={true} 
        autoplayTimeout={3} 
        loop={true} 
        showsPagination={true} 
      >
        {images.map((image: any, index: number) => (
          <Image
            key={index} 
            source={image}
            style={styles.image}
          />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: "100%",
    resizeMode: "cover",
  },
});

export default ImageSwiper;
