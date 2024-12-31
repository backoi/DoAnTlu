import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { userService } from "../../utils/userService";
import { HeaderBar } from "../../components";
import { formatToVietnamTime } from "../../utils/validate";

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
            <View key={coupon._id} style={{ marginVertical: 5 }}>
            <Text >
              Code: <Text style={{ fontWeight:coupon.isUsed.toString() == "true" ? "normal" : "bold" }}>{coupon.code}</Text> - Discount: {coupon.discountPercentage}% -{" "}
              {coupon.isUsed.toString() == "true" ? "Used" : "Can use"} 
            </Text>
            <Text>Expires At: {formatToVietnamTime(coupon.expiresAt)}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CouponScreen;

const styles = StyleSheet.create({});
