import React from 'react'
import { useNavigate, Link } from 'react-router'
import { useLogin } from '../../contexts/SessionContext'
import { useAuthService } from '../../services/auth.service'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../../schemas/usuarios"
import { FormInput, PasswordInput } from '../../components/atoms'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const login = useLogin()
  const { login: loginService } = useAuthService()

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors }
  } = useForm({ mode: "onChange", resolver: yupResolver(loginSchema) })

  const email = watch("email")
  const password = watch("password")

  const onSubmit = async (formData) => {
    loginService({ email: formData.email, password: formData.password })
      .then(usuario => {
        login(usuario.token, usuario.email)
        navigate("/")
      })
      .catch(() => toast.error("Usuario o contraseña incorrectos."))
  }

  return (
    <div className="min-vh-100 background-green d-flex align-items-center justify-content-center p-3 ">
      <div className="bg-white shadow-lg p-4 p-md-5 login-box">
        <div className="text-center mb-4">
          <h1 className="fs-2 fw-bold mb-2">Proyectos</h1>
          <p className="text-muted mb-0">Ingresa a tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email"
            id="login-email"
            type="email"
            required
            icon="fa-regular fa-envelope"
            placeholder="usuario@ejemplo.com"
            labelClassName="form-label fw-medium text-dark small"
            inputClassName="bg-light border-start-0"
            register={register("email")}
            error={email?.length > 0 ? errors.email : undefined}
          />

          <PasswordInput
            label="Contraseña"
            id="login-password"
            required
            placeholder="********"
            labelClassName="form-label fw-medium text-dark small"
            inputClassName="bg-light border-start-0 border-end-0"
            register={register("password")}
            error={password?.length > 0 ? errors.password : undefined}
          />

          <button type="submit" className={`btn btn-dark w-100 py-2 mt-2 fw-semibold ${!isValid ? "disabled" : ""}`}>
            Ingresar
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted small">¿No tenés una cuenta? </span>
          <Link to="/register" className="link-custom small">Registrate acá</Link>
        </div>
      </div>
    </div>
  )
}

export default Login