import ReactDOM from 'react-dom';
import { Link, NavLink } from "react-router";
import logo from '../assets/Logo.svg';
import Dropdown from "./Dropdown";
import { FaShoppingCart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleNav = () => {
    setIsNavOpen(state => !state);
  }

  const { totalQuantity } = useSelector(state => state.shoppingCart);
  const token = useSelector((state) => state.auth.token);

  return (
    <nav className="sticky z-50 top-0 h-12 flex items-center bg-orange-700 text-orange-50">
      <div className="px-2 container m-auto flex items-center justify-between">
        <Link to="/"><img className="h-6" src={logo} alt="bmerketo logo" /></Link>
        <div className="flex gap-4 justify-center items-center font-semibold">
          <ul className="hidden md:flex items-center gap-4">
            <li><NavLink to="/">Hem</NavLink></li>
            <li><NavLink to="contact">Kontakta oss</NavLink></li>
            {token ? <Link to="/order-history">Beställningshistorik</Link> : <li><NavLink to="login">Logga in</NavLink></li>}
            
          </ul>
          <div className="relative">
            {
              totalQuantity > 0 && (
                <div className="text-xs z-10 w-4 h-4 pointer-events-none bg-red-600 rounded-full absolute left-2 bottom-3 flex items-center justify-center">{ totalQuantity }</div>
              )
            }
            <Dropdown>
              <FaShoppingCart className='mt-0 md:mt-2' />
            </Dropdown>
          </div>
          <div className="block md:hidden">
            <button onClick={handleNav}><RxHamburgerMenu /></button>
          </div>
        </div>
      </div>
      { isNavOpen && <NavDropdown setIsNavOpen={setIsNavOpen} />}
      {
        isNavOpen && (
          <div className="responsive-menu h-64 min-w-64 flex justify-center bg-orange-50 rounded-b-lg shadow-lg ring-1 ring-black ring-opacity-10 text-black font-semibold w-32 z-50  absolute top-12 right-0">
            <ul className="flex flex-col items-center gap-6 pt-8">
              <li><NavLink onClick={handleNav} to="/">Hem</NavLink></li>
              <li><NavLink onClick={handleNav}  to="contact">Kontakta oss</NavLink></li>
              {token ? <li><NavLink onClick={handleNav} to="/order-history">Beställningshistorik</NavLink></li> : <li><NavLink onClick={handleNav} to="login">Logga in</NavLink></li>}
            </ul>
          </div>
        )
      }
    </nav>
  )
}
export default Navbar;

const NavDropdown = ({setIsNavOpen}) => {
  return ReactDOM.createPortal((
    <div className="absolute inset-0 bg-transparent" onClick={() => setIsNavOpen(false)}></div>
  ), document.querySelector('#modal'));
}