import React from 'react'

const RoleSelect = ({ defaultValue, onChange, onAsignar }) => {
  return (
    <td className="d-flex gap-2">
      <select
        className="form-select"
        defaultValue={defaultValue || ""}
        onChange={onChange}
      >
        <option value="" disabled></option>
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
      <button onClick={onAsignar} className="btn btn-warning">
        asignar
      </button>
    </td>
  )
}

export default RoleSelect