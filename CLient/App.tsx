import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { ToastProvider } from "react-native-toast-notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import { StripeProvider } from "@stripe/stripe-react-native";
import { SplashScreen } from "./src/screens";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
Notifications.addNotificationReceivedListener((notification) => {
  console.log("Thông báo nhận được:", notification);
});
const registerForPushNotificationsAsync = async () => {
  // Kiểm tra quyền
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Permission for notifications not granted.");
    return null;
  }
};
export default function App() {
  const [isSplash, setIsSplash] = useState(true);
  useEffect(() => {
    registerForPushNotificationsAsync();
    const timer = setTimeout(() => {
      setIsSplash(false);
    }, 2000);

    // Dọn dẹp timer khi component unmount
    return () => clearTimeout(timer);
  }, []);
  return (
    <StripeProvider
      urlScheme="your-url-scheme"
      merchantIdentifier="merchant.identifier"
      publishableKey="pk_test_51QRxCpFWO9StdPGrHUJoiIrseSZeNsHxfzILLiGXPZQ1F05bm8Kvz5NzhBTtKvH83BRk37t3GhebOsVddX4jWkvq002GrA5Blx"
    >
      <GestureHandlerRootView>
        <ToastProvider>
          {isSplash ? (
            <SplashScreen />
          ) : (
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          )}
        </ToastProvider>
      </GestureHandlerRootView>
    </StripeProvider>
  );
}
