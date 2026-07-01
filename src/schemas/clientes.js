import * as yup from "yup"

const FORMATOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "image/gif"]
const MAX_SIZE = 5 * 1024 * 1024

export const crearClienteSchema = yup.object({
    nombre: yup.string().required("El nombre es obligatorio"),
    descripcion: yup.string().required("La descripción es obligatoria"),
    file: yup.mixed()
        .test("fileRequired", "La foto es obligatoria", (value) => {
            return value && value.length > 0
        })
        .test("fileFormat", "Solo se permiten imágenes (jpg, png, webp, gif)", (value) => {
            if (!value || value.length === 0) return true
            return FORMATOS_PERMITIDOS.includes(value[0]?.type)
        })
        .test("fileSize", "La foto no puede superar los 5MB", (value) => {
            if (!value || value.length === 0) return true
            return value[0]?.size <= MAX_SIZE
        })
})

export const editarClienteSchema = yup.object({
    nombre: yup.string().required("El nombre es obligatorio"),
    descripcion: yup.string().required("La descripción es obligatoria"),
    file: yup.mixed()
        .test("fileFormat", "Solo se permiten imágenes (jpg, png, webp, gif)", (value) => {
            if (!value || value.length === 0) return true
            return FORMATOS_PERMITIDOS.includes(value[0]?.type)
        })
        .test("fileSize", "La foto no puede superar los 5MB", (value) => {
            if (!value || value.length === 0) return true
            return value[0]?.size <= MAX_SIZE
        })
})