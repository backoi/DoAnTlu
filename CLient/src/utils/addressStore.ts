import AsyncStorage from '@react-native-async-storage/async-storage';

const addAddresses = async (newAddress:{name:string,phone: string,address:string,city:string}) => {
    try {
        const currentAddresses = await getAddresses();
        const updatedAddresses = [newAddress,...currentAddresses ];
        console.log("dia chi moi",updatedAddresses)
    const jsonValue = JSON.stringify(updatedAddresses);
    await AsyncStorage.setItem('addresses', jsonValue);
    console.log('Addresses saved successfully!');
  } catch (e) {
    console.error('Failed to save addresses:', e);
  }
};

const getAddresses = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('addresses');
    console.log(jsonValue)
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch addresses:', e);
    return [];
  }
};
const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('addresses');
      console.log('đã xoá')
    } catch(e) {
        console.error('Failed to remove addresses:', e);
    }
  }
export{addAddresses,getAddresses,removeValue}