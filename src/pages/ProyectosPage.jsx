import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import * as apiProyectos from "../services/projectos.services"
import { DataTable, ConfirmModal } from "../components/atoms"
import { Bounce, toast } from "react-toastify"
import { resolveImg } from "../utils/image"

const POR_PAGINA = 10

export default function ProyectosPage() {
    const navigate = useNavigate()
    const [proyectos, setProyectos] = useState([])
    const [secciones, setSecciones] = useState([])
    const [pagina, setPagina] = useState(1)
    const [total, setTotal] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [busqueda, setBusqueda] = useState("")
    const [seccion, setSeccion] = useState("")
    const [modalBorrar, setModalBorrar] = useState({ show: false, id: null, nombre: "" })

    const buscarProyectos = (nombre, sec, page = 1) => {
        apiProyectos.obtenerProyectos(nombre, sec, page, POR_PAGINA).then(res => {
            setProyectos(res.data)
            setTotal(res.total)
            setTotalPaginas(Math.ceil(res.total / POR_PAGINA))
            setPagina(res.page)
        }).catch(() => setProyectos([]))
    }

    useEffect(() => {
        buscarProyectos()
        apiProyectos.obtenerProyectos("", "", 1, 1000).then(res => {
            const unicas = [...new Set(res.data.map(p => p.section).filter(Boolean))]
            setSecciones(unicas)
        }).catch(() => {})
    }, [])

    const handleBuscar = (valor) => {
        setBusqueda(valor)
        buscarProyectos(valor, seccion, 1)
    }

    const handleSeccion = (e) => {
        const val = e.target.value
        setSeccion(val)
        buscarProyectos(busqueda, val, 1)
    }

    const confirmarBorrar = () => {
        apiProyectos.borrarProyecto(modalBorrar.id)
            .then(() => {
                toast.success("El proyecto se eliminó con éxito.", { transition: Bounce })
                setModalBorrar({ show: false, id: null, nombre: "" })
                buscarProyectos(busqueda, seccion, pagina)
            })
            .catch((err) => {
                toast.error("No se pudo eliminar el proyecto seleccionado.")
            })
    }

    const filtroSeccion = (
        <select className="form-select bg-light border-0 text-muted" value={seccion} onChange={handleSeccion}>
            <option value="">Todas las secciones</option>
            {secciones.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
    )

    return (
        <section className="container mt-4">
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2 className="fw-bold text-dark mb-0">Proyectos</h2>
                <button className="btn btn-dark p-2 fw-semibold px-3" onClick={() => navigate("/proyectos/nuevo")}>
                    <i className="fa-solid fa-plus me-2"></i>Nuevo
                </button>
            </div>

            <DataTable
                columns={["ID", "Imagen", "Nombre", "Sección", "Tecnologías", "Cliente", "Opciones"]}
                busqueda={{ valor: busqueda, placeholder: "Buscar por proyecto" }}
                onBuscar={handleBuscar}
                filtroExtra={filtroSeccion}
                totalItems={total}
                paginaActual={pagina}
                totalPaginas={totalPaginas}
                onCambiarPagina={(p) => buscarProyectos(busqueda, seccion, p)}
            >
                {proyectos.length > 0
                    ? proyectos.map((p, i) => (
                        <tr key={p._id}>
                            <td className="ps-4 fw-medium text-dark">{(pagina - 1) * POR_PAGINA + i + 1}</td>
                            <td>
                                <img src={resolveImg(p.img)} alt={`Imagen de ${p.name}`} className="rounded border img-project" />
                            </td>
                            <td>{p.name}</td>
                            <td><span className="badge text-bg-success">{p.section}</span></td>
                            <td>
                                <div className="d-flex flex-wrap gap-1">
                                    {(p.technologies ?? []).map(t => (
                                        <span className="badge bg-success-subtle text-success p-2" key={t}>{t}</span>
                                    ))}
                                </div>
                            </td>
                            <td>{p.cliente?.nombre ?? "—"}</td>
                            <td>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" data-bs-container="body">
                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><button className="dropdown-item text-success" onClick={() => navigate(`/proyectos/editar/${p._id}`)}><i className="fa-regular fa-pen-to-square me-2"></i>Modificar</button></li>
                                        <li><button className="dropdown-item text-danger" onClick={() => setModalBorrar({ show: true, id: p._id, nombre: p.name })}><i className="fa-regular fa-trash-can me-2"></i>Eliminar</button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))
                    : <tr><td colSpan="7" className="text-muted text-center">No se encontraron proyectos.</td></tr>
                }
            </DataTable>

            <ConfirmModal
                show={modalBorrar.show}
                titulo="Eliminar proyecto"
                mensaje={`¿Estás seguro de eliminar el proyecto "${modalBorrar.nombre}"? Esta acción no se puede deshacer.`}
                onConfirmar={confirmarBorrar}
                onCancelar={() => setModalBorrar({ show: false, id: null, nombre: "" })}
            />
        </section>
    )
}