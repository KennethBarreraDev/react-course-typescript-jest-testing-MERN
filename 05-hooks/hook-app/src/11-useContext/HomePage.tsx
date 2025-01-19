import { useContext } from "react";
import { UserContext } from "./context/UserContext";

export const HomePage = () => {
  const {user} = useContext(UserContext)!;
  return (
    <h1>Welcome {user?.email} from home page</h1>
  )
}
