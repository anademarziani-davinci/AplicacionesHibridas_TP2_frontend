const ConfirmModal = ({ show, titulo, mensaje, onConfirmar, onCancelar }) => {
    if (!show) return null

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h2 className="modal-title fs-5 fw-bold">{titulo ?? "Confirmar acción"}</h2>
                            <button type="button" className="btn-close" onClick={onCancelar}></button>
                        </div>
                        <div className="modal-body text-muted">
                            {mensaje ?? "¿Estás seguro de realizar esta acción?"}
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={onConfirmar}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmModal