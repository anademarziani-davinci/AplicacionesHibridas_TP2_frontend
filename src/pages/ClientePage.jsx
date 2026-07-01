import { useEffect, useState } from "react"
import * as apiClientes from "../services/clientes.services"
import { ProjectCard } from "../components/atoms"
import { useParams, useNavigate } from "react-router"
import { resolveImg } from "../utils/image"

export default function ClientePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [cliente, setCliente] = useState({})

    useEffect(() => {
        apiClientes.obtenerCliente(id).then(
            c => setCliente(c)
        ).catch(
            (error) => {
                setCliente({})
                console.error("Error al obtener cliente:", error)
            }
        )
    }, [id])

    return (
        <div className="container mt-4">
            <button className="btn mb-4" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left me-2"></i>Volver
            </button>
            <div className="row">
                <div className="col-12 col-md-3 text-center">
                    {cliente.foto
                        ? <img className="rounded-circle border w-100 avatar-lg" src={resolveImg(cliente.foto)} alt={`Avatar de ${cliente.nombre}`} />
                        : <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center w-100 avatar-lg-placeholder mx-auto">?</div>
                    }
                    <h2 className="mt-3">{cliente.nombre}</h2>
                    {cliente.descripcion && <p className="text-muted small">{cliente.descripcion}</p>}
                </div>

                <div className="col-12 col-md-9">
                    <h3 className="text-muted text-uppercase fw-medium mb-3 pb-2 border-bottom section-subtitle">
                        Proyectos
                    </h3>
                    <div className="row g-3">
                        {cliente.proyectos?.length > 0
                            ? cliente.proyectos.map(p => (
                                <div className="col-12 col-md-6 col-lg-4" key={p._id}>
                                    <ProjectCard proyecto={p} />
                                </div>
                            ))
                            : <p className="text-muted">No se encontraron proyectos.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}