import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/home";
import SignUp from "./Pages/SignUp"
import Forgetpssword from "./Pages/ForgetPassword";
import Dashboard from "./Pages/Dashboard/Dashboard";
import About from "./Pages/about";
import Result from "./Pages/Result/Result";
import { Toaster } from "react-hot-toast";
import Navigation from "./Components/Navigation";
import 'react-toastify/dist/ReactToastify.css'
import Privateroute from "./Components/Privateroute";
import Contact from "./Pages/contact";
import NotFound from "./Pages/notFound";
import Signin from "./Pages/Signin/index";
import Footer from "./Components/footer";



const App = () => {

  return (
    <>
    <BrowserRouter>
    <Navigation />
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/sign-up" element={<SignUp />} />
     <Route path="/sign-in" element={<Signin />} />
     <Route path="/password-reset" element={<Forgetpssword />} />
     <Route path="/dash-board" element={<Privateroute />} >
      <Route path="/dash-board" element={<Dashboard />} />
     </Route>
     <Route path="/results/:id" element={<Result/>} />
     <Route path="/about" element={<About />} />
     <Route path="/contact" element={<Contact />} />
     <Route path="*" element={<NotFound />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
    <Toaster />
    </>
  )
}

export default App

