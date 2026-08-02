import { Link } from "react-router"

export default function NotFoundPage() {
    return (
        <div className="container mt-5 text-center">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-4 text-muted mb-4">La página que buscás no existe.</p>
            <Link to="/" className="btn btn-primary">Volver</Link>
        </div>
    )
}
