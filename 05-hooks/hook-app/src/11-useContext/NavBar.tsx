import { NavLink, NavLinkRenderProps } from "react-router"
export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className={(args: NavLinkRenderProps) => {
                                return `nav-link ${args.isActive ? 'active' : ''}`
                            }} to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={(args: NavLinkRenderProps) => {
                                return `nav-link ${args.isActive ? 'active' : ''}`
                            }}  to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={(args: NavLinkRenderProps) => {
                                return `nav-link ${args.isActive ? 'active' : ''}`
                            }}  to="/about">About</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
}
