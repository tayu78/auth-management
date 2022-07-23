import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_DOMAIN } from '../../cons/Cons';
import useFetch from '../../hooks/useFetch';
import MultipleSelectDropDown from '../../common/MultipleSelectDropDown';


const RoleMgmt = () => {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState(null);


  const { data: permissions } = useFetch("permissions");
  const { data: roles,fetchData: fetchRoles } = useFetch("roles");

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
      <h1>Role Management</h1>
      <form onSubmit={handleSubmit}>
        <div>
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
       <button type='submit'>Create Role</button>
      </form>

      <table>
           <thead>
          <th>name</th>
          <th>permission</th>
          <th></th>
           </thead>
           <tbody>
             {roles.map((role) =>{
               return <tr key={role.id}>
                 <td>{role.name}</td>
                 {/* <td></td> */}
                 <td><button onClick={()=>handleDelete(role.name)}>delete</button></td>
               </tr>
              }) }
             
           </tbody>
         </table>
    </div>
  )
 }

export default RoleMgmt;
