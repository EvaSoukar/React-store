import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setEmail, setMessage, sendMessage } from '../store/features/forms/contactSlice';

const Contact = () => {
  const dispatch = useDispatch();
  const { name, email, message, status, responseMessage } = useSelector((state) => state.contact);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');

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

    if (!message) {
      setMessageError('Meddelande är obligatoriskt!');
      valid = false;
    } else {
      setMessageError('');
    }

    if (valid) {
      dispatch(sendMessage({ name, email, message }));
    }
  };

  return (
    <div className="container m-auto px-4 text-orange-100 pt-12">
      <h2 className='text-xl text-orange-700 font-semibold pb-4'>Kontakta Oss</h2>
      <p className='pb-6'>Vår kundtjänst kommer att svara på dina frågor så snart som möjligt.</p>
      <form className='md:max-w-[500px]' onSubmit={handleSubmit} noValidate>
        <div className='flex flex-col gap-2 pb-6'>
          <label htmlFor="name">Namn: </label>
          <input className='text-black rounded-lg p-2'
            id="name"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            required
          />
          {nameError && <p className="text-red-500">{nameError}</p>}
        </div>
        <div className='flex flex-col gap-2 pb-6'>
          <label htmlFor="email">Epost: </label>
          <input className='text-black rounded-lg p-2'
            type="email"
            id="email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            required
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div className='flex flex-col gap-2 pb-6'>
          <label htmlFor="message">Meddelande: </label>
          <textarea className='text-black rounded-lg p-2 h-32'
            id="message"
            value={message}
            onChange={(e) => dispatch(setMessage(e.target.value))}
            required
          />
          {messageError && <p className="text-red-500">{messageError}</p>}
        </div>
        <button className='bg-orange-700 px-10 py-2 rounded-lg hover:bg-orange-600 transition-colors text-black font-semibold' type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Skicka meddelande'}
        </button>
      </form>
      {status === 'succeeded' && <p className="text-green-500 text-xl pt-5">{responseMessage}</p>}
      {status === 'failed' && <p className="text-red-500">Något gick fel!</p>}
    </div>
  );
};

export default Contact;