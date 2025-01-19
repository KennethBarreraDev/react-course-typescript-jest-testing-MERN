import { Navigate, Route, Routes } from "react-router"
import { AppRoutes } from "../globals/routes"
import { CheckingAuth } from "../globals/ui/CheckingAuth"

export const LimboRoutes = () => {
  return (
    <Routes>
        <Route path={AppRoutes.loading} element={<CheckingAuth/>}/>
        <Route path='/*' element={<Navigate to={`/${AppRoutes.loading}`}/>}/>

    </Routes>
  )
}
