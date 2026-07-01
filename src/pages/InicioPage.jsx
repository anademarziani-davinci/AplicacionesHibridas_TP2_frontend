import { useEffect, useState } from "react"
import * as apiProyectos from "../services/projectos.services"
import * as apiClientes from "../services/clientes.services"
import { ProjectCard, ClienteCard, SectionHeader } from "../components/atoms"

export default function InicioPage() {
    const [clientes, setClientes] = useState([])
    const [proyectos, setProyectos] = useState([])

    useEffect(() => {
        apiProyectos.obtenerRecientes()
            .then(data => setProyectos(data))
            .catch(() => setProyectos([]))
 
        apiClientes.obtenerRecientes()
            .then(data => setClientes(data))
            .catch(() => setClientes([]))
    }, [])

    return (
        <div className="container mt-5">
            <section className="mb-5">
                <SectionHeader title="Últimos Proyectos" linkTo="/proyectos" />
                <div className="row g-3">
                    {proyectos.length > 0
                        ? proyectos.map(p => (
                            <div className="col-12 col-md-6 col-lg-4" key={p._id}>
                                <ProjectCard proyecto={p} />
                            </div>
                        ))
                        : <p className="text-muted">No hay proyectos.</p>
                    }
                </div>
            </section>

            <section className="mb-5">
                <SectionHeader title="Últimos Clientes" linkTo="/clientes" />
                <div className="row g-3">
                    {clientes.length > 0
                        ? clientes.map(c => (
                            <div className="col-12 col-md-6" key={c._id}>
                                <ClienteCard cliente={c} />
                            </div>
                        ))
                        : <p className="text-muted">No hay clientes.</p>
                    }
                </div>
            </section>
        </div>
    )
}