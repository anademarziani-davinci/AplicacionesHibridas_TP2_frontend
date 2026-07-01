import { useEffect, useState } from "react"
import { Link } from "react-router"
import * as apiClientes from "../services/clientes.services"
import { DataTable, ConfirmModal } from "../components/atoms"
import { Bounce, toast } from "react-toastify"
import { resolveImg } from "../utils/image"

const POR_PAGINA = 10

export default function ClientesPage() {
    const [clientes, setClientes] = useState([])
    const [pagina, setPagina] = useState(1)
    const [total, setTotal] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [busqueda, setBusqueda] = useState("")
    const [modalBorrar, setModalBorrar] = useState({ show: false, id: null, nombre: "" })

    const cargarClientes = (page = 1) => {
        apiClientes.obtenerClientes(page, POR_PAGINA).then(res => {
            setClientes(res.data)
            setTotal(res.total)
            setTotalPaginas(Math.ceil(res.total / POR_PAGINA))
            setPagina(res.page)
        }).catch(() => setClientes([]))
    }

    useEffect(() => { cargarClientes() }, [])

    const confirmarBorrar = () => {
        apiClientes.borrarCliente(modalBorrar.id)
            .then(() => {
                toast("Se eliminó  el cliente con éxito.", { transition: Bounce })
                setModalBorrar({ show: false, id: null, nombre: "" })
                cargarClientes(pagina)
            })
            .catch((err) => {
                toast.error("No se pudo eliminar el cliente seleccionado.")
            })
    }

    const clientesFiltrados = busqueda
        ? clientes.filter(c => c.nombre.toLowerCase().includes(busqueda.toLowerCase()))
        : clientes

    return (
        <section className="container mt-4">
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2 className="fw-bold text-dark mb-0">Clientes</h2>
                <Link to="/clientes/nuevo" className="btn btn-dark p-2 fw-semibold px-3">
                    <i className="fa-solid fa-plus me-2"></i>Nuevo
                </Link>
            </div>

            <DataTable
                columns={["ID", "Foto", "Nombre", "Descripción", "Opciones"]}
                busqueda={{ valor: busqueda, placeholder: "Buscar por cliente" }}
                onBuscar={setBusqueda}
                totalItems={total}
                paginaActual={pagina}
                totalPaginas={totalPaginas}
                onCambiarPagina={cargarClientes}
            >
                {clientesFiltrados.length > 0
                    ? clientesFiltrados.map((c, i) => (
                        <tr key={c._id}>
                            <td className="ps-4 fw-medium text-dark">{(pagina - 1) * POR_PAGINA + i + 1}</td>
                            <td>
                                {c.foto
                                    ? <img className="rounded-circle border avatar" src={resolveImg(c.foto)} alt={`Avatar de ${c.nombre}`} />
                                    : <div className="rounded-circle bg-light border d-inline-flex align-items-center justify-content-center avatar">—</div>
                                }
                            </td>
                            <td>{c.nombre}</td>
                            <td className="text-break">{c.descripcion}</td>
                            <td>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" data-bs-container="body">
                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><Link to={`/clientes/${c._id}`} className="dropdown-item text-dark"><i className="fa-regular fa-eye me-2"></i>Ver detalle</Link></li>
                                        <li><Link to={`/clientes/editar/${c._id}`} className="dropdown-item text-success"><i className="fa-regular fa-pen-to-square me-2"></i>Modificar</Link></li>
                                        <li><button className="dropdown-item text-danger" onClick={() => setModalBorrar({ show: true, id: c._id, nombre: c.nombre })}><i className="fa-regular fa-trash-can me-2"></i>Eliminar</button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))
                    : <tr><td colSpan="5" className="text-muted text-center">No se encontraron clientes.</td></tr>
                }
            </DataTable>

            <ConfirmModal
                show={modalBorrar.show}
                titulo="Eliminar cliente"
                mensaje={`¿Estás seguro de eliminar el cliente "${modalBorrar.nombre}"? Esta acción no se puede deshacer.`}
                onConfirmar={confirmarBorrar}
                onCancelar={() => setModalBorrar({ show: false, id: null, nombre: "" })}
            />
        </section>
    )
}