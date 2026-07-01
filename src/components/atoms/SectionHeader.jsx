import { Link } from "react-router"

const SectionHeader = ({ title, linkTo, linkText = "Ver todos" }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
            <h2 className="text-muted text-uppercase fw-medium mb-0 text fs-5">
                {title}
            </h2>
            {linkTo && <Link to={linkTo} className="text-decoration-none text-secondary medium">{linkText}</Link>}
        </div>
    )
}

export default SectionHeader