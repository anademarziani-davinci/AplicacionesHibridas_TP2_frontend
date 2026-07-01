const DataTable = ({ columns, children, busqueda, onBuscar, totalItems, paginaActual, totalPaginas, onCambiarPagina, filtroExtra }) => {
    return (
        <div className="bg-white border shadow-sm rounded-3">
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div className="d-flex gap-2">
                    {filtroExtra}
                </div>
                <div className="input-group search-input-group">
                    <span className="input-group-text bg-light border-end-0">
                        <i className="fa-solid fa-magnifying-glass text-muted"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control bg-light border-start-0"
                        placeholder={busqueda?.placeholder ?? "Buscar..."}
                        value={busqueda?.valor ?? ""}
                        onChange={(e) => onBuscar?.(e.target.value)}
                    />
                </div>
            </div>

            <div className="datatable-scroll">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i} scope="col" className={`fw-semibold ${i === 0 ? "ps-4" : ""}`}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>

            <div className="p-3 border-top bg-white d-flex justify-content-between align-items-center flex-wrap gap-2">
                <span className="text-muted small">Mostrando {totalItems ?? 0} resultados</span>
                {totalPaginas > 1 && (
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
                                <button className="page-link text-dark" onClick={() => onCambiarPagina(paginaActual - 1)}>Anterior</button>
                            </li>
                            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(p => (
                                <li key={p} className={`page-item ${p === paginaActual ? "active" : ""}`}>
                                    <button className={`page-link ${p === paginaActual ? "bg-dark border-dark" : "text-dark"}`}
                                        onClick={() => onCambiarPagina(p)}>{p}</button>
                                </li>
                            ))}
                            <li className={`page-item ${paginaActual === totalPaginas ? "disabled" : ""}`}>
                                <button className="page-link text-dark" onClick={() => onCambiarPagina(paginaActual + 1)}>Siguiente</button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    )
}

export default DataTable