import { call, callUpload } from "./api.service"

export async function obtenerProyectos(nombre, seccion, page = 1, limit = 10) {
    const params = new URLSearchParams()
    if (nombre) params.append("nombre", nombre)
    if (seccion) params.append("seccion", seccion)
    params.append("page", page)
    params.append("limit", limit)
    return await call({ uri: `/api/proyectos?${params.toString()}`, method: "GET" })
}

export async function obtenerRecientes() {
    return await call({ uri: "/api/proyectos/recientes", method: "GET" })
}

export async function obtenerProyecto(id) {
    return await call({ uri: `/api/proyectos/${id}`, method: "GET" })
}

export async function crearProyecto(data, archivo) {
    if (archivo) {
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("link", data.link || "")
        formData.append("section", data.section)
        formData.append("technologies", JSON.stringify(data.technologies))
        if (data.cliente) formData.append("cliente", JSON.stringify(data.cliente))
        formData.append("file", archivo)
        return await callUpload({ uri: "/api/proyectos", method: "POST", formData })
    }
    return await call({ uri: "/api/proyectos", method: "POST", body: data })
}

export async function actualizarProyecto(id, data, archivo) {
    if (archivo) {
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("link", data.link || "")
        formData.append("section", data.section)
        formData.append("technologies", JSON.stringify(data.technologies))
        if (data.cliente) formData.append("cliente", JSON.stringify(data.cliente))
        formData.append("file", archivo)
        return await callUpload({ uri: `/api/proyectos/${id}`, method: "PATCH", formData })
    }
    return await call({ uri: `/api/proyectos/${id}`, method: "PATCH", body: data })
}

export async function borrarProyecto(id) {
    return await call({ uri: `/api/proyectos/${id}`, method: "DELETE" })
}