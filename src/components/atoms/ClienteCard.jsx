import { Link } from "react-router"
import { resolveImg } from "../../utils/image"

const ClienteCard = ({ cliente }) => {
    return (
        <article className="card h-100 shadow-sm">
            <div className="card-body d-flex align-items-center gap-3">
                {cliente.foto
                    ? <img className="rounded-circle border avatar-md" src={resolveImg(cliente.foto)} alt={`Avatar de ${cliente.nombre}`} />
                    : <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center avatar-md-placeholder">?</div>
                }
                <div className="flex-grow-1">
                    <h3 className="h6 mb-1">{cliente.nombre}</h3>
                    <p className="text-muted small mb-0">{cliente.descripcion}</p>
                </div>
                <Link to={`/clientes/${cliente._id}`} className="btn btn-sm btn-outline-success">Ver</Link>
            </div>
        </article>
    )
}

export default ClienteCard