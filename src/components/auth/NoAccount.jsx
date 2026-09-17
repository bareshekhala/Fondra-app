import { useContext } from "react"
import { AuthContext } from "@/context/auth.context.jsx"
import { Navigate } from "react-router-dom"

function NoAccount(props) {

  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn) {
    return <Navigate to="/dashboard"/>
  } else {
    return props.children
  }

}
export default NoAccount
