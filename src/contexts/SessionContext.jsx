import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const Session = createContext()

export function useSession() {
    return useContext(Session)
}

export function useUsuario() {
    const { usuario } = useSession()
    return usuario
}

export function useLogin() {
    const { onLogin } = useSession()
    return onLogin
}

export function useLogout() {
    const { onLogout } = useSession()
    return onLogout
}

export function useToken() {
    const { token } = useSession()
    return token
}

export function useRol() {
    const token = useToken()
    if (!token) return false
    try {
        const payload = jwtDecode(token)
        return payload?.rol || "user"
    } catch {
        return false
    }
}

export function SessionProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        try {
            const session = localStorage.getItem("session")
            return session ? JSON.parse(session).email : null
        } catch {
            return null
        }
    })
    const [token, setToken] = useState(localStorage.getItem("token") || "")

    const onLogin = (jwt, email) => {
        localStorage.setItem("session", JSON.stringify({ email: email }))
        localStorage.setItem("token", jwt)
        setUsuario(email)
        setToken(jwt)
    }

    const onLogout = () => {
        localStorage.clear()
        setUsuario(null)
        setToken("")
    }

    return (
        <Session.Provider value={{ usuario, token, onLogin, onLogout }}>
            {children}
        </Session.Provider>
    )
}