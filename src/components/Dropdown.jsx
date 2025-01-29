import ReactDOM from 'react-dom';
import { useState } from "react";
import ShoppingCart from './ShoppingCart';

const Dropdown = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    {isOpen && <DropdownBg setIsOpen={setIsOpen} />}
      <button onClick={() => setIsOpen(state => !state)}>
        { children }
      </button>
      {
        isOpen && (
          <div className='z-50 p-5 absolute bg-orange-50 w-[450px] right-0 mt-2 rounded-b-lg shadow-lg ring-1 ring-black ring-opacity-10'>
            <div className="py-1">
              <ShoppingCart setIsOpen={setIsOpen} />
            </div>
          </div>
        )
      }
    </>
  )
}
export default Dropdown;

const DropdownBg = ({setIsOpen}) => {
  return ReactDOM.createPortal((
    <div className="absolute inset-0 bg-transparent" onClick={() => setIsOpen(false)}></div>
  ), document.querySelector('#modal'));
}