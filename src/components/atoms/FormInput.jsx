import React from 'react'

const FormInput = ({
  label,
  type = "text",
  id,
  name,
  register,
  error,
  required = false,
  placeholder,
  as = "input",
  rows = 3,
  accept,
  icon,
  labelClassName = "form-label",
  inputClassName = "",
  watchedValue,
}) => {
  const getValidationClass = () => {
    if (error) return "is-invalid"
    if (watchedValue && watchedValue.length > 0) return "is-valid"
    return ""
  }

  const controlClass = `form-control ${getValidationClass()} ${inputClassName}`.trim()

  const control = as === "textarea"
    ? (
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        className={controlClass}
        {...register}
      />
    )
    : (
      <input
        id={id}
        name={name}
        type={type}
        accept={accept}
        placeholder={placeholder}
        className={controlClass}
        {...register}
      />
    )

  return (
    <div className='mb-3'>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
          {required && <span className='text-danger'> *</span>}
        </label>
      )}
      {icon ? (
        <div className='input-group'>
          <span className='input-group-text bg-light border-end-0'>
            <i className={`${icon} text-muted`}></i>
          </span>
          {control}
        </div>
      ) : control}
      {error && (
        <div className={`invalid-feedback ${icon ? "d-block" : ""}`.trim()}>
          {error.message}
        </div>
      )}
    </div>
  )
}

export default FormInput
