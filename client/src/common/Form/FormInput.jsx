import React from 'react'

const FormInput = ({label,value,handleChange}) => {
  return (
    <div>
          <label>{label}</label>
        <input className='input-text' value={value} onChange={handleChange} />
   </div>
  )
}

export default FormInput