import { useEffect, useState } from "react"
import { useAuthService } from "../../services/auth.service"
import { DataTable, Select } from "../../components/atoms"
import { Bounce, toast } from "react-toastify"

const REGLAS_PASSWORD = [
    { test: (p) => p.length >= 8, mensaje: "Mínimo 8 caracteres" },
    { test: (p) => /[A-Z]/.test(p), mensaje: "Al menos una mayúscula" },
    { test: (p) => /[a-z]/.test(p), mensaje: "Al menos una minúscula" },
    { test: (p) => /[0-9]/.test(p), mensaje: "Al menos un número" },
    { test: (p) => /[@#$%&()=?-]/.test(p), mensaje: "Al menos un símbolo (@#$%&()=?-)" },
]

const Users = () => {
    const [usuarios, setUsuarios] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [modalRol, setModalRol] = useState({ show: false, id: null, email: "", rolActual: "", rolNuevo: "" })
    const [modalPass, setModalPass] = useState({ show: false, id: null, email: "", password: "", passwordConfirm: "", mostrar: false })
    const { getUsuarios, asignarRol, actualizarPassword } = useAuthService()

    useEffect(() => {
        getUsuarios()
            .then((data) => setUsuarios(data))
            .catch(err => console.log(err))
    }, [])

    const abrirModalRol = (usuario) => {
        setModalRol({
            show: true,
            id: usuario._id,
            email: usuario.email,
            rolActual: usuario.rol,
            rolNuevo: usuario.rol
        })
    }

    const confirmarCambioRol = () => {
        asignarRol(modalRol.id, modalRol.rolNuevo)
            .then(() => {
                setUsuarios(usuarios.map(u => modalRol.id === u._id ? { ...u, rol: modalRol.rolNuevo } : u))
                setModalRol({ show: false, id: null, email: "", rolActual: "", rolNuevo: "" })
                toast.success('Se cambió el rol con éxito.', { transition: Bounce })
            })
            .catch((err) => {
                toast.error("No se pudo actualizar la asginación del rol.")
            })
    }

    const abrirModalPass = (usuario) => {
        setModalPass({ show: true, id: usuario._id, email: usuario.email, password: "", passwordConfirm: "", mostrar: false })
    }

    const reglasCumplidas = REGLAS_PASSWORD.map(r => ({ mensaje: r.mensaje, cumple: r.test(modalPass.password) }))
    const passwordValida = reglasCumplidas.every(r => r.cumple)
    const passwordsCoinciden = modalPass.password.length > 0 && modalPass.password === modalPass.passwordConfirm
    const puedeGuardarPass = passwordValida && passwordsCoinciden

    const confirmarCambioPass = () => {
        if (!puedeGuardarPass) return
        actualizarPassword(modalPass.id, modalPass.password)
            .then(() => {
                setModalPass({ show: false, id: null, email: "", password: "", passwordConfirm: "", mostrar: false })
                toast.success('Se actualizó la contraseña con éxito.', { transition: Bounce })
            })
            .catch((err) => {
                toast.error("No se pudo actualizar la contraseña.")
            })
    }

    const usuariosFiltrados = busqueda
        ? usuarios.filter(u => u.email.toLowerCase().includes(busqueda.toLowerCase()))
        : usuarios

    return (
        <section className="container mt-4">
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2 className="fw-bold text-dark mb-0">Usuarios</h2>
            </div>

            <DataTable
                columns={["ID", "Email", "Rol", "Opciones"]}
                busqueda={{ valor: busqueda, placeholder: "Buscar por email" }}
                onBuscar={setBusqueda}
                totalItems={usuariosFiltrados.length}
                paginaActual={1}
                totalPaginas={1}
                onCambiarPagina={() => {}}
            >
                {usuariosFiltrados.length > 0
                    ? usuariosFiltrados.map((u, i) => (
                        <tr key={u._id}>
                            <td className="ps-4 fw-medium text-dark">{i + 1}</td>
                            <td>{u.email}</td>
                            <td><span className={`badge ${u.rol === "admin" ? "text-bg-danger" : "text-bg-primary"}`}>{u.rol}</span></td>
                            <td>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" data-bs-container="body">
                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><button className="dropdown-item text-success" onClick={() => abrirModalRol(u)}><i className="fa-regular fa-pen-to-square me-2"></i>Asignar rol</button></li>
                                        <li><button className="dropdown-item text-primary" onClick={() => abrirModalPass(u)}><i className="fa-solid fa-key me-2"></i>Cambiar contraseña</button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))
                    : <tr><td colSpan="4" className="text-muted text-center">No se encontraron usuarios.</td></tr>
                }
            </DataTable>

            {modalRol.show && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header border-0">
                                    <h2 className="modal-title fs-5 fw-bold">Asignar rol</h2>
                                    <button type="button" className="btn-close" onClick={() => setModalRol({ ...modalRol, show: false })}></button>
                                </div>
                                <div className="modal-body">
                                    <p className="text-muted mb-3">Cambiar el rol del usuario <strong>{modalRol.email}</strong></p>
                                    <Select
                                        label="Nuevo rol"
                                        id="rol-select"
                                        labelClassName="form-label fw-medium"
                                        wrapperClassName=""
                                        value={modalRol.rolNuevo}
                                        onChange={(e) => setModalRol({ ...modalRol, rolNuevo: e.target.value })}
                                        options={[{ value: "user", label: "user" }, { value: "admin", label: "admin" }]}
                                    />
                                </div>
                                <div className="modal-footer border-0">
                                    <button type="button" className="btn btn-secondary" onClick={() => setModalRol({ ...modalRol, show: false })}>Cancelar</button>
                                    <button
                                        type="button"
                                        className={`btn btn-success ${modalRol.rolNuevo === modalRol.rolActual ? "disabled" : ""}`}
                                        onClick={confirmarCambioRol}
                                    >Confirmar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {modalPass.show && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header border-0">
                                    <h2 className="modal-title fs-5 fw-bold">Cambiar contraseña</h2>
                                    <button type="button" className="btn-close" onClick={() => setModalPass({ ...modalPass, show: false })}></button>
                                </div>
                                <div className="modal-body">
                                    <p className="text-muted mb-3">Nueva contraseña para <strong>{modalPass.email}</strong></p>
                                    <label htmlFor="pass-input" className="form-label fw-medium">Contraseña</label>
                                    <div className="input-group">
                                        <input
                                            id="pass-input"
                                            type={modalPass.mostrar ? "text" : "password"}
                                            className="form-control"
                                            value={modalPass.password}
                                            onChange={(e) => setModalPass({ ...modalPass, password: e.target.value })}
                                            placeholder="Mínimo 8 caracteres"
                                        />
                                        <button
                                            type="button"
                                            className="input-group-text bg-light"
                                            onClick={() => setModalPass({ ...modalPass, mostrar: !modalPass.mostrar })}
                                        >
                                            <i className={`fa-solid ${modalPass.mostrar ? "fa-eye-slash" : "fa-eye"} text-muted`}></i>
                                        </button>
                                    </div>
                                    {modalPass.password.length > 0 && (
                                        <ul className="list-unstyled mt-2 mb-0">
                                            {reglasCumplidas.map((r, idx) => (
                                                <li key={idx} className={r.cumple ? "text-success" : "text-danger"}>
                                                    <i className={`fa-solid ${r.cumple ? "fa-circle-check" : "fa-circle-xmark"} me-1`}></i>
                                                    {r.mensaje}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <label htmlFor="pass-confirm-input" className="form-label fw-medium mt-3">Confirmar contraseña</label>
                                    <div className="input-group">
                                        <input
                                            id="pass-confirm-input"
                                            type={modalPass.mostrar ? "text" : "password"}
                                            className="form-control"
                                            value={modalPass.passwordConfirm}
                                            onChange={(e) => setModalPass({ ...modalPass, passwordConfirm: e.target.value })}
                                            placeholder="Repetí la contraseña"
                                        />
                                        <button
                                            type="button"
                                            className="input-group-text bg-light"
                                            onClick={() => setModalPass({ ...modalPass, mostrar: !modalPass.mostrar })}
                                        >
                                            <i className={`fa-solid ${modalPass.mostrar ? "fa-eye-slash" : "fa-eye"} text-muted`}></i>
                                        </button>
                                    </div>
                                    {modalPass.passwordConfirm.length > 0 && (
                                        <ul className="list-unstyled mt-2 mb-0">
                                            <li className={passwordsCoinciden ? "text-success" : "text-danger"}>
                                                <i className={`fa-solid ${passwordsCoinciden ? "fa-circle-check" : "fa-circle-xmark"} me-1`}></i>
                                                Las contraseñas deben ser iguales
                                            </li>
                                        </ul>
                                    )}
                                </div>
                                <div className="modal-footer border-0">
                                    <button type="button" className="btn btn-secondary" onClick={() => setModalPass({ ...modalPass, show: false })}>Cancelar</button>
                                    <button
                                        type="button"
                                        className={`btn btn-primary ${!puedeGuardarPass ? "disabled" : ""}`}
                                        onClick={confirmarCambioPass}
                                    >Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    )
}

export default Users