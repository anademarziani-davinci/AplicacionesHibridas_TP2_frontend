import { Link } from "react-router"
import { resolveImg } from "../../utils/image"

const ClienteRow = ({ cliente, onBorrar }) => {
    return (
        <tr>
            <td>
                {cliente.foto
                    ? <img className="rounded-circle border avatar-sm" src={resolveImg(cliente.foto)} alt={`Avatar de ${cliente.nombre}`} />
                    : <div className="rounded-circle bg-light border d-inline-flex align-items-center justify-content-center avatar-sm">—</div>
                }
            </td>
            <td>{cliente.nombre}</td>
            <td>{cliente.descripcion}</td>
            <td>
                <div className="d-flex gap-1">
                    <Link to={`/clientes/${cliente._id}`} className="btn btn-sm btn-outline-success">Ver</Link>
                    <Link to={`/clientes/editar/${cliente._id}`} className="btn btn-sm btn-outline-warning">Editar</Link>
                    {onBorrar && <button className="btn btn-sm btn-outline-danger" onClick={() => onBorrar(cliente._id)}>Borrar</button>}
                </div>
            </td>
        </tr>
    )
}

export default ClienteRow