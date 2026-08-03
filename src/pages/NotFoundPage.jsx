import { Link } from "react-router"

export default function NotFoundPage() {
    return (
        <div className="container mt-5 text-center">
            <h2 className="display-1 fw-bold">404</h2>
            <p className="fs-4 text-muted mb-4">La página que buscás no existe.</p>
            <Link to="/" className="btn btn-dark w-100 py-2 mt-2 fw-semibold ">Volver</Link>
        </div>
    )
}
