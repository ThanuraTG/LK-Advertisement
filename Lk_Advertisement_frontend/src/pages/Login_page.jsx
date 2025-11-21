// import React from 'react'
// import '../css/login_and_sigup.css'
// import thanu from '../image/thanu.png'

// export default function Login_page() {
//     return (
//         <div className='start_div'>
//             <form action="" className='login_form'>
//                 <div className="image_login">
//                     <img src={thanu} alt="" />
//                 </div>
//                 <div className="login_part">
//                     <h3>Sign in to Web Page</h3>
//                     <label htmlFor="">Email :</label>
//                     <input type="text" name="" placeholder='Email' id="" /><br />
//                     <label htmlFor="">Password :</label>
//                     <input type="password" name="" placeholder='Password' id="" /><br />
//                     <a href="">Forgot Your Password?</a><br />
//                     <button type="button">Sign in</button>
//                     <p>Don't you have an account? <a href="/registration">Create New Account</a></p>
//                 </div>
//             </form>
//         </div>
//     )
// }



import React, { useState } from 'react';
import '../css/login_and_sigup.css';
import thanu from '../image/thanu.png';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login_page() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(formData);
    setLoading(false);
    
    if (result.success) {
      navigate('/');
    } else {
      alert(result.error);
    }
  };

  return (
    <div className='start_div'>
      <form onSubmit={handleSubmit} className='login_form'>
        <div className="image_login">
          <img src={thanu} alt="" />
        </div>
        <div className="login_part">
          <h3>Sign in to Web Page</h3>
          <label htmlFor="username">Username :</label>
          <input 
            type="text" 
            name="username" 
            placeholder='Username' 
            value={formData.username}
            onChange={handleChange}
            required 
            disabled={loading}
          /><br />
          <label htmlFor="password">Password :</label>
          <input 
            type="password" 
            name="password" 
            placeholder='Password' 
            value={formData.password}
            onChange={handleChange}
            required 
            disabled={loading}
          /><br />
          <a href="">Forgot Your Password?</a><br />
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <p>Don't you have an account? <a href="/registration">Create New Account</a></p>
        </div>
      </form>
    </div>
  );
}