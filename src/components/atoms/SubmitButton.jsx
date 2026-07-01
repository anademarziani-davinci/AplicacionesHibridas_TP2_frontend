import React from 'react'

const SubmitButton = ({ label = "Ingresar", isDisabled = false }) => {
  return (
    <button className={`btn btn-primary w-100 ${isDisabled ? 'disabled' : ''}`}>
      {label}
    </button>
  )
}

export default SubmitButton