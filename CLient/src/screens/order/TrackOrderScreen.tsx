import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Progress } from '../../assets/svg';
import { ButtonComponent, Loading } from '../../components';
import { FlatList } from 'react-native';
import { orderService } from '../../utils/orderService';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/NavigationType';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const TrackOrderScreen = ({route}:any) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    // latitude: 21.007396659327345, // Vị trí giả định (Đại học Thuỷ Lợi)
    // longitude: 105.82473039547797,
    // latitudeDelta: 0.01,
    // longitudeDelta: 0.01,
  const {item}= route.params
  console.log('item',item)
  const [loading,setLoading]=useState(false)
  const [region, setRegion] = useState({
    latitude: 21.007396659, // Ví dụ: tọa độ San Francisco
    longitude: 105.8247303,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [routeCoordinates, setRouteCoordinates] = useState([
      { latitude: 21.007728, longitude: 105.824730395 },
      { latitude:21.023260, longitude:105.844145 },
      
  ]);
  const [driverLocation, setDriverLocation] = useState({
    latitude: 21.002396659,
    longitude: 105.824730395,
  });
  const [destination, setDestination] = useState({
    latitude: 21.023260,
    longitude: 105.844145
  })
const handleConfirmOrder=async()=>{
   Alert.alert(
        "Confirm received order?",
        "Are you sure you received order??",
        [
          { text: "No" },
          {
            text: "Yes",
            onPress: async () => {
              try {
                setLoading(true)
                const res = await orderService.updateStatus(item._id);
                console.log('res',res)
                setLoading(false)
                navigation.goBack()
              } catch (error:any) {
                setLoading(false)
                Alert.alert('Error',error.message)
              }
            },
          },
        ],
        { cancelable: false }
      );
 
 
}
  // useEffect(() => {
  //     // Giả lập cập nhật vị trí người giao hàng
  //     const intervalId = setInterval(() => {
  //         setDriverLocation(prevLocation => ({
  //             latitude: prevLocation.latitude + 0.0003, // Thay đổi nhỏ tọa độ
  //             longitude: prevLocation.longitude + 0.0003,
  //         }));
  //     }, 2000)
  //     return () => clearInterval(intervalId);
  // }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
      >
        <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="orange"/>
        <Marker coordinate={driverLocation} title="Driver">
            <Image source={require('../../assets/images/logo.png')} style={{width: 30, height: 30}} resizeMode="contain"/>
        </Marker>
        <Marker coordinate={destination} title="Destination">
            <Image source={require('../../assets/images/logo.png')} style={{width: 30, height: 30}} resizeMode="contain"/>
        </Marker>
      </MapView>
      <View style={styles.infoContainer}>
        <View style={styles.driverInfo}>
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/men/41.jpg',
            }}
            style={{width: 50, height: 50, borderRadius: 25}}
          />
          <View style={{marginLeft: 10}}>
            <Text>Cristopert Dastin</Text>
            <Text>ID 213752</Text>
          </View>
          <View style={styles.contactIcons}>
            <Icon name="comment" size={20} color="orange" style={{marginRight: 10}}/>
            <Icon name="phone" size={20} color="orange"/>
          </View>
        </View>
        <View style={styles.orderInfo}>
            <Text>Your Delivery Time</Text>
            <Text>Estimated 30 Minues</Text>
           
        </View>
        <View>
          <Image source={require('../../assets/images/progress.png')} resizeMode="cover"/>
        </View>
          <View>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Order Items:</Text>
            <View style={{marginBottom:20}}>
            <FlatList data={item.items} renderItem={({item}) => <Text>{item.productId?.name + ' x ' + item.quantityPurchased}</Text>}></FlatList>
            {/* {item.items.map((item: any) =>{
              return <Text key={item._id}>{item.productId?.name + ' x ' + item.quantityPurchased}</Text>
            } )} */}
            </View>
            <ButtonComponent title="Comfirm Received" onPress={handleConfirmOrder}/>
          </View>
      </View>
      <Loading visiable={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height * 0.5, // Chiếm 50% chiều cao màn hình
  },
  infoContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white',
      marginTop: -20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
  },
  driverInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
  },
  contactIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  orderInfo: {
    marginBottom: 20,
  }
});

export default TrackOrderScreen;
