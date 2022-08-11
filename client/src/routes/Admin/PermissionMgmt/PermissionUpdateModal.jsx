import React, { useState } from 'react';
import axios from 'axios';

import { SERVER_DOMAIN } from '../../../cons/Cons';
import Modal from '../../../common/Modal';
import FormInput from '../../../common/Form/FormInput';
import FormSubmitBtn from '../../../common/Form/FormSubmitBtn';





const UpdateModal = ({setIsOpen,updatingPermission,fetchPermissions}) => {
    const [permissionName, setPermissionName] = useState(updatingPermission.name);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${SERVER_DOMAIN}/permissions/${updatingPermission.id}`, { name: permissionName });
        await fetchPermissions();
        setIsOpen(false);
    }

  return (
      <Modal setIsOpen={setIsOpen}   >
          <div className='flex justify-center items-center w-4/5 '>
                <div >
                    <h2 className='text-center'>Update Permission</h2>
                    <form onSubmit={handleSubmit} >
                        <FormInput  label="name" value={permissionName} handleChange={e=>{setPermissionName(e.target.value)}}  />
                        <FormSubmitBtn  >Update Permission </FormSubmitBtn>
                    </form> 
              </div>
            </div>
    </Modal>
  )
}

export default UpdateModal