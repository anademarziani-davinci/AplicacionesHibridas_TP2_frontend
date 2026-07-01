const Spinner = ({ mensaje = "Cargando..." }) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center py-5">
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">{mensaje}</span>
            </div>
            <p className="mt-2 text-muted">{mensaje}</p>
        </div>
    )
}

export default Spinner