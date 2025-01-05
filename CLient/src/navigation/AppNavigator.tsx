import React, { useEffect } from "react";
import AuthNavigator from "./AuthNavigator";
import useAuthStore from "../store/authStore";
import MainNavigator from "./MainNavigator";

const AppNavigator = () => {
  const { isAuth, loadStoredToken } =
    useAuthStore();
  useEffect(() => {
    loadStoredToken();
  }, [loadStoredToken]);

  return <>{isAuth ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default AppNavigator;
