import React from 'react'
import { Link } from 'react-router-dom';

 const MenuItem = ({url,title, icon}) => {
  return (
      <>
      <Link  to={url} className=' h-72 bg-white rounded-3xl text-center shadow-md' >
        {icon}
        {/* <span className='text-xs'>{title}</span> */}
      </Link>
      </>
  )
 }

export default MenuItem;
