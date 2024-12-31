import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { userService } from "../../utils/userService";
import { HeaderBar } from "../../components";

type Props = {};

const CouponScreen = (props: Props) => {
  const [listCoupon, setListCoupon] = useState([]);
  const fetchCoupons = async () => {
    const res = await userService.getCoupon();
    console.log("coupon:", res?.data.coupons);
    setListCoupon(res?.data.coupons);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);
  return (
    <View style={{ marginHorizontal: 10 }}>
      <HeaderBar back color="black" title="Coupon"></HeaderBar>

      <Text>List Coupons:</Text>
      <ScrollView>
        {listCoupon.map((coupon: any) => {
          return (
            <Text key={coupon._id}>
              Code: <Text style={{ fontWeight:coupon.isUsed.toString() == "true" ? "normal" : "bold" }}>{coupon.code}</Text> - Discount: {coupon.discountPercentage}% -{" "}
              {coupon.isUsed.toString() == "true" ? "Used" : "Can use"}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CouponScreen;

const styles = StyleSheet.create({});
