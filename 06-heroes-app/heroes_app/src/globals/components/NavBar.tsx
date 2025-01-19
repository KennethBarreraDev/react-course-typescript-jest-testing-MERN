import React, { useContext } from "react";
import { Link, NavLink, NavLinkRenderProps, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export const Navbar = React.memo(() => {
    let navigate = useNavigate();
      const {state, logout} = useContext(AuthContext)!

    const onLogout = ()=>{
        logout()
        navigate('/login', {replace: true})
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-1">
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink 
                        className={(props: NavLinkRenderProps) => props.isActive ? "nav-item nav-link active" : "nav-item nav-link"}
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>
                    <NavLink 
                        className={(props: NavLinkRenderProps) => props.isActive ? "nav-item nav-link active" : "nav-item nav-link"}
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink 
                        className={(props: NavLinkRenderProps) => props.isActive ? "nav-item nav-link active" : "nav-item nav-link"}
                        to="/search"
                    >
                        Search
                    </NavLink>

                    <NavLink 
                        className={(props: NavLinkRenderProps) => props.isActive ? "nav-item nav-link active" : "nav-item nav-link"}
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>
            
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ms-auto"> {/* Cambiado a ms-auto para Bootstrap 5 */}
                    <span className="nav-item nav-link text-primary">
                        {state.name}
                    </span>
                    <button className="nav-item nav-link btn" onClick={()=>onLogout()}>
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    );
})
