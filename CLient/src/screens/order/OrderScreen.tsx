import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderBar } from "../../components";
import { orderService } from "../../utils/orderService";
import useAuthStore from "../../store/authStore";
import { Box } from "../../assets/svg";
import { appColor } from "../../constants/appColor";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/NavigationType";
import useCartStore from "../../store/cartStore";
import { formatToVietnamTime } from "../../utils/validate";

const OderScreen = () => {
  const { addItem } = useCartStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [activeOrder, setActiveOrder] = useState("On going");

  const handleCancelOrder = (id: any) => {
    Alert.alert(
      "Confirm cancel order?",
      "Are you sure you want to cancel this order?",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: async () => {
            await orderService.cancelOrder(id);
            fetchOrders();
            Alert.alert("Notification", "Order has been cancelled.");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleReOrder = (item: any) => {
    item.items.forEach((item: any) => {
      const product = {
        id: item?.productId._id,
        name: item?.productId.name,
        urlImg: item?.productId.imgUrl,
        price: item?.productId.price,
        stock: item?.productId.stock,
        quantity: 1,
        unit: item?.productId.unit,
      };
      addItem(product, item?.quantityPurchased);
    });
  };

  const handleTrackOrder = (index: number) => {
    navigation.navigate("TrackOrder", { item: ongoingOrders[index] });
  };

  const fetchOrders = async () => {
    const res = await orderService.getUserOrders();
    setOngoingOrders(res?.data.ongoing);
    setOrderHistory(res?.data.history);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchOrders);
    return unsubscribe;
  }, [ongoingOrders]);

  return (
    <View style={styles.container}>
      <HeaderBar color="black" title="Orders" />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveOrder("On going")}
          style={[styles.tab, activeOrder === "On going" && styles.activeTab]}
        >
          <Text>On going</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveOrder("History")}
          style={[styles.tab, activeOrder === "History" && styles.activeTab]}
        >
          <Text>History</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={activeOrder === "History" ? orderHistory : ongoingOrders}
        renderItem={({ item, index }: any) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("DetailOrder", {
                item:
                  activeOrder === "History"
                    ? orderHistory[index]
                    : ongoingOrders[index],
              })
            }
            style={styles.orderCard}
          >
            <View style={styles.orderInfo}>
              <View style={styles.orderRow}>
                <View style={styles.iconWrapper}>
                  <Box width={70} />
                </View>
                <View>
                  <View style={styles.statusRow}>
                    <Text>Status: </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        item.status === "Canceled" && styles.canceledBadge,
                      ]}
                    >
                      <Text>{item.status} </Text>
                      <Text>
                        Payment:{" "}
                        <Text
                          style={{
                            color:
                              item.paymentStatus === "Pending"
                                ? "red"
                                : "green",
                          }}
                        >
                          {item.paymentStatus}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <Text>Order#{item._id}</Text>
                  <Text>Date: {formatToVietnamTime(item.createdAt)}</Text>
                  <View style={styles.orderSummary}>
                    <Text>Items: {item.totalItems}</Text>
                    <Text>Price: {item.totalAmount.toFixed(2)}$</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.actionRow}>
              {activeOrder === "History" ? (
                <TouchableOpacity
                  onPress={() => handleReOrder(item)}
                  style={[styles.actionButton, styles.reorderButton]}
                >
                  <Text>Re-Order</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => handleTrackOrder(index)}
                    style={[styles.actionButton, styles.trackButton]}
                  >
                    <Text>Track order</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleCancelOrder(item._id)}
                    style={[styles.actionButton, styles.cancelButton]}
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default OderScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 60,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tab: {
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  activeTab: {
    borderBottomColor: "green",
  },
  orderCard: {
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    gap: 10,
  },
  orderInfo: {
    flexDirection: "row",
    gap: 10,
  },
  orderRow: {
    flexDirection: "row",
    gap: 10,
  },
  iconWrapper: {
    justifyContent: "center",
    backgroundColor: appColor.primary_light,
    borderRadius: 50,
    padding: 5,
  },
  statusRow: {
    flexDirection: "row",
  },
  statusBadge: {
    borderRadius: 5,
    flexDirection: "row",
    padding: 2,
    backgroundColor: "white",
  },
  canceledBadge: {
    backgroundColor: "red",
  },
  orderSummary: {
    flexDirection: "row",
    gap: 10,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  actionButton: {
    borderRadius: 10,
    padding: 5,
    minWidth: 90,
    alignItems: "center",
  },
  trackButton: {
    backgroundColor: appColor.primary_dark,
  },
  cancelButton: {
    borderColor: appColor.primary_dark,
    borderWidth: 1,
  },
  reorderButton: {
    borderColor: appColor.primary_dark,
    borderWidth: 1,
  },
});
