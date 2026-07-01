import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { crearProyectoSchema } from "../../schemas/proyectos"
import * as apiProyectos from "../../services/projectos.services"
import * as apiClientes from "../../services/clientes.services"
import { Bounce, toast } from "react-toastify"
import { FormInput, Select } from "../../components/atoms"

export default function NuevoProyecto() {
    const navigate = useNavigate()
    const [clientes, setClientes] = useState([])
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(crearProyectoSchema)
    })

    useEffect(() => {
        apiClientes.obtenerClientes(1, 100).then(res => setClientes(res.data)).catch(() => setClientes([]))
    }, [])

    const onSubmit = async (data) => {
        const archivo = data.file?.[0]
        const proyecto = {
            name: data.name,
            description: data.description,
            link: data.link,
            section: data.section,
            technologies: data.technologies.split(",").map(t => t.trim()).filter(Boolean),
            cliente: data.clienteId ? { _id: data.clienteId } : undefined
        }
        apiProyectos.crearProyecto(proyecto, archivo)
            .then(() => {
                toast.success("Se creó el proyecto con éxito.", { transition: Bounce })
                navigate("/proyectos")
            })
            .catch((err) => {
                toast.error("No se pudo crear el nuevo proyecto.")
            })
    }

    return (
        <section className="container mt-4">
            <h2 className="mb-4">Nuevo Proyecto</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput label="Nombre" id="name" required register={register("name")} error={errors.name} />
                <FormInput label="Descripción" id="description" as="textarea" required register={register("description")} error={errors.description} />
                <FormInput label="Imagen" id="file" type="file" accept="image/*" required register={register("file")} error={errors.file} />
                <FormInput label="Link" id="link" register={register("link")} error={errors.link} />
                <FormInput label="Sección" id="section" required register={register("section")} error={errors.section} />
                <FormInput label="Tecnologías (separadas por coma)" id="technologies" placeholder="React, Node, MongoDB" required register={register("technologies")} error={errors.technologies} />
                <Select
                    label="Cliente"
                    id="clienteId"
                    wrapperClassName="mb-4"
                    placeholder="Sin cliente"
                    register={register("clienteId")}
                    options={clientes.map(c => ({ value: c._id, label: c.nombre }))}
                />
                <div className="d-flex justify-content-end mt-3">
                    <button type="button" className="btn btn-secondary me-3" onClick={() => navigate("/proyectos")}>Cancelar</button>
                    <button className={`btn btn-success ${!isValid ? "disabled" : ""}`}>Crear Proyecto</button>
                </div>
            </form>
        </section>
    )
}