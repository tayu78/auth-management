import React, { useState } from 'react';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';

import { SERVER_DOMAIN } from '../../cons/Cons';
import useFetch from '../../hooks/useFetch';


const PermissionMgmt = () => {
  const [permissionName, setPermissionName] = useState("");
  
  const { data: permissions, fetchData: fetchPermissions } = useFetch("permissions");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!permissionName){return} //TODO: display error component
    await axios.post(`${SERVER_DOMAIN}/permissions`, { name: permissionName });
    await fetchPermissions();

    setPermissionName("");
  }
  

  const handleDelete = async (name) => {
    await axios.delete(`${SERVER_DOMAIN}/permissions/${name}`)
    await fetchPermissions();
  }
   
   return (
     <div className='w-2/3 m-auto border-2 p-16 mt-10'>
       <h1>PermissionMgmt</h1>
       <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>name</label>
             <input className='input-text' value={permissionName} onChange={e => setPermissionName(e.target.value)} />
           </div>
           <div className='text-right'>
            <button className='border-2 p-2 mt-5' type='submit'>Create Permission</button>
           </div>
         </form>
       </div>

       <div>
         <table className='mt-5 w-full border-y-2'>
           <thead className='border-y-2 text-left'>
             <th className='w-4/5' >name</th>
             <th ></th>
           </thead>
           <tbody>
             {permissions.map((permission) =>{
               return <tr key={permission.id}>
                 <td>{permission.name}</td>
                 <td className='text-center'><DeleteIcon onClick={()=>handleDelete(permission.name)} /></td>
               </tr>
              }) }
             
           </tbody>
         </table>
       </div>
    </div>
  )
}

export default PermissionMgmt;