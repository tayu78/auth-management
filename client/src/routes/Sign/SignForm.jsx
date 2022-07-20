import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { SERVER_DOMAIN } from '../../cons/Cons';
import FormError from '../../common/Form/FormError';

const SignForm = ({isLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let users;
    if (isLogin) {
      users = await axios.post(`${SERVER_DOMAIN}/users/login`, { name: username, email, password });
      console.log(users.data);
    } else {
      users = await axios.post(`${SERVER_DOMAIN}/users/signup`, { name: username, email, password })
      console.log(users);
    }
    
    if (users.data) {
      navigate("/")
    } else {
      setError("User not found. please try again");
    }
  
  }

  return (
    <div className='w-96 m-auto border-2 p-16 mt-10 '>
      <h2 className='text-center text-xl'>{isLogin ? "SignIn" : "SignUp" }</h2>
      {error && <FormError error={error} />}
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col items-center  '>
            <div >
              <label htmlFor="username">Name</label>
              <input type="text" id="nuserame" name="username" className="border-2 block" value={username} onChange={e=>setUsername(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" className='border-2 block' value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className='border-2 block' value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <button type="submit" className='border-2 bg-slate-500 text-white w-20 p-2 m-5' >Login</button>
        </div> 
      </form>
      {isLogin ?
        <div className='text-center'>
          <p>Not have an account? </p>
          <Link to="/signup">here to sign up</Link>
        </div>
        :
        <div className='text-center'>
          <p>Already have an account ?  </p>
          <Link to="/signin">here to sign in</Link>
        </div>
      }
       
    </div>

  )
}

export default SignForm