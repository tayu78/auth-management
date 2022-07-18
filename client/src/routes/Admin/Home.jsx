import React from 'react'
import  MenuItem from './MenuItem';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';


const Home = () => {
  return (
      <>
          <h1>Admin Home</h1>
          <div>
          <ul className='grid grid-cols-auto-fit p-10 w-4/5 m-auto justify-center gap-5'>
          <MenuItem url={"userManagement"} title={"User Management"} icon={<ManageAccountsOutlinedIcon  className="w-48"/>} />
            <MenuItem url={"roleManagement"} title={"Role Management"} />
            <MenuItem url={"permissionManagement"} title={"Permission Management"} />
            
          </ul>
          </div>
         
         
      
      </>
  )
}

export default Home;