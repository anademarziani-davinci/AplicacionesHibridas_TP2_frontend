import React from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuthService } from '../../services/auth.service'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../../schemas/usuarios"
import { ValidationList, FormInput, PasswordInput } from '../../components/atoms'
import { toast } from 'react-toastify'

const Register = () => {
  const navigate = useNavigate()
  const { register: registroService } = useAuthService()
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors }
  } = useForm({ mode: "onChange", resolver: yupResolver(registerSchema) })

  const email = watch("email", "")
  const password = watch("password", "")
  const passwordConfirm = watch("passwordConfirm", "")

  const validacionesPassword = [
    { cumple: password?.length >= 8, mensaje: "Mínimo 8 caracteres" },
    { cumple: /[A-Z]/.test(password), mensaje: "Al menos una mayúscula" },
    { cumple: /[a-z]/.test(password), mensaje: "Al menos una minúscula" },
    { cumple: /[0-9]/.test(password), mensaje: "Al menos un número" },
    { cumple: /[@#$%&()=?-]/.test(password), mensaje: "Al menos un símbolo (@#$%&()=?-)" },
  ]

  const validacionesConfirm = [
    { cumple: password === passwordConfirm && password.length > 0 && passwordConfirm.length > 0, mensaje: "Las contraseñas deben ser iguales" },
  ]

  const onSubmit = async (formData) => {
    registroService(formData.email, formData.password, formData.passwordConfirm)
      .then(() => {
        toast.success("Usuario registrado con éxito. Iniciá sesión para continuar.")
        navigate("/login")
      })
      .catch(() => toast.error("No se pudo registrar el usuario."))
  }

  return (
    <div className="min-vh-100 background-green d-flex align-items-center justify-content-center p-3">
      <div className="bg-white shadow-lg p-4 p-md-5 register-box">
        <div className="text-center mb-4">
          <h1 className="fs-2 fw-bold mb-2">Proyectos</h1>
          <p className="text-muted mb-0">Registrate y comenzá a visualizar los proyectos</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Correo electrónico"
            id="register-email"
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
            id="register-password"
            required
            hideError
            placeholder="Mínimo 8 caracteres"
            labelClassName="form-label fw-medium text-dark small"
            inputClassName="bg-light border-start-0 border-end-0"
            register={register("password")}
          >
            {password.length > 0 && <ValidationList validaciones={validacionesPassword} />}
          </PasswordInput>
          <PasswordInput
            label="Confirmar Contraseña"
            id="register-passwordConfirm"
            required
            hideError
            placeholder="Repetí tu contraseña"
            labelClassName="form-label fw-medium text-dark small"
            inputClassName="bg-light border-start-0 border-end-0"
            register={register("passwordConfirm")}
          >
            {passwordConfirm.length > 0 && <ValidationList validaciones={validacionesConfirm} />}
          </PasswordInput>

          <button type="submit" className={`btn btn-dark w-100 py-2 fw-semibold my-3 ${!isValid ? "disabled" : ""}`}>
            Registrarme
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted small">¿Ya tenés una cuenta? </span>
          <Link to="/login" className="link-custom small">Iniciá sesión acá</Link>
        </div>
      </div>
    </div>
  )
}

export default Register