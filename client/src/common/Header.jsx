import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';

const Header = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const signOut = () => {
    setUser(null);
    navigate("/signin");
  }
  
  
  return (
    <div className='flex items-center justify-between  bg-slate-800 h-16  text-white px-3' >
      <Link to={"/"}>KENGENKANRI</Link> 
      {user && 
        <nav className='flex items-center justify-around w-1/3'>
        <Link to="/">Home</Link>
        <Link to="userManagement">User</Link>
        <Link to="roleManagement">Role</Link>
        <Link to="permissionManagement">Permission</Link>
       <button onClick={signOut}>Logout</button>
      </nav>
      }
      
    </div>
  )
}

export default Header;
