import { atom } from "recoil";

const user = atom({
    key:"user"
})


const isLogin  = atom({
    key:"isLogin",
    default:localStorage.getItem("token")?true:false
})



export {isLogin}