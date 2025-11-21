import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/login_and_sigup.css';
import thanu from '../image/thanu.png';



export default function Register_page() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    address: '',
    gender: '',
    phoneNumber: '',
    city: '',
    profileImage: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);
    
    if (result.success) {
      alert('Registration successful! Please login.');
      navigate('/login');
    } else {
      // Handle different error formats
      const errorMessage = typeof result.error === 'string' 
        ? result.error 
        : result.error?.message || 'Registration failed';
      alert(errorMessage);
    }
  };

  return (
    <div className='start_div_1'>
      <form onSubmit={handleSubmit} className='form1'>
        <div className="image1">
          <img src={thanu} alt="" />
          <h1>L</h1><h3>K</h3> <h1>A</h1><h3>dvertisement</h3>
        </div>
        <div className="signup">
          <h1>New Account </h1>
          <div className="form_grid">
            <div>
              <label>First Name :</label>
              <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required disabled={loading} />
              <label>Last Name :</label>
              <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required disabled={loading} />
              <label>Address :</label>
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required disabled={loading} />
              <label>City :</label>
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required disabled={loading} />
              <label>Gender :</label>
              <div>
                <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} disabled={loading} />Male
                <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} disabled={loading} />Female
                <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange}disabled={loading} />Other
              </div>
            </div>
            <div>
              <label>Phone No :</label>
              <input type="tel" name="phoneNumber" placeholder="Phone No" value={formData.phoneNumber} onChange={handleChange} required disabled={loading} />
              <label>Email :</label>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required disabled={loading} />
              <label>Username :</label>
              <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required disabled={loading} />
              <label>Password :</label>
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required disabled={loading} />
              <label>Confirm Password :</label>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={loading} />
            </div>
          </div>
          <div className="but">
            <button name="Cancel" type="button" disabled={loading}>
              <a href="/login">Cancel</a>
            </button>
            <button name="Register" type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
          <p>Already have an account? <a href="/login">Sign in</a></p>
        </div>
      </form>
    </div>
  );
}
