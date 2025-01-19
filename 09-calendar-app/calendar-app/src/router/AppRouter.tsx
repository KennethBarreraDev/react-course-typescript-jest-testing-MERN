import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../globals/hooks/useAuthStore";
import { USER_STATUS } from "../store/auth/authSlice";
import { Loader } from "../auth/components/Loader";


export const AppRouter = () => {
    const { status } = useAuthStore();

    if (status === USER_STATUS.CHECKING) {
        return <Loader />;
    }

    return (
        <Routes>
            {status === USER_STATUS.AUTHENTICATED ? (
                <>
                    <Route path="/*" element={<CalendarPage />} />
                </>
            ) : (
                <>
                    <Route path="/auth/*" element={<LoginPage />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
            )}
        </Routes>
    );
};
