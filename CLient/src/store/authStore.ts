import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'

interface AuthState{
    user:{
        username:string|null,
        email:string|null,
    }|null,
    token:string|null,
    isRemember:boolean,
    //isAuth:boolean,
    login:(user:{username:string,email:string},token:string)=>void
    logout:()=>void,
    setIsRemember:(val:boolean)=>void,
    loadStoredToken:()=>Promise<void>
}
const useAuthStore = create<AuthState>((set) => ({
  user:null,
  token:null,
  isRemember:false,
  //isAuth:false,
  login:async (user, token) =>{
    const state=useAuthStore.getState()
    if(state.isRemember){
        await AsyncStorage.setItem('authToken', token); // Lưu token vào AsyncStorage
    }
    set({
        user,token,
        //isAuth:true,
    })
  },
  logout:async()=> {
    await AsyncStorage.removeItem('authToken');
      set({user:null,token:null,
        //isAuth:false
      })
  },
  setIsRemember:(val)=>{
    set({isRemember:val})
  },
  loadStoredToken:async()=>{
    const storedToken = await AsyncStorage.getItem('authToken');
    if(storedToken)
        //fecth info from api token
        set({
            token:storedToken,
            isRemember:true,
            //isAuth:true,
    })
  }
}))
export default useAuthStore;