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
    Otp:{code:any,email:any},
    ResetPass:undefined,
    Product:undefined,
    Search?:{text?:any,category?:any},
    Category:undefined,
    Review:undefined,
    WriteReview:undefined,
  };