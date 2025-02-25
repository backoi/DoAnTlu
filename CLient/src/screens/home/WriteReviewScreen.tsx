import { Alert, Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import {
  ButtonComponent,
  HeaderBar,
  Loading,
  SpaceComponent,
} from "../../components";
import { Rating } from "react-native-ratings";
import { reviewService } from "../../utils/reviewService";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/NavigationType";

type Props = {};
const { width, height } = Dimensions.get("window");

const WriteReviewScreen = ({ route }: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const productId = route.params;
  const commentRef = useRef<TextInput>(null); // Correctly type the ref
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState(3);
  const [comment, setComment] = useState("");

  const handlePostReview = async () => {
    try {
      setLoading(true);
      const res = await reviewService.createReview(productId, rate, comment);
      //console.log("gia tri tra ve", res);
      setRate(3);
      setComment("");
      navigation.goBack();
    } catch (error:any) {
      setLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar color="black" title="Write Review"></HeaderBar>
      <View style={{ backgroundColor: "#D1D5DB", flex: 1 }}>
        <SpaceComponent height={30} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: 700, fontSize: 20 }}>
            What do you think ?
          </Text>
          <Text>please give your rating by clicking on the stars below</Text>
          <Rating
            tintColor={"#D1D5DB"}
            startingValue={3}
            jumpValue={1}
            style={{}}
            onFinishRating={(rate: any) => setRate(rate)}
          />
        </View>
        <View
          style={{
            margin: 20,
            position: "absolute",
            width: width * 0.8,
            alignSelf: "center",
            bottom: 0,
          }}
        >
          <TextInput
            value={comment}
            multiline
            numberOfLines={10}
            style={{
              backgroundColor: "white",
              textAlignVertical: "top",
              padding: 5,
              borderRadius: 5,
            }}
            placeholder="Tell us about your experience"
            onChangeText={setComment}
          />
          <SpaceComponent height={10} />
          <ButtonComponent
            onPress={handlePostReview}
            title="Post Review"
          ></ButtonComponent>
        </View>
      </View>
      <Loading visiable={loading} />
    </View>
  );
};

export default WriteReviewScreen;

const styles = StyleSheet.create({});
