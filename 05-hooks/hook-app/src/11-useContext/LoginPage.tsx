import { useContext } from 'react'
import { UserContext } from './context/UserContext';

export const LoginPage = () => {
   const {user, handleLogin} = useContext(UserContext)!;
  return (
    <>
        <h1>Welcome {user?.email} from login</h1>
        <button className='btn btn-primary' onClick={()=>handleLogin()}>Login</button>
    </>
  )
}
