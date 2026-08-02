import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import Layout from '../components/Layout'
import ProtectedRoute from '../components/ProtectedRoute'
import { Spinner } from '../components/atoms'

const InicioPage = lazy(() => import('../pages/InicioPage'))
const ProyectosPage = lazy(() => import('../pages/ProyectosPage'))
const ClientesPage = lazy(() => import('../pages/ClientesPage'))
const ClientePage = lazy(() => import('../pages/ClientePage'))
const Login = lazy(() => import('../pages/auth/Login'))
const Register = lazy(() => import('../pages/auth/Register'))
const Logout = lazy(() => import('../pages/auth/Logout'))
const Users = lazy(() => import('../pages/auth/Users'))
const NuevoProyecto = lazy(() => import('../pages/proyectos/NuevoProyecto'))
const EditarProyecto = lazy(() => import('../pages/proyectos/EditarProyecto'))
const NuevoCliente = lazy(() => import('../pages/clientes/NuevoCliente'))
const EditarCliente = lazy(() => import('../pages/clientes/EditarCliente'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

const withSuspense = (element) => <Suspense fallback={<Spinner mensaje="Cargando página..." />}>{element}</Suspense>

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <ProtectedRoute element={withSuspense(<InicioPage />)} rol={["user", "admin"]} /> },
      { path: "/proyectos", element: <ProtectedRoute element={withSuspense(<ProyectosPage />)} rol={["user", "admin"]} /> },
      { path: "/proyectos/nuevo", element: <ProtectedRoute element={withSuspense(<NuevoProyecto />)} rol={["user", "admin"]} /> },
      { path: "/proyectos/editar/:id", element: <ProtectedRoute element={withSuspense(<EditarProyecto />)} rol={["user", "admin"]} /> },
      { path: "/clientes", element: <ProtectedRoute element={withSuspense(<ClientesPage />)} rol={["user", "admin"]} /> },
      { path: "/clientes/nuevo", element: <ProtectedRoute element={withSuspense(<NuevoCliente />)} rol={["user", "admin"]} /> },
      { path: "/clientes/editar/:id", element: <ProtectedRoute element={withSuspense(<EditarCliente />)} rol={["user", "admin"]} /> },
      { path: "/clientes/:id", element: <ProtectedRoute element={withSuspense(<ClientePage />)} rol={["user", "admin"]} /> },
      { path: "/login", element: withSuspense(<Login />) },
      { path: "/register", element: withSuspense(<Register />) },
      { path: "/logout", element: withSuspense(<Logout />) },
      { path: "/users", element: <ProtectedRoute element={withSuspense(<Users />)} rol={["admin"]} /> },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
])

export default router