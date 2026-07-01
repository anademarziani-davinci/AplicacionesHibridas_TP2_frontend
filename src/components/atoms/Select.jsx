import React from 'react'

const Select = ({
  label,
  id,
  register,
  error,
  required = false,
  options = [],
  placeholder,
  value,
  onChange,
  defaultValue,
  wrapperClassName = "mb-3",
  labelClassName = "form-label",
}) => {
  const control = register ? { ...register } : { value, onChange, defaultValue }

  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
          {required && <span className='text-danger'> *</span>}
        </label>
      )}
      <select id={id} className={`form-select ${error ? "is-invalid" : ""}`} {...control}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <div className='invalid-feedback'>{error.message}</div>}
    </div>
  )
}

export default Select
