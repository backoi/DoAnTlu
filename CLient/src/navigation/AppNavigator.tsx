import React, { useEffect } from "react";
import AuthNavigator from "./AuthNavigator";
import useAuthStore from "../store/authStore";
import MainNavigator from "./MainNavigator";
import useUserStore from "../store/userStore";

const AppNavigator = () => {
  const { isAuth, loadStoredToken } =
    useAuthStore();
  const {loadFavItems}=useUserStore()
  useEffect(() => {
    loadStoredToken();
    loadFavItems();
  }, [loadStoredToken]);

  return <>{isAuth ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default AppNavigator;
