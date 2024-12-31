// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { create } from 'zustand'

// interface AuthState{
//     user:{
//         username?:string,
//         email?:string,
//         address?:AddressType[];
//     },
//     accessToken:string,
//     deliveryAddress:string,
//     isRemember:boolean,
//     isAuth:boolean,
//     login:(user:{username:string,email:string,address:any},token:string)=>void
//     logout:()=>void,
//     setIsRemember:(val:boolean)=>void,
//     setDeliveryAddress:(adr:string)=>void,
//     loadStoredToken:()=>Promise<void>
//     addAddress:(newAddress:AddressType)=>void
// }
// interface AddressType{
//     name:string,
//     phone:string,
//     address:string,
//     district:string,
// }
// const useAuthStore = create<AuthState>((set) => ({
//   user:{
//     username:'',
//     email:'',
//     address:[],
//   },
//   accessToken:'',
//   deliveryAddress:'',
//   isRemember:false,
//   isAuth:false,
//   // addAddress: async (newAddress:AddressType) => {
//   //   const state=useAuthStore.getState()
//   //   //console.log('gia tri user',state.user)
//   //   //phai luu them gia tri moi vao user
//   //   AsyncStorage.setItem('authUser', JSON.stringify({user:state.user,accessToken:state.accessToken}));
//   //  // AsyncStorage.setItem('a',JSON.stringify('bac'));

//   //   //console.log('giá trị update:',updatedUser.address)
//   //   set((state)=>({
//   //     user: {
//   //       ...state.user,
//   //       address: state.user?.address? [newAddress,...state.user.address, ] : [newAddress],
//   //     },
//   //   }));
//   //   //luu o day
//   // },
//   addAddress: async (newAddress: AddressType) => {
//     const state = useAuthStore.getState();
  
//     // Thêm địa chỉ mới vào trạng thái Zustand
//     set((state) => {
//       const updatedUser = {
//         ...state.user,
//         address: state.user?.address ? [newAddress, ...state.user.address] : [newAddress],
//       };
  
//       // Lưu lại vào AsyncStorage
//       AsyncStorage.setItem(
//         'authUser',
//         JSON.stringify({ user: updatedUser, accessToken: state.accessToken })
//       );
  
//       return { user: updatedUser };
//     });
//   },
//   //removeAddress: async (newAddress:AddressType) => {} flatlist remove theo index
//   login:async (user, accessToken) =>{
//     const state=useAuthStore.getState()
//     if(state.isRemember){
//         await AsyncStorage.setItem('authToken', accessToken); // Lưu token vào AsyncStorage
//     }
//     await AsyncStorage.setItem('authUser', JSON.stringify({...user}));
//     set({
//         user,accessToken,deliveryAddress:user.address,
//         isAuth:true,
//     })
//   },
//   logout:async()=> {
//     await AsyncStorage.clear();
//     await AsyncStorage.removeItem('authToken');
//       set({user:{},accessToken:'',
//         isAuth:false,
//         isRemember:false,
//       })
//   },
//   setIsRemember:(val)=>{
//     set({isRemember:val})
//   },
//   setDeliveryAddress:(adr:string)=> {
//     set({deliveryAddress:adr})
//   },
//   loadStoredToken:async()=>{
//     const storedToken = await AsyncStorage.getItem('authToken');
//     if(storedToken)
//         //fecth info from api token
//         set({
//           accessToken:storedToken,
//             isRemember:true,
//             isAuth:true,
//     })
//   },
// }))
// export default useAuthStore;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface AddressType {
  name: string;
  phone: string;
  address: string;
  district: string;
}

interface AuthState {
  user: {
    username?: string;
    email?: string;
    address?: AddressType[];
  };
  accessToken: string;
  deliveryAddress: string;
  isRemember: boolean;
  isAuth: boolean;
  login: (user: { username: string; email: string; address: any }, token: string) => Promise<void>;
  logout: () => Promise<void>;
  setIsRemember: (val: boolean) => void;
  setDeliveryAddress: (adr: string) => void;
  loadStoredToken: () => Promise<void>;
  addAddress: (newAddress: AddressType) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: {
    username: '',
    email: '',
    address: [],
  },
  accessToken: '',
  deliveryAddress: '',
  isRemember: false,
  isAuth: false,

  login: async (user, accessToken) => {
    try {
      const state = useAuthStore.getState();
  
      if (state.isRemember) {
        await AsyncStorage.setItem('authToken', accessToken); // Lưu token
      }
  
      // Kiểm tra user trước khi lưu
      if (!user) {
        throw new Error('User object is null or undefined');
      }
      console.log('co chay xuong day')
      console.log('user',JSON.stringify(user))
      await AsyncStorage.setItem('authUser', JSON.stringify(user)); // Lưu user
      console.log('co chay xuong ca day nua')
  
      // Lấy dữ liệu đã lưu
      const storedUser = await AsyncStorage.getItem('authUser');
      console.log('Gia tri user trong async phia tren:', storedUser);
  
      // Cập nhật Zustand store
      set({
        user,
        accessToken,
        deliveryAddress: user.address?.[0]?.address || '',
        isAuth: true,
      });
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  },
  

  logout: async () => {
    await AsyncStorage.clear(); // Xóa toàn bộ dữ liệu
    set({
      user: {},
      accessToken: '',
      isAuth: false,
      isRemember: false,
      deliveryAddress: '',
    });
  },

  setIsRemember: (val) => {
    set({ isRemember: val });
  },

  setDeliveryAddress: (adr: string) => {
    set({ deliveryAddress: adr });
  },

  loadStoredToken: async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUser = await AsyncStorage.getItem('authUser');

      if (storedToken && storedUser) {
        const user = JSON.parse(storedUser);
        set({
          accessToken: storedToken,
          user,
          deliveryAddress: user.address?.[0]?.address || '',
          isRemember: true,
          isAuth: true,
        });
      }
    } catch (error) {
      console.error('Error loading stored token:', error);
    }
  },

  addAddress: async (newAddress: AddressType) => {
    const state = useAuthStore.getState();

    const updatedUser = {
      ...state.user,
      address: state.user.address ? [newAddress, ...state.user.address] : [newAddress],
    };

    await AsyncStorage.setItem(
      'authUser',
      JSON.stringify({ ...state.user, address: updatedUser.address })
    );

    set({ user: updatedUser });
  },
}));

export default useAuthStore;
