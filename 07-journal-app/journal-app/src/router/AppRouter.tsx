import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AuthStatus } from "../store/auth/authSlice";
import { useEffect } from "react";
import { CheckingAuth } from "../globals/ui/CheckingAuth";
import { getActiveUserSession } from "../store/auth/authThunks";
import { AppRoutes } from "../globals/routes";

export const AppRouter = () => {
  const loginStatus = useSelector((state: RootState) => state.auth.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserSessionThunk = getActiveUserSession()
    getUserSessionThunk(dispatch);
  }, [dispatch]);

  if (loginStatus === AuthStatus.CHECKING) {
    return (
      <CheckingAuth />
    );
  }

  return (
    <Routes>
      {loginStatus === AuthStatus.AUTHENTICATED ? (
        <Route path="/*" element={<JournalRoutes />} />

      ) : (
        <>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path='/*' element={<Navigate to={`/${AppRoutes.auth}/${AppRoutes.login}`}/>}/>
        </>
      )}

    </Routes>
  );
};
