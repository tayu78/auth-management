import React from 'react'
import  MenuItem from './MenuItem';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import GroupIcon from '@mui/icons-material/Group';
import KeyIcon from '@mui/icons-material/Key';

const Home = () => {
  return (
      <>
          {/* <h1>Admin Home</h1> */}
          <div>
          <ul className='grid grid-cols-auto-fit p-10 w-4/5 m-auto justify-center gap-10'>
          <MenuItem url={"userManagement"} title={"User Management"} icon={<ManageAccountsOutlinedIcon  className="menu-icon"/>} />
          <MenuItem url={"roleManagement"} title={"Role Management"} icon={<GroupIcon className='menu-icon' /> } />
          <MenuItem url={"permissionManagement"} title={"Permission Management"} icon={<KeyIcon className='menu-icon' />} />
            
          </ul>
          </div>
         
         
      
      </>
  )
}

export default Home;