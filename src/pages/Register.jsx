import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/features/auth/authSlice';
import { Link, useNavigate } from 'react-router';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!name) {
      setNameError('Namn är obligatoriskt!');
      valid = false;
    } else {
      setNameError('');
    }

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
      setPasswordError('Lösenord är obligatorisk!');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Bekräfta ditt lösenord!');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Lösenorden matchar inte!');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (valid) {
      dispatch(registerUser({ name, email, password }));
      navigate("/")
    }
  };

  return (
    <div className="container m-auto px-4 text-orange-100 pt-12">
      <h2 className='text-xl text-orange-700 font-semibold pb-4'>Registrera</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 pb-6'>
          <label htmlFor="name">Namn: </label>
          <input className='text-black rounded-lg p-2'
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            requireds
          />
          {nameError && <p className="text-red-500">{nameError}</p>}
        </div>
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
        <div className='flex flex-col gap-2 pb-6'>
          <label htmlFor="confirmPassword">Bekräfta Lösenordet: </label>
          <input className='text-black rounded-lg p-2'
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
        </div>
        <div className='flex justify-between items-center pt-4'>
          <button className='bg-orange-700 px-10 py-2 rounded-lg hover:bg-orange-600 transition-colors text-black font-semibold' type="submit">Registrera</button>
          <Link className='bg-orange-700 px-10 py-2 rounded-lg hover:bg-orange-600 transition-colors text-black font-semibold' to="/login">Avbryt</Link>
        </div>
      </form>
      {message && <p className="text-green-500 text-xl pt-5">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Register;