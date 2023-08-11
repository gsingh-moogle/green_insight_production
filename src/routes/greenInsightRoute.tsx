import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute, { ProtectedRouteCheck } from "../auth/ProtectedRoute";
import PrivateRoute from "../auth/PrivateRoute";
import LoginView from "../pages/login/LoginView";
import ErrorPage from "../pages/error";
import Dashboard from "../pages/dashboard"

const GreenInsightRoute = () => {

    return (
        <Router basename="/">
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRouteCheck>
                            <LoginView />
                        </ProtectedRouteCheck>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRouteCheck>
                            <Dashboard />
                        </ProtectedRouteCheck>
                    }
                />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<PrivateRoute roles={[2]} />}>
                        <Route path="/bucket-list" element={<Dashboard />} />
                    </Route>

                    <Route path="/" element={<PrivateRoute roles={[0, 1]} />}>
                        <Route path="/" element={<Dashboard />} />
                    </Route>
                </Route>
                <Route path="*" element={<ErrorPage />} />

            </Routes>

        </Router>
    );
}

export default GreenInsightRoute