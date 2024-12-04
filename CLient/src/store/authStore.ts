import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'

interface AuthState{
    user:{
        username?:string,
        email?:string,
        address?:AddressType[];
    },
    token:string,
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
  token:'',
  deliveryAddress:'',
  isRemember:false,
  isAuth:false,
  addAddress: async (newAddress:AddressType) => {
    const state=useAuthStore.getState()
    //console.log('gia tri user',state.user)
    AsyncStorage.setItem('authUser', JSON.stringify({user:state.user,token:state.token}));
   // AsyncStorage.setItem('a',JSON.stringify('bac'));

    //console.log('giá trị update:',updatedUser.address)
    set((state)=>({
      user: {
        ...state.user,
        address: state.user?.address? [newAddress,...state.user.address, ] : [newAddress],
      },
    }));
  },
  
  login:async (user1, token) =>{
    const state=useAuthStore.getState()
    if(state.isRemember){
        await AsyncStorage.setItem('authToken', token); // Lưu token vào AsyncStorage
    }
    set({
        user:user1,token,
        isAuth:true,
    })
  },
  logout:async()=> {
    await AsyncStorage.removeItem('authToken');
      set({user:{},token:'',
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
            token:storedToken,
            isRemember:true,
            isAuth:true,
    })
  },
}))
export default useAuthStore;