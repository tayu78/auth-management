import React, { useState } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

import { SERVER_DOMAIN } from '../../cons/Cons';
import useFetch from '../../hooks/useFetch';
import MultipleSelectDropDown from '../../common/Select/MultipleSelectDropDown';
import ExpandableRow from '../../common/Table/ExpandableRow';



const RoleMgmt = () => {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState(null);


  const { data: permissions } = useFetch("permissions");
  const { data: roles, fetchData: fetchRoles } = useFetch("roles");
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!roleName){return} //TODO: display error component
    await axios.post(`${SERVER_DOMAIN}/roles`, { name: roleName,selectedPermissions });
    await fetchRoles();
  }

  const handleDelete = async (name) => {
    console.log("delete start")
    await axios.delete(`${SERVER_DOMAIN}/roles/${name}`);
    await fetchRoles();
  }

  

  

  return (
    <div className='w-2/3 m-auto border-2 p-16 mt-10'>
      <h1 className='text-3xl'>Role Management</h1>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label htmlFor='role-name'>name</label>
          <input id='role-name' value={roleName} onChange={e => setRoleName(e.target.value)} className="input-text" />
        </div>
        <div>
          <MultipleSelectDropDown
            options={permissions}
            keyName="name"
            setSelectedOptions={setSelectedPermissions}
          />
        </div>
        <div className='text-right'>
          <button  className='border-2 p-2 mt-5' type='submit'>Create Role</button>
        </div>
      </form>

      <table className='mt-5 w-full border-y-2'>
           <thead className='border-y-2 text-left'>
              <th >name</th>
              <th></th>
           </thead>
           <tbody>
             {roles.map((role) =>{
               return <ExpandableRow key={role.id} endpoint={`roles/${role.name}`} >
                 <td className="w-5/6">{role.name}</td>
                 <td><DeleteIcon className="hover:bg-slate-300 " onClick={() => handleDelete(role.name)} /></td>
               </ExpandableRow>
              }) }
             
           </tbody>
         </table>
    </div>
  )
 }

export default RoleMgmt;
