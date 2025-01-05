import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface Item {
  id: number;
  name: string;
  urlImg: string;
  price: number;
}

interface UserStore {
  favItems: Item[];
  toggleFavItem: (item: Item) => void;
}
const items: Item[] =[]
const getFavItems = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("favItems");
    if(jsonValue){
      items.push(...JSON.parse(jsonValue));
      console.log("items", items);
    }
  } catch (e) {
    console.log(e);
    return [];
  }
}
getFavItems()
const useUserStore = create<UserStore>((set, get) => ({
  favItems: items,

  toggleFavItem: (item: Item) => {
    set((state) => {
      const exists = state.favItems.some((favItem) => favItem.id === item.id);
      const updatedFavItems = exists
        ? state.favItems.filter((favItem) => favItem.id !== item.id)
        : [...state.favItems, item];
      // Save to local storage
      AsyncStorage.setItem("favItems", JSON.stringify(updatedFavItems));
      
      console.log(exists ? "Xóa thành công" : "Thêm thành công");

      return { ...state, favItems: updatedFavItems };
    });
  },
}));

export default useUserStore;
