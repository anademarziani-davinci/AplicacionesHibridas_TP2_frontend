# Frontend — Portfolio de Clientes y Proyectos

Aplicación web en **React + Vite** que consume la API REST del backend (`../Api`). Permite registrarse e iniciar sesión (con email/contraseña o Google), y gestionar **clientes** y **proyectos** de un portfolio, con control de acceso por rol (`user` / `admin`).

## Stack

- **React 19** con componentes funcionales y hooks
- **Vite** (dev server y build)
- **React Router** para el enrutamiento de páginas
- **Context API** para la sesión y el token JWT
- **axios** para el consumo de la API (cliente centralizado con interceptores)
- **react-hook-form + yup** para formularios y validación
- **Bootstrap 5** para estilos y **react-toastify** para notificaciones
- **jwt-decode** para el login

## Requisitos

- Node.js 18 o superior
- El backend (`../Api`) corriendo (por defecto en `http://localhost:2026`)

## Variables de entorno

Crear un archivo `.env` en la raíz de `Frontend/` (ver `.env.example`):

```
VITE_API_URL=http://localhost:2026
```

- `VITE_API_URL`: URL base del backend.

## Cómo levantarlo

```bash
npm install       # instalar dependencias
npm run dev       # entorno de desarrollo (http://localhost:5173)
```

Otros scripts:

```bash
npm run build     # build de producción (carpeta dist/)
npm run preview   # previsualizar el build
npm run lint      # correr ESLint
```

## Estructura

```
src/
  main.jsx              Punto de entrada (RouterProvider + SessionProvider + GoogleOAuthProvider)
  routes/Router.jsx     Definición de rutas (createBrowserRouter)
  contexts/             SessionContext: estado global de sesión/token/rol
  services/             Capa de acceso a la API (axios): api, auth, clientes, proyectos
  schemas/              Esquemas de validación (yup)
  pages/                Vistas por dominio (auth, clientes, proyectos)
  components/           Layout, NavBar, ProtectedRoute y componentes atómicos (atoms/)
  utils/                Helpers (resolución de URLs de imágenes)
```

Las **vistas** (`pages/`) no llaman directamente a `axios`: usan la capa de **servicios** (`services/`), manteniendo la lógica de API separada de la UI.
