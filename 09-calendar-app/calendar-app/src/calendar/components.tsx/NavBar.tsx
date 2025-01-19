import { useAuthStore } from "../../globals/hooks/useAuthStore"

export const NavBar = () => {
  const {user, startLogOut} = useAuthStore()
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt me-4"></i>

        {user.username}
      </span>
      <button className="btn btn-outline-danger" onClick={()=>startLogOut()}>

        <i className="fas fa-sign-out-alt"></i>
        <span>Salir</span>
      </button>
    </div>
  )
}
