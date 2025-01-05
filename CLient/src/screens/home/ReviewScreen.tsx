import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderBar } from "../../components";
import { Add } from "../../assets/svg";
import { Rating } from "react-native-ratings";
import { reviewService } from "../../utils/reviewService";
import {
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/NavigationType";
import { formatToVietnamTime } from "../../utils/validate";

type Props = {};

const ReviewScreen = ({ route }: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { productId } = route.params;

  const [reviews, setReviews] = useState([]);
  const getReview = async () => {
    const res = await reviewService.getReviewById(productId);
    //console.log("reviews:", res.data.reviews); // In ra danh sách đánh giá của sản phẩm này
    setReviews(res.data.reviews);
  };
  useEffect(() => {
    // Lắng nghe sự kiện focus của màn hình
    const unsubscribe = navigation.addListener("focus", () => {
      getReview(); // Gọi lại hàm để cập nhật danh sách
    });
    // Cleanup sự kiện khi component unmount
    return unsubscribe;
  }, []); //[navigation]

  return (
    <View>
      <HeaderBar
        color="black"
        title="Reviews"
        rightIC={
          <TouchableOpacity
            onPress={() => navigation.navigate("WriteReview", productId)}
            style={{}}
          >
            <Add height={23} />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={reviews}
        renderItem={({ item }: any) => (
          <View style={{ margin: 10, gap: 10, borderBottomWidth: 0.5 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{}}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={{
                    uri: "https://topdanangcity.com/wp-content/uploads/2024/09/avatar-trang-1Ob2zMM.jpg",
                  }}
                ></Image>
              </View>
              <Text>{item?.userId.username}</Text>
            </View>
            <View>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text>{formatToVietnamTime(item?.createdAt)}</Text>
                <Rating
                  style={{ alignItems: "flex-start" }}
                  startingValue={item?.rating}
                  fractions={1}
                  jumpValue={0.5}
                  imageSize={20}
                  type="star"
                  ratingCount={5}
                  readonly
                />
              </View>
              <Text>{item?.comment}</Text>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({});
