import { call } from "./api.service"

export function useAuthService() {
    const login = (credenciales) =>
        call({ uri: "/api/usuarios/login", method: "POST", body: credenciales })

    const loginGoogle = (credential) =>
        call({ uri: "/api/usuarios/google", method: "POST", body: { credential } })

    const register = (email, password, passwordConfirm) =>
        call({ uri: "/api/usuarios", method: "POST", body: { email, password, passwordConfirm } })

    const getUsuarios = () =>
        call({ uri: "/api/usuarios", method: "GET" })

    const asignarRol = (id, rol) =>
        call({ uri: `/api/usuarios/${id}`, method: "POST", body: { rol } })

    const actualizarPassword = (id, password) =>
        call({ uri: `/api/usuarios/${id}/password`, method: "PATCH", body: { password } })

    return { login, register, getUsuarios, asignarRol, actualizarPassword }
}
