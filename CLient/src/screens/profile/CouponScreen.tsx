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
    setListCoupon(res?.data.coupons);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const isCouponExpired = (expiresAt: string) => {
    const currentTime = new Date();
    const expireTime = new Date(expiresAt);
    return currentTime > expireTime;
  };

  return (
    <View style={{ marginHorizontal: 10 }}>
      <HeaderBar back color="black" title="Coupon"></HeaderBar>

      <Text>List Coupons:</Text>
      <ScrollView>
        {listCoupon.map((coupon: any) => {
          const isExpired = isCouponExpired(coupon.expiresAt);
          const canUse = !coupon.isUsed && !isExpired;

          return (
            <View key={coupon._id} style={{ marginVertical: 5 }}>
              <Text>
                Code:{" "}
                <Text
                  style={{
                    fontWeight: canUse ? "bold" : "normal",
                  }}
                >
                  {coupon.code}
                </Text>{" "}
                - Discount: {coupon.discountPercentage}% -{" "}
                {coupon.isUsed ? "Used" : isExpired ? <Text style={{ color: "red" }}>Can't use</Text> : <Text style={{ color: "green" }}>Can use </Text>}
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