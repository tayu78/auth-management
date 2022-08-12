import { useState, useMemo } from 'react';
import axios from 'axios';
import Modal from "../../../common/Modal";
import MultipleSelectDropDown from '../../../common/Select/MultipleSelectDropDown';
import { SERVER_DOMAIN } from '../../../cons/Cons';


const RoleUpdateModal = ({ setIsModalOpen, permissions, updatingRole,fetchRoles }) => {
    const [roleName, setRoleName] = useState(updatingRole.name);
    const [selectedPermissions, setSelectedPermissions] = useState(
        updatingRole.Permissions.map(permission => {
        const {rolesPermissions,...rest} = permission
        return {...rest}
        }));
    
    const initialValue = useMemo(() => {
        return selectedPermissions.map((permission) => {
            return {...permission,value:permission.name,label:permission.name}
        })
    }, [selectedPermissions])
    


    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.put(`${SERVER_DOMAIN}/roles/${updatingRole.id}`, { name: roleName, selectedPermissions });
        await fetchRoles();

        setIsModalOpen(false);
    }

  return (
      <Modal setIsOpen={setIsModalOpen}>
          <h1>Update Role</h1>
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
            initialValue={initialValue}
          />
        </div>
        <div className='text-right'>
          <button  className='border-2 p-2 mt-5' type='submit'>Update role</button>
        </div>
      </form>
      </Modal>
  )
}

export default RoleUpdateModal