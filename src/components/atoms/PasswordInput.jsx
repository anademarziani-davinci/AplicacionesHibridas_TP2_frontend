import React, { useState } from 'react'

const PasswordInput = ({
  label,
  id,
  name,
  register,
  error,
  required = false,
  placeholder,
  icon = "fa-solid fa-lock",
  hideError = false,
  children,
  labelClassName = "form-label",
  inputClassName = "",
}) => {
  const [mostrar, setMostrar] = useState(false)

  const controlClass = `form-control ${error ? "is-invalid" : ""} ${inputClassName}`.trim()

  return (
    <div className='mb-3'>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
          {required && <span className='text-danger'> *</span>}
        </label>
      )}
      <div className='input-group'>
        {icon && (
          <span className='input-group-text bg-light border-end-0'>
            <i className={`${icon} text-muted`}></i>
          </span>
        )}
        <input
          id={id}
          name={name}
          type={mostrar ? "text" : "password"}
          placeholder={placeholder}
          className={controlClass}
          {...register}
        />
        <button
          type='button'
          className='input-group-text bg-light'
          onClick={() => setMostrar(!mostrar)}
        >
          <i className={`fa-solid ${mostrar ? "fa-eye-slash" : "fa-eye"} text-muted`}></i>
        </button>
      </div>
      {children}
      {!hideError && error && (
        <div className='invalid-feedback d-block'>{error.message}</div>
      )}
    </div>
  )
}

export default PasswordInput
