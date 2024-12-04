import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native';
import { create } from 'zustand'

interface CartItem{
  
   id:number,
   name:string,
   urlImg:string,
   price:number,
   quantity:number,
   stock:number,
   unit:string,
}
interface CartState{
  items:CartItem[],
  totalPrice:number,
  totalQuantity:number,
  addItem:(item:CartItem,quantity:number)=>void,
  increaseQuantity:(id:number)=>void,
  decreaseQuantity:(id:number)=>void,
  removeItem:(id:number)=>void,
  clearCart:()=>void
}
const useCartStore = create<CartState>((set,get) => ({
  items:[],
  totalPrice:0,
  totalQuantity:0,
  addItem:(product:CartItem,quantity=1)=>{
    set((state)=>{
      const existItem=state.items.find((it)=>it.id===product.id);
      if(existItem){
        if(existItem.quantity+1>existItem.stock){
          Alert.alert('qua so luong')
          return state
        }
        return{
          items:state.items.map((item)=>
            item.id==product.id?{...item,quantity:item.quantity+quantity}:item
          ),
          totalPrice:state.totalPrice + product.price,
          totalQuantiy:state.totalQuantity + product.quantity
        }
      }
      if(product.stock<=0){
        Alert.alert('Het hang')
        return state
      }
      return{
        items:[...state.items,{...product,quantity:1}],
        totalPrice:state.totalPrice + product.price,
        totalQuantity:state.totalQuantity + product.quantity,
      }
    })
    
    
    //console.log('add',get().items)
  },

  increaseQuantity:(id:number)=>{
    set((state) => {
      const updateProduct=state.items.map((item) =>
        item.id===id
            ? item.stock<item.quantity+1
                ? (Alert.alert("đã hết hàng"),item)
                : {...item,quantity:item.quantity+1}
            : item
      )
      
      return{
        items: updateProduct,
        totalPrice: updateProduct.reduce((sum,item)=>sum+item.price*item.quantity,0),
        totalQuantity: updateProduct.reduce((sum,item)=>sum+item.quantity,0)
      }
  });
  },
  decreaseQuantity:(id:number)=>{
    set((state) => {
      const updateItem=state.items.map((item) =>
        item.id === id ?{ ...item, quantity: item.quantity - 1 }: item)
      
      .filter(item=>item.quantity>0)
      
      return{
        items: updateItem,
        totalPrice: updateItem.reduce((sum,item)=>sum+item.price*item.quantity,0),
        totalQuantity: updateItem.reduce((sum,item)=>sum+item.quantity,0)
      }
  });
  },



  removeItem:(id:number)=>{
    set((state)=>{
      const updateItem=state.items.filter(item=>item.id!=id)
      return{
        items:updateItem,
        totalPrice:updateItem.reduce((sum,item)=>sum+item.price*item.quantity,0)
      }
    })
  },
  clearCart: () => set({ items: [], totalPrice: 0 }),
}))
export default useCartStore;