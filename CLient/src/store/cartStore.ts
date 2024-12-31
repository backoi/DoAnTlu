import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { create } from 'zustand';

interface CartItem {
  id: number;
  name: string;
  urlImg: string;
  price: number;
  quantity: number;
  stock: number;
  unit: string;
}

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  addItem: (item: CartItem, quantity: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  loadCartFromStorage: () => Promise<void>;
}



const saveCartToStorage = async (cartItems: CartItem[]) => {
  try {
    await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Failed to save cart to storage:', error);
  }
};

const loadCartFromStorage = async (): Promise<CartItem[]> => {
  try {
    const data = await AsyncStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load cart from storage:', error);
    return [];
  }
};

const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,

  addItem: (product: CartItem, quantity: number) => {
    set((state) => {
      const existItem = state.cartItems.find((it) => it.id === product.id);
      if (existItem) {
        if (existItem.quantity + quantity > existItem.stock) {
          Alert.alert('Quá số lượng');
          return state;
        }
        const updatedCartItems = state.cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        saveCartToStorage(updatedCartItems);
        return {
          cartItems: updatedCartItems,
          totalPrice: state.totalPrice + product.price * quantity,
          totalQuantity: state.totalQuantity + quantity,
        };
      }

      if (product.stock <= 0) {
        Alert.alert('Hết hàng');
        return state;
      }

      const newCartItems = [...state.cartItems, { ...product, quantity }];
      saveCartToStorage(newCartItems);
      return {
        cartItems: newCartItems,
        totalPrice: state.totalPrice + product.price * quantity,
        totalQuantity: state.totalQuantity + quantity,
      };
    });
  },

  increaseQuantity: (id: number) => {
    set((state) => {
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === id
          ? item.stock < item.quantity + 1
            ? (Alert.alert('Đã hết hàng'), item)
            : { ...item, quantity: item.quantity + 1 }
          : item
      );

      saveCartToStorage(updatedCartItems);

      return {
        cartItems: updatedCartItems,
        totalPrice: updatedCartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        totalQuantity: updatedCartItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    });
  },

  decreaseQuantity: (id: number) => {
    set((state) => {
      const updatedCartItems = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      saveCartToStorage(updatedCartItems);

      return {
        cartItems: updatedCartItems,
        totalPrice: updatedCartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        totalQuantity: updatedCartItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    });
  },

  removeItem: (id: number) => {
    set((state) => {
      const updatedCartItems = state.cartItems.filter((item) => item.id !== id);
      saveCartToStorage(updatedCartItems);
      return {
        cartItems: updatedCartItems,
        totalPrice: updatedCartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        totalQuantity: updatedCartItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    });
  },

  clearCart: () => {
    saveCartToStorage([]);
    set({ cartItems: [], totalPrice: 0, totalQuantity: 0 });
  },

  loadCartFromStorage: async () => {
    const cartItems = await loadCartFromStorage();
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    console.log('load cart successfully')
    set({ cartItems, totalPrice, totalQuantity });
  },
}));

export default useCartStore;
