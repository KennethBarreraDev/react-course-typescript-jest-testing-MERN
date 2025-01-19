import { useContext } from "react";
import { UserContext } from "./context/UserContext";

export const AboutPage = () => {
  const { user } = useContext(UserContext)!;
  return (
    <h1>Welcome {user?.email} from about page</h1>
  )
}
