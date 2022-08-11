import React, {useState} from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';


import { SERVER_DOMAIN } from '../../../cons/Cons';
import useFetch from '../../../hooks/useFetch';
import FormInput from '../../../common/Form/FormInput';
import SelectDropDown from "../../../common/Select/SelectDropDown";



const UserMgmt = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("");

  const { data: users, fetchData: fetchUsers } = useFetch("users");
  const { data: roles } = useFetch("roles");

 const handleDelete = async (email) => {
  await axios.delete(`${SERVER_DOMAIN}/users/${email}`)
  await fetchUsers();
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${SERVER_DOMAIN}/users`, { name: userName,email: userEmail,password: userPassword,userRole});
    await fetchUsers();
  }

  
  return (
    <div className='w-2/3 m-auto border-2 p-16 mt-10'>
      <h1 className='text-3xl'>User Management</h1>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label htmlFor='user-name'>name</label>
          <input id='user-name' value={userName} onChange={e => setUserName(e.target.value)} className="input-text" />
        </div>
        <div className='mb-5'>
          <label htmlFor='user-email'>email</label>
          <input id='user-email' value={userEmail} onChange={e => setUserEmail(e.target.value)} className="input-text" />
        </div>
        <div className='mb-5'>
          <label htmlFor='role-name'>name</label>
          <input id='role-name' value={userPassword} onChange={e => setUserPassword(e.target.value)} className="input-text" />
        </div>

        <SelectDropDown selectedData={userRole} setSelectedData={setUserRole} selectOptions={roles} initialOption="Choose User Role here" />
        
        <div className='text-right'>
          <button  className='border-2 p-2 mt-5' type='submit'>Create User</button>
        </div>
      </form>

      <table className='mt-5 w-full border-y-2'>
        <thead className='border-y-2 text-left'>
              <th>name</th>
              <th>email</th>
              <th>role</th>
           </thead>
           <tbody>
            {users.map(user => {
              return (
                <tr key={user.id}  >
                  <td >{user.name}</td>
                  <td >{user.email}</td>
                  <td >{user.role ? user.role.name : "" }</td>
                  <td><DeleteIcon onClick={() => handleDelete(user.email)} className="hover:bg-slate-300 "  /></td>
                </tr>
              )
            })}
           </tbody>
         </table>
    </div>
  )
}

export default UserMgmt;