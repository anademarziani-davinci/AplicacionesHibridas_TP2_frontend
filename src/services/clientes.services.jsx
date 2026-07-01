import { call, callUpload } from "./api.service"

export async function obtenerClientes(page = 1, limit = 10) {
    const params = new URLSearchParams()
    params.append("page", page)
    params.append("limit", limit)
    return await call({ uri: `/api/clientes?${params.toString()}`, method: "GET" })
}

export async function obtenerRecientes() {
    return await call({ uri: "/api/clientes/recientes", method: "GET" })
}

export async function obtenerCliente(id) {
    return await call({ uri: `/api/clientes/${id}`, method: "GET" })
}

export async function crearCliente(data, archivo) {
    if (archivo) {
        const formData = new FormData()
        formData.append("nombre", data.nombre)
        formData.append("descripcion", data.descripcion)
        formData.append("file", archivo)
        return await callUpload({ uri: "/api/clientes", method: "POST", formData })
    }
    return await call({ uri: "/api/clientes", method: "POST", body: data })
}

export async function actualizarCliente(id, data, archivo) {
    if (archivo) {
        const formData = new FormData()
        formData.append("nombre", data.nombre)
        formData.append("descripcion", data.descripcion)
        formData.append("file", archivo)
        return await callUpload({ uri: `/api/clientes/${id}`, method: "PUT", formData })
    }
    return await call({ uri: `/api/clientes/${id}`, method: "PUT", body: data })
}

export async function borrarCliente(id) {
    return await call({ uri: `/api/clientes/${id}`, method: "DELETE" })
}