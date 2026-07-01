import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { editarProyectoSchema } from "../../schemas/proyectos"
import * as apiProyectos from "../../services/projectos.services"
import * as apiClientes from "../../services/clientes.services"
import { Bounce, toast } from "react-toastify"
import { resolveImg } from "../../utils/image"
import { FormInput, Select } from "../../components/atoms"

export default function EditarProyecto() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [clientes, setClientes] = useState([])
    const [clientesCargados, setClientesCargados] = useState(false)
    const [proyecto, setProyecto] = useState(null)
    const { register, handleSubmit, reset, watch, formState: { errors, isValid, isDirty } } = useForm({
        mode: "onChange",
        resolver: yupResolver(editarProyectoSchema)
    })

    const currentImg = watch("currentImg")

    useEffect(() => { apiClientes.obtenerClientes(1, 100).then(res => setClientes(res.data)).catch(() => setClientes([])).finally(() => setClientesCargados(true)) }, [])

    useEffect(() => { apiProyectos.obtenerProyecto(id).then(setProyecto).catch(err => console.error(err)) }, [id])

    useEffect(() => {
        if (!proyecto || !clientesCargados) return
        reset({
            name: proyecto.name,
            description: proyecto.description,
            currentImg: proyecto.img,
            link: proyecto.link,
            section: proyecto.section,
            technologies: (proyecto.technologies ?? []).join(", "),
            clienteId: proyecto.cliente?._id ?? ""
        })
    }, [proyecto, clientesCargados, reset])

    const onSubmit = async (data) => {
        const archivo = data.file?.[0] || null
        const proyecto = {
            name: data.name,
            description: data.description,
            link: data.link,
            section: data.section,
            technologies: data.technologies.split(",").map(t => t.trim()),
            cliente: data.clienteId ? { _id: data.clienteId } : undefined
        }
        apiProyectos.actualizarProyecto(id, proyecto, archivo)
            .then(() => {
                toast.success("Se actualizó el proyecto con éxito.", { transition: Bounce })
                navigate("/proyectos")
            })
            .catch((err) => {
                toast.error("No se pudo actualizar el proyecto.")
            })
    }

    return (
        <section className="container mt-4">
            <h2 className="mb-4">Editar Proyecto</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput label="Nombre" id="edit-name" required register={register("name")} error={errors.name} />
                <FormInput label="Descripción" id="edit-description" as="textarea" required register={register("description")} error={errors.description} />
                <div className="mb-3">
                    <label className="form-label">Imagen actual</label>
                    {currentImg && <img src={resolveImg(currentImg)} alt="Imagen actual" className="d-block rounded border card-img-cover mb-2" />}
                    <label htmlFor="edit-file" className="form-label">Reemplazar imagen</label>
                    <input id="edit-file" type="file" accept="image/*" className="form-control" {...register("file")} />
                    <small className="text-muted">Dejá vacío para mantener la imagen actual</small>
                </div>
                <FormInput label="Link" id="edit-link" register={register("link")} error={errors.link} />
                <FormInput label="Sección" id="edit-section" required register={register("section")} error={errors.section} />
                <FormInput label="Tecnologías (separadas por coma)" id="edit-technologies" required register={register("technologies")} error={errors.technologies} />
                <Select label="Cliente" id="edit-clienteId" wrapperClassName="mb-4" placeholder="Sin cliente" register={register("clienteId")} options={clientes.map(cliente => ({ value: cliente._id, label: cliente.nombre }))} />
                <div className="d-flex justify-content-end mt-3">
                    <button type="button" className="btn btn-secondary me-3" onClick={() => navigate("/proyectos")}>Cancelar</button>
                    <button className={`btn btn-success ${(!isValid || !isDirty) ? "disabled" : ""}`}>Guardar Cambios</button>
                </div>
            </form>
        </section>
    )
}