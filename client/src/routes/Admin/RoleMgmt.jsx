import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { SERVER_DOMAIN } from '../../cons/Cons';
import useFetch from '../../hooks/useFetch';


const RoleMgmt = () => {
  const [roleName, setRoleName] = useState("");

  const { data: permissions} = useFetch("permissions");

  

  return (
    <div className='w-2/3 m-auto border-2 p-16 mt-10'>
      <h1>Role Management</h1>
      <form>
        <div>
          <label htmlFor='role-name'>name</label>
          <input id='role-name' value={roleName} onChange={e => setRoleName(e.target.value)} className="input-text" />
        </div>
        <div>
          <select>
            {permissions.map((permission) => {
              return <option> {permission.name}</option>
            })}
          </select>
        </div>
       <button>Create Role</button>
      </form>
    </div>
  )
 }

export default RoleMgmt;
