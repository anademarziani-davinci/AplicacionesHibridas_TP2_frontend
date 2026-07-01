const Pagination = ({ paginaActual, totalPaginas, onCambiarPagina }) => {
    if (totalPaginas <= 1) return null

    const paginas = []
    for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i)
    }

    return (
        <nav>
            <ul className="pagination justify-content-center mt-4">
                <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => onCambiarPagina(paginaActual - 1)}>Anterior</button>
                </li>
                {paginas.map(p => (
                    <li key={p} className={`page-item ${p === paginaActual ? "active" : ""}`}>
                        <button className="page-link" onClick={() => onCambiarPagina(p)}>{p}</button>
                    </li>
                ))}
                <li className={`page-item ${paginaActual === totalPaginas ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => onCambiarPagina(paginaActual + 1)}>Siguiente</button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination