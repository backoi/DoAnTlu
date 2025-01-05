export type RootStackParamList = {
    Auth:undefined,
    Tab:undefined,
    Main:undefined,
    Detail: { id: any },
    Welcome:undefined,
    Login:undefined,
    OnBoarding:undefined,
    SignUp:undefined,
    Forget:undefined,
    OTP:{code:any,email:any},
    ResetPass:undefined,
    Product:undefined,
    Search?:{text?:any,category?:any},
    Category:undefined,
    Review:{productId:any,},
    WriteReview:undefined,
    Payment:{cartItems:any,totalAmount:any,totalItems:any,deliveryAddress:any,coupon:any},
    AddAddress:undefined,
    OrderSuccess:undefined,
    DetailOrder:{item:any},
    Infor:undefined,
    TrackOrder:{item:any},
    Favorite:undefined,
    Coupon:undefined,
    BestSeller:undefined,
    Notification:undefined,
  };