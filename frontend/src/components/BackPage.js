import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-4 right-4 text-2xl font-bold px-2 hover:bg-black 
       hover:text-white border-2 border-black rounded-md cursor-pointer">
        &times;
    </button>
  )
};

export default BackButton;