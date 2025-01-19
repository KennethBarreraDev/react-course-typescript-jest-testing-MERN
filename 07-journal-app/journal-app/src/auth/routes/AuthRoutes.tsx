import { Route, Routes } from "react-router"
import { AppRoutes } from "../../globals/routes"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path={AppRoutes.login} element={<LoginPage/>}/>
        <Route path={AppRoutes.register} element={<RegisterPage/>}/>

    </Routes>
  )
}
