import { Link } from "react-router"
import { resolveImg } from "../../utils/image"

export default function ProjectCard({ proyecto }) {
    return (
        <article className="card h-100 shadow-sm">
            <div className="position-relative">
                <img src={resolveImg(proyecto.img)} alt={`Imagen del proyecto ${proyecto.name}`} className="card-img-top card-img-cover" />
                <span className="badge bg-light text-secondary position-absolute top-0 end-0 m-2 border">
                    {proyecto.section}
                </span>
            </div>
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-1">
                    <h3 className="card-title h6 mb-0">
                        <a className="text-decoration-none text-dark" href={proyecto.link ?? "#"}>{proyecto.name}</a>
                    </h3>
                    <small className="text-muted">#{proyecto._id?.toString().slice(-5)}</small>
                </div>
                <p className="card-text text-muted small mb-2">{proyecto.description}</p>
                <div className="d-flex flex-wrap gap-1 mb-2">
                    {(proyecto.technologies ?? []).map(tech => (
                        <span className="badge bg-success-subtle text-success p-2" key={tech}>{tech}</span>
                    ))}
                </div>
                {proyecto.cliente && (
                    <div className="d-flex align-items-center gap-2 pt-2 mt-auto border-top">
                        <img src={resolveImg(proyecto.cliente.foto)} alt={`Avatar de ${proyecto.cliente.nombre}`}
                            className="rounded-circle border avatar-sm" />
                        <small className="text-muted fw-medium">{proyecto.cliente.nombre}</small>
                    </div>
                )}
            </div>
        </article>
    )
}