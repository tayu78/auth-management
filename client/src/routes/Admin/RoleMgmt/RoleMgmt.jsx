import React, { useState } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { SERVER_DOMAIN } from '../../../cons/Cons';
import useFetch from '../../../hooks/useFetch';
import FormInput from '../../../common/Form/FormInput';
import MultipleSelectDropDown from '../../../common/Select/MultipleSelectDropDown';
import ExpandableRow from '../../../common/Table/ExpandableRow';
import RoleUpdateModal from './RoleUpdateModal';
import PageContainer from '../../../common/PageContainer';



const RoleMgmt = () => {
  const [roleName, setRoleName] = useState("");
  const [updatingRole,setUpdatingRole] = useState({})
  const [selectedPermissions, setSelectedPermissions] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const { data: permissions } = useFetch("permissions");
  const { data: roles, fetchData: fetchRoles } = useFetch("roles");
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!roleName){return} //TODO: display error component
    await axios.post(`${SERVER_DOMAIN}/roles`, { name: roleName,selectedPermissions });
    await fetchRoles();
  }

  const handleEdit = (role) => {
    setUpdatingRole(role);
    setIsModalOpen(true);
  }

  const handleDelete = async (name) => {
    await axios.delete(`${SERVER_DOMAIN}/roles/${name}`);
    await fetchRoles();
  }

  
  return (
    <>
      <PageContainer title="Role Management" >
      <form className="mt-5" onSubmit={handleSubmit}>
          <FormInput label="name" value={roleName} handleChange={e => setRoleName(e.target.value)}  />
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
               return <ExpandableRow key={role.id} endpoint={`roles/${role.name}`} fetchTriggerData={role} >
                      <td className="w-5/6">{role.name}</td>
                      <td><EditIcon onClick={() => handleEdit(role)} /> <DeleteIcon className="hover:bg-slate-300 " onClick={() => handleDelete(role.name)} /></td>
               </ExpandableRow>
              }) }
           </tbody>
         </table>
      </PageContainer>
      {isModalOpen && <RoleUpdateModal setIsModalOpen={setIsModalOpen} permissions={permissions} updatingRole={updatingRole} fetchRoles={fetchRoles} />}
    </>
    
  )
 }

export default RoleMgmt;
