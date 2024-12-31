import { StyleSheet, Switch, Text, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ButtonComponent, HeaderBar } from '../../components';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};

const NotificationScreen = (props: Props) => {
  const [isAllowed, setIsAllowed] = useState(false);

  // Đọc trạng thái từ AsyncStorage khi màn hình được tải
  useEffect(() => {
    const loadNotificationSettings = async () => {
      try {
        const savedSetting = await AsyncStorage.getItem('notificationAllowed');
        if (savedSetting !== null) {
          setIsAllowed(JSON.parse(savedSetting));
        }
      } catch (error) {
        console.error('Lỗi khi đọc cài đặt:', error);
      }
    };

    loadNotificationSettings();
  }, []);

  // Xử lý khi người dùng bật/tắt switch
  const handleToggleNotification = async (value: boolean) => {
    setIsAllowed(value);

    if (value) {
      // Yêu cầu quyền thông báo
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        setIsAllowed(false);
        Alert.alert('Thông báo', 'Bạn cần cấp quyền để nhận thông báo!');
      } else {
        // Bật thông báo
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
          }),
        });
      }
    } else {
      // Tắt thông báo
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: false,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
    }
  };

  // Xử lý khi người dùng nhấn "Save settings"
  const handleAllowNotification = async () => {
    try {
      await AsyncStorage.setItem('notificationAllowed', JSON.stringify(isAllowed));
      Alert.alert('Thành công', 'Cài đặt đã được lưu thành công!');
    } catch (error) {
      console.error('Lỗi khi lưu cài đặt:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lưu cài đặt.');
    }
  };

  return (
    <View style={{ flex: 1, margin: 10, justifyContent: 'space-between' }}>
      <View>
        <HeaderBar color="black" back title="Notification" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
          <View>
            <Text>Allow notifications</Text>
            <Text>Lorem ipsum dolor sit amet, consetetur</Text>
          </View>
          <View>
            <Switch value={isAllowed} onValueChange={handleToggleNotification} />
          </View>
        </View>
      </View>
      <ButtonComponent onPress={handleAllowNotification} title="Save settings" />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});