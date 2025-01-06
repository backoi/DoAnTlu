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
  loadFavItems: () => Promise<void>;
  clearFavItems: () => Promise<void>;
}

const useUserStore = create<UserStore>((set, get) => ({
  favItems: [],

  toggleFavItem: (item: Item) => {
    set((state) => {
      const exists = state.favItems.some((favItem) => favItem.id === item.id);
      const updatedFavItems = exists
        ? state.favItems.filter((favItem) => favItem.id !== item.id)
        : [...state.favItems, item];
      // Save to local storage
      AsyncStorage.setItem("favItems", JSON.stringify(updatedFavItems));
      AsyncStorage.getItem("favItems").then((value) => console.log(value));
      console.log(exists ? "Xóa thành công" : "Thêm thành công");

      return {favItems: updatedFavItems };
    });
  },
  loadFavItems: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favItems');
      if (jsonValue) {
        const items = JSON.parse(jsonValue);
        set({ favItems: items });
      }
    } catch (error) {
      console.error('Error loading favorite items:', error);
    }
  },
  clearFavItems: async () => {
    try {
      await AsyncStorage.removeItem('favItems'); // Remove from AsyncStorage
      set({ favItems: [] }); // Reset Zustand state
    } catch (error) {
      console.error('Error clearing favorite items:', error);
    }
  },
}));

export default useUserStore;
