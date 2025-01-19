import { Navigate, Route, Routes } from 'react-router'
import { HomePage } from './HomePage'
import { LoginPage } from './LoginPage'
import { AboutPage } from './AboutPage'
import { NavBar } from './NavBar'
import { UserProvider } from './context/UserContext'

export const MainApp = () => {
    return (
        <>
            <UserProvider>
                <h1>Main App</h1>
                <hr />
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/*" element={<Navigate to='/login' />} />
                </Routes>
            </UserProvider>
        </>
    )
}
