import React, { useState } from 'react';
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { SERVER_DOMAIN } from '../../../cons/Cons';
import useFetch from '../../../hooks/useFetch';
import PermissionUpdateModal from './PermissionUpdateModal';
import FormInput from '../../../common/Form/FormInput';
import FormSubmitBtn from '../../../common/Form/FormSubmitBtn';
import PageContainer from '../../../common/PageContainer';



const PermissionMgmt = () => {
  const [permissionName, setPermissionName] = useState("");
  const [updatingPermission, setUpdatingPermission] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: permissions, fetchData: fetchPermissions } = useFetch("permissions");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!permissionName){return} //TODO: display error component
    await axios.post(`${SERVER_DOMAIN}/permissions`, { name: permissionName });
    
    await fetchPermissions();

    setPermissionName("");
  }
  

  const handleEdit = (permission) => {
    setIsModalOpen(true);
    setUpdatingPermission(permission);
  }

  const handleDelete = async (name) => {
    await axios.delete(`${SERVER_DOMAIN}/permissions/${name}`)
    await fetchPermissions();
  }
   
  return (
    <>
     <PageContainer title="Permission Management">
       <div>
        <form onSubmit={handleSubmit}>
            <FormInput  label="name" value={permissionName} handleChange={e => setPermissionName(e.target.value)} />
            <FormSubmitBtn  >Create Permission</FormSubmitBtn>
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
                 <td className=' text-right pr-3'><EditIcon className="cursor-pointer" onClick={()=>handleEdit(permission)} /><DeleteIcon className="cursor-pointer" onClick={()=>handleDelete(permission.name)} /></td>
               </tr>
              }) }
             
           </tbody>
         </table>
       </div>
      </PageContainer>
      {
      isModalOpen && <PermissionUpdateModal setIsOpen={setIsModalOpen} updatingPermission={updatingPermission} fetchPermissions={fetchPermissions}  />
      }
     </>
  )
}

export default PermissionMgmt;