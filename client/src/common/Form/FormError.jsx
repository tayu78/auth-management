import React from 'react'

const FormError = ({error}) => {
  return (
      <p className='bg-red-300  text-center'>{error}</p>
  )
}

export default FormError