import { useRecoilState } from "recoil"
import { role } from "../store/atoms"
import { Route, Routes } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import LoginPage from "../pages/Login"
import HomePage from "../pages/home"
import Signup from "../pages/Signup"
import VehicleRental from "../pages/Vehicle"
import AboutUs from "../pages/Aboutus"
import ContactUs from "../pages/ContactUs"
import BlogPage from "../pages/Blog"
import UserProfile from "../pages/UserProfile"
import CarDetailPage from "../pages/CarDetails"
import Admin from "../pages/admin/AdminLayout"
import Dashboard from "../pages/admin/Dashboard"
import Customers from "../pages/admin/Customers"
import Vehicles from "../pages/admin/Vehicles"
import PaymentHistory from "../pages/admin/PaymentHistory"
import Settings from "../pages/admin/Settings"


function AppRoutes (){
    const [userRole, setUserRole] = useRecoilState(role)

    console.log(userRole)
   if(userRole=="USER"){

    return (
      <> 
      <Navbar />
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vehicle" element={<VehicleRental />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route  path="/cardetails/:carId" element={<CarDetailPage/>} ></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
       
      </Routes>
       <Footer/>
       </>
     
       
    )
   }
   else{
    return(
        <Routes>
              <Route path="/admin" element={<Admin />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="vehicles" element={< Vehicles/>} />
              <Route path="payment-history" element={<PaymentHistory />} />
              <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
    )
   }
      
}


export default AppRoutes;