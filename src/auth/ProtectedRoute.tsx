import { Navigate, Outlet } from "react-router-dom";
import HeaderLayout from "../component/header";
import SidebarLayout from "../component/sidebar";

export const useAuth = () => {
    const userdata: any = localStorage.getItem("loginDetails") && JSON.parse(localStorage.getItem("loginDetails") || '');
    return userdata?.token ? { loggedIn: true, userdata } : { loggedIn: false, userdata };
};

export const ProtectedRouteCheck = ({ children }: any) => {
    const isAuth = useAuth();
    if (isAuth?.userdata?.Region?.id) {
        localStorage.setItem("regionalLevel", isAuth?.userdata?.Region?.id)
    }
    if (isAuth?.loggedIn) {
        return isAuth?.userdata?.role === 2 ? <Navigate to="/bucket-list" /> : isAuth?.userdata?.role === 1 ? <Navigate to="/regional-level" /> : <Navigate to="/sustainable" />
    } else {
        return children
    }
};

const ProtectedRoute = () => {
    const isAuth = useAuth().loggedIn;
    return isAuth ? <>
        <section className="insight_top_wrapper">
            <div className="main-section position-relative">
                <SidebarLayout />
                <HeaderLayout />
                <Outlet />
                
            </div>
        </section>
    </> : <Navigate to="/" />;
};
export default ProtectedRoute;
