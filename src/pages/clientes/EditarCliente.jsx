import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { editarClienteSchema } from "../../schemas/clientes"
import * as apiClientes from "../../services/clientes.services"
import { Bounce, toast } from "react-toastify"
import { resolveImg } from "../../utils/image"
import { FormInput } from "../../components/atoms"

export default function EditarCliente() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, reset, watch, formState: { errors, isValid, isDirty } } = useForm({
        mode: "onChange",
        resolver: yupResolver(editarClienteSchema)
    })

    const currentFoto = watch("currentFoto")

    useEffect(() => {
        apiClientes.obtenerCliente(id).then(c => {
            reset({ nombre: c.nombre, descripcion: c.descripcion, currentFoto: c.foto })
        }).catch(err => console.error(err))
    }, [id])

    const onSubmit = async (data) => {
        const archivo = data.file?.[0] || null
        apiClientes.actualizarCliente(id, data, archivo)
            .then(() => {
                toast.success("Se actualizó el cliente con éxito.", { transition: Bounce })
                navigate("/clientes")
            })
            .catch((err) => {
                toast.error("No se pudo actualizar editar el cliente.")
            })
    }

    return (
        <section className="container mt-4">
            <h2 className="mb-4">Editar Cliente</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput label="Nombre" id="edit-nombre" required register={register("nombre")} error={errors.nombre} />
                <FormInput label="Descripción" id="edit-descripcion" as="textarea" required register={register("descripcion")} error={errors.descripcion} />
                <div className="mb-3">
                    <label className="form-label">Foto actual</label>
                    {currentFoto && <img src={resolveImg(currentFoto)} alt="Foto actual" className="d-block rounded-circle border avatar-md mb-2" />}
                    <label htmlFor="edit-file" className="form-label">Reemplazar foto</label>
                    <input id="edit-file" type="file" accept="image/*" className="form-control" {...register("file")} />
                    <small className="text-muted">Dejá vacío para mantener la foto actual</small>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <button type="button" className="btn btn-secondary me-3" onClick={() => navigate("/clientes")}>Cancelar</button>
                    <button className={`btn btn-success ${(!isValid || !isDirty) ? "disabled" : ""}`}>Guardar Cambios</button>
                </div>
            </form>
        </section>
    )
}