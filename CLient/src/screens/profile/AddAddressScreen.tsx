import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { ButtonComponent, HeaderBar } from "../../components";
import useAuthStore from "../../store/authStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/NavigationType";
// Geocoder.init('AIzaSyAm4HeVm0wc69vvkBbHkNFb2BYuKjhD3hE')
const AddAddressScreen = () => {
  const [region, setRegion] = useState({
    latitude: 21.007396659327345, // Vị trí giả định (Đại học Thuỷ Lợi)
    longitude: 105.82473039547797,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
  });
  const { addAddress } = useAuthStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const handleRegionChange = (newRegion:any) => {
  //   setRegion(newRegion);
  //   Geocoder.from(newRegion.latitude, newRegion.longitude)
  //     .then((json) => {
  //       const formattedAddress = json.results[0].formatted_address;
  //       const addressComponents = json.results[0].address_components;
  //       console.log(addressComponents)
  //       // streetName = addressComponents.find((c) => c.types.includes('route'))?.long_name || '';
  //       //const postalCode = addressComponents.find((c) => c.types.includes('postal_code'))?.long_name || '';

  //       //setAddress(formattedAddress);
  //      // setStreet(streetName);
  //       //setPostCode(postalCode);
  //     })
  //     .catch((error) => console.warn(error));
  // };

  const handleAddAddress = async () => {
    const newAddr = {
      id: Date.now(),
      ...newAddress,
    };
    await addAddress(newAddr);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderBar color="black" title="Add new address"></HeaderBar>
      <MapView
        style={styles.map}
        initialRegion={region}
        //onRegionChangeComplete={handleRegionChange}
      >
        <Marker coordinate={region} draggable />
      </MapView>
      <View style={styles.form}>
        <TextInput
          onChangeText={(text) => setNewAddress({ ...newAddress, name: text })}
          style={styles.input}
          value={newAddress.name}
          placeholder="Name"
        />
        <TextInput
          onChangeText={(text) => setNewAddress({ ...newAddress, phone: text })}
          style={styles.input}
          value={newAddress.phone}
          placeholder="Phone"
        />

        <TextInput
          onChangeText={(text) =>
            setNewAddress({ ...newAddress, address: text })
          }
          style={styles.input}
          value={newAddress.address}
          placeholder="Address"
        />
        <TextInput
          style={styles.input}
          value={newAddress.district}
          onChangeText={(text) =>
            setNewAddress({ ...newAddress, district: text })
          }
          placeholder="District"
        />
        <View style={styles.saveSwitch}>
          <Switch style={{}}></Switch>
          <Text>Set default</Text>
        </View>

        <ButtonComponent
          onPress={handleAddAddress}
          title="Save Address"
        ></ButtonComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { fontSize: 18, fontWeight: "bold", textAlign: "center", margin: 10 },
  map: { flex: 1 },
  form: { padding: 20, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveSwitch: { flexDirection: "row", alignItems: "center" },
});

export default AddAddressScreen;
