import React from 'react'
import { Link } from 'react-router-dom';

 const MenuItem = ({url,title, icon}) => {
  return (
      <>
      <Link  to={url} className=' h-96 bg-slate-100 rounded-3xl' >
        <span>{title}</span>
        <span>{icon}</span>
      </Link>
      </>
  )
 }

export default MenuItem;
