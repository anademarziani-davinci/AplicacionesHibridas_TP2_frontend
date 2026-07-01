import { Navigate } from "react-router"
import { useRol, useToken } from "../contexts/SessionContext"

const ProtectedRoute = ({element, rol}) => {
    const token = useToken()
    const rolUsuario = useRol()

    if( rol.includes(rolUsuario) && token) return element
    if( token ) return <Navigate to="/" />
    
    return <Navigate to="/login" />
}

export default ProtectedRoute