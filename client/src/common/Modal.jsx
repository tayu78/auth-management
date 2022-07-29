import React from 'react'

const Modal = ({ setIsOpen , children}) => {
  
  const handleClick = (e) => {
    console.log("modal")
    if(e.currentTarget !== e.target ) return;
    setIsOpen(false);
    }
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-slate-400 bg-opacity-80 flex justify-center items-center'   onClick={handleClick} >
      <div className='w-2/3 h-2/3 bg-white rounded ' >
      <div className='flex justify-end  mr-5'><button className='text-2xl' onClick={handleClick} >x</button></div>
       {children}
        </div>
      </div>
  )
}

export default Modal