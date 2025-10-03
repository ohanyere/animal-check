import { Outlet, Navigate } from "react-router-dom";
import useAuthStatusChange from "../hooks/useAuthStatusChange";
import Htext from "../utltis/Htext";

const Privateroute = () => {
    const {checkingStatus, authStatus} = useAuthStatusChange()

    if(checkingStatus){
        return <Htext className="flex justify-center items-center font-semibold text-lg h-screen animate-pulse">loading...</Htext>
    }
    return  authStatus ? <Outlet /> : <Navigate to="/sign-in"/>;
}
 
export default Privateroute;