import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { crearClienteSchema } from "../../schemas/clientes"
import * as apiClientes from "../../services/clientes.services"
import { Bounce, toast } from "react-toastify"
import { FormInput } from "../../components/atoms"

export default function NuevoCliente() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(crearClienteSchema)
    })

    const onSubmit = async (data) => {
        const archivo = data.file?.[0]
        apiClientes.crearCliente(data, archivo)
            .then(() => {
                toast.success("Se creó el cliente con éxito.", { transition: Bounce })
                navigate("/clientes")
            })
            .catch((err) => {
                toast.error("No se pudo crear el nuevo cliente.")
            })
    }

    return (
        <section className="container mt-4">
            <h2 className="mb-4">Nuevo Cliente</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput label="Nombre" id="nombre" required register={register("nombre")} error={errors.nombre} />
                <FormInput label="Descripción" id="descripcion" as="textarea" required register={register("descripcion")} error={errors.descripcion} />
                <FormInput label="Foto" id="file" type="file" accept="image/*" required register={register("file")} error={errors.file} />
                <div className="d-flex justify-content-end mt-3">
                    <button type="button" className="btn btn-secondary me-3" onClick={() => navigate("/clientes")}>Cancelar</button>
                    <button className={`btn btn-success ${!isValid ? "disabled" : ""}`}>Crear Cliente</button>
                </div>
            </form>
        </section>
    )
}