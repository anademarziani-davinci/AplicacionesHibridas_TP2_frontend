import { Link } from "react-router"
import { useRol, useUsuario } from "../contexts/SessionContext"

const NavBar = () => {
    const usuario = useUsuario()
    const rol = useRol()

    return (
        <nav className="navbar navbar-expand-lg background-green p-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <h1 className="fs-3 text text-white fw-semibold m-0">Proyectos</h1>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/proyectos">Proyectos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/clientes">Clientes</Link>
                        </li>
                        {rol === "admin" && (
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/users">Usuarios</Link>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item d-flex align-items-center">
                            <span className="navbar-text text-white me-3">{usuario}</span>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/logout">Cerrar sesión</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar