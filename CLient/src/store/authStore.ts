import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'

interface AuthState{
    user:{
        username?:string,
        email?:string,
        address?:AddressType[];
    },
    accessToken:string,
    deliveryAddress:string,
    isRemember:boolean,
    isAuth:boolean,
    login:(user:{username:string,email:string,address:any},token:string)=>void
    logout:()=>void,
    setIsRemember:(val:boolean)=>void,
    setDeliveryAddress:(adr:string)=>void,
    loadStoredToken:()=>Promise<void>
    addAddress:(newAddress:AddressType)=>void
}
interface AddressType{
    name:string,
    phone:string,
    address:string,
    city:string,
}
const useAuthStore = create<AuthState>((set) => ({
  user:{
    username:'',
    email:'',
    address:[],
  },
  accessToken:'',
  deliveryAddress:'',
  isRemember:false,
  isAuth:false,
  addAddress: async (newAddress:AddressType) => {
    const state=useAuthStore.getState()
    //console.log('gia tri user',state.user)
    AsyncStorage.setItem('authUser', JSON.stringify({user:state.user,accessToken:state.accessToken}));
   // AsyncStorage.setItem('a',JSON.stringify('bac'));

    //console.log('giá trị update:',updatedUser.address)
    set((state)=>({
      user: {
        ...state.user,
        address: state.user?.address? [newAddress,...state.user.address, ] : [newAddress],
      },
    }));
  },
  //removeAddress: async (newAddress:AddressType) => {} flatlist remove theo index
  login:async (user, accessToken) =>{
    const state=useAuthStore.getState()
    if(state.isRemember){
        await AsyncStorage.setItem('authToken', accessToken); // Lưu token vào AsyncStorage
    }
    set({
        user,accessToken,
        isAuth:true,
    })
  },
  logout:async()=> {
    await AsyncStorage.removeItem('authToken');
      set({user:{},accessToken:'',
        isAuth:false,
        isRemember:false,
      })
  },
  setIsRemember:(val)=>{
    set({isRemember:val})
  },
  setDeliveryAddress:(adr:string)=> {
    set({deliveryAddress:adr})
  },
  loadStoredToken:async()=>{
    const storedToken = await AsyncStorage.getItem('authToken');
    if(storedToken)
        //fecth info from api token
        set({
          accessToken:storedToken,
            isRemember:true,
            isAuth:true,
    })
  },
}))
export default useAuthStore;