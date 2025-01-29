import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/features/auth/authSlice';
import { Link, useNavigate } from 'react-router';
import HomePage from './HomePage';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!email) {
      setEmailError('E-postadress är obligatorisk!');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Ogiltigt e-postformat!');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Lösenord är obligatoriskt');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      dispatch(loginUser({ email, password }));
      return navigate("/");
    }

  }

  return (
    <div className="container m-auto px-2 pt-12 text-orange-100">
      <h2 className='text-xl text-orange-700 font-semibold pb-4'>Logga in</h2>
      <form className='md:max-w-[500px] mb-6' onSubmit={handleSubmit} noValidate>
        <div className='flex flex-col gap-2 pb-6'>
          <label htmlFor="email">Epost: </label>
          <input className='text-black rounded-lg p-2'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div className='flex flex-col gap-2 pb-6'>
          <label htmlFor="password">Lösenord: </label>
          <input className='text-black rounded-lg p-2'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <button className='bg-orange-700 px-10 py-2 rounded-lg hover:bg-orange-600 transition-colors text-black font-semibold' type="submit">Login</button>
      </form>
      {message && <p className="text-green-500 text-xl pt-5">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <p className='text-lg pb-6 pt-4'>Har du iget konto än?</p>
      <Link className='bg-orange-700 px-10 py-4 rounded-lg hover:bg-orange-600 transition-colors text-black font-semibold animate-pulse' to="register">Registrera här!</Link>
    </div>
  );
};

export default Login;