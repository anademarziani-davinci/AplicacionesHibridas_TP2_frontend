import * as yup from "yup"

const FORMATOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "image/gif"]
const MAX_SIZE = 5 * 1024 * 1024

export const crearProyectoSchema = yup.object({
    name: yup.string().required("El nombre es obligatorio"),
    description: yup.string().required("La descripción es obligatoria"),
    link: yup.string().url("Debe ser una URL válida").nullable().optional(),
    section: yup.string().required("La sección es obligatoria"),
    technologies: yup.string().required("Las tecnologías son obligatorias"),
    clienteId: yup.string().optional(),
    file: yup.mixed()
        .test("fileRequired", "La imagen es obligatoria", (value) => {
            return value && value.length > 0
        })
        .test("fileFormat", "Solo se permiten imágenes (jpg, png, webp, gif)", (value) => {
            if (!value || value.length === 0) return true
            return FORMATOS_PERMITIDOS.includes(value[0]?.type)
        })
        .test("fileSize", "La imagen no puede superar los 5MB", (value) => {
            if (!value || value.length === 0) return true
            return value[0]?.size <= MAX_SIZE
        })
})

export const editarProyectoSchema = yup.object({
    name: yup.string().required("El nombre es obligatorio"),
    description: yup.string().required("La descripción es obligatoria"),
    link: yup.string().url("Debe ser una URL válida").nullable().optional(),
    section: yup.string().required("La sección es obligatoria"),
    technologies: yup.string().required("Las tecnologías son obligatorias"),
    clienteId: yup.string().optional(),
    file: yup.mixed()
        .test("fileFormat", "Solo se permiten imágenes (jpg, png, webp, gif)", (value) => {
            if (!value || value.length === 0) return true
            return FORMATOS_PERMITIDOS.includes(value[0]?.type)
        })
        .test("fileSize", "La imagen no puede superar los 5MB", (value) => {
            if (!value || value.length === 0) return true
            return value[0]?.size <= MAX_SIZE
        })
})