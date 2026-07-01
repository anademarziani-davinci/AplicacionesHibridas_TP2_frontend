import { Navigate } from "react-router"
import { useLogout } from "../../contexts/SessionContext"
import { useEffect } from "react"

const Logout = () => {
    const logout = useLogout()

    useEffect( () => logout(), [] )

    return <Navigate to="/login" />
}

export default Logout