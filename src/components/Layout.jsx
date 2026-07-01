import { Outlet } from "react-router"
import NavBar from "./NavBar"
import { Bounce, ToastContainer } from 'react-toastify'
import { useUsuario } from "../contexts/SessionContext"

const Layout = () => {
    const usuario = useUsuario()

    return (
        <div className="container-fluid px-0">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            {usuario && <NavBar />}
            <Outlet />
        </div>
    )
}

export default Layout