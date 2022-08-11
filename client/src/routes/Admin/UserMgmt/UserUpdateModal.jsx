import { useState } from 'react';
import axios from 'axios';
import Modal from '../../../common/Modal';
import FormInput from '../../../common/Form/FormInput';
import FormSubmitBtn from '../../../common/Form/FormSubmitBtn';
import SelectDropDown from '../../../common/Select/SelectDropDown';
import { SERVER_DOMAIN } from '../../../cons/Cons';

const UserUpdateModal = ({ setIsModalOpen, updatingUser, roles,fetchUsers }) => {
    const [username,setUsername] = useState(updatingUser.name)
    const [email, setEmail] = useState(updatingUser.email)
    const [userRole, setUserRole] = useState(updatingUser.role?.name)
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${SERVER_DOMAIN}/users/${updatingUser.id}`, { name: username, email, userRole })
        await fetchUsers();
        setIsModalOpen(false)
    }

   

  return (
      <Modal setIsOpen={setIsModalOpen}>
          <div className='w-2/5 mx-auto'> 
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>      
                <FormInput label="name" value={username} handleChange={(e)=>{setUsername(e.target.value)}} />
                <FormInput label="email" value={email} handleChange={(e)=>{setEmail(e.target.value)}}  />
                <SelectDropDown selectedData={userRole} setSelectedData={setUserRole} selectOptions={roles} initialOption="Choose User Role here" />
                <FormSubmitBtn>Update</FormSubmitBtn>
            </form>
          </div>
    </Modal>
  )
}

export default UserUpdateModal