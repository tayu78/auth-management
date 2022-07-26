import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

import { SERVER_DOMAIN } from '../../cons/Cons';
import useFetch from '../../hooks/useFetch';
import MultipleSelectDropDown from '../../common/MultipleSelectDropDown';
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
    await axios.delete(`${SERVER_DOMAIN}/roles/${name}`)
    await fetchRoles();
  }

  useEffect(() => {
    console.log(roles)
  }, [roles]);

  

  return (
    <div className='w-2/3 m-auto border-2 p-16 mt-10'>
      <h1 className='text-3xl'>Role Management</h1>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label htmlFor='role-name'>name</label>
          <input id='role-name' value={roleName} onChange={e => setRoleName(e.target.value)} className="input-text" />
        </div>
        <div>
          {/* <select>
            {permissions.map((permission) => {
              return <option> {permission.name}</option>
            })}
          </select> */}
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
              {/* <th>permission</th> */}
              <th></th>
           </thead>
           <tbody>
             {roles.map((role) =>{
               {/* return <tr key={role.id}>
                 <td>{role.name}</td>
                 <td><button onClick={()=>handleDelete(role.name)}>delete</button></td>
               </tr> */}

               return <ExpandableRow key={role.id} endpoint={`roles/${role.name}`} >
                 <td>{role.name}</td>
                 <td><DeleteIcon onClick={() => handleDelete(role.name)} /></td>
               </ExpandableRow>
              }) }
             
           </tbody>
         </table>
    </div>
  )
 }

export default RoleMgmt;
