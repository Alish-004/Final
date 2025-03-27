import { atom } from "recoil";

const user = atom({
    key:"user"
})


const isLogin  = atom({
    key:"isLogin",
    default:localStorage.getItem("token")?true:false
})


const role  = atom({
    key:"role",
    default:"USER"
})



export {isLogin,role}