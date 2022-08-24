import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import "./Header.css";

const Header = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const signOut = () => {
    setUser(null);
    navigate("/signin");
  }
  
  
  return (
    <div className='flex items-center justify-between  bg-slate-800 h-16  text-white px-3 fixed top-0 left-0 w-full z-50 '  >
      <Link className='font-bold' to={"/"}>KENGENKANRI</Link> 
      {/* {user && 
        <nav className='flex items-center justify-around w-1/3'>
        <Link to="/">Home</Link>
        <Link to="userManagement">User</Link>
        <Link to="roleManagement">Role</Link>
        <Link to="permissionManagement">Permission</Link>
       <button onClick={signOut}>Logout</button>
      </nav>
      } */}
      <div className='burger-menu'>
        <div className='burger-line'></div>
      </div>
      
    </div>
  )
}

export default Header;
