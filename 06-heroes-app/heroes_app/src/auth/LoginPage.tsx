import React, { useContext } from "react"
import { useNavigate } from "react-router"
import { AuthContext } from "../globals/context/AuthContext"

export const LoginPage = React.memo(() => {
  const {login} = useContext(AuthContext)!
  const navigate = useNavigate()
  const onLogin = ()=>{
    login('Osvaldo');
    navigate('/', {replace:  true})
  }
  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />
      <button className="btn btn-primary" onClick={()=>onLogin()}>
        Login
      </button>
    </div>
  )
})
