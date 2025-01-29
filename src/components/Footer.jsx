import { Link } from 'react-router';
import logo from '../assets/Logo.svg';
const Footer = () => {
  return (
    <div className='bg-orange-700 max-h-full min-h-[200px] flex items-center justify-center'>
      <footer className='sm:flex-col sm:gap-4 md:flex-row flex items-center justify-between md:max-w-[60%] w-full'>
        <Link to="/"><img className="h-10" src={logo} alt="bmerketo logo" /></Link>
        <ul>
          <h5 className='text-orange-50 text-xl pb-2 font-semibold'>Kontakta oss</h5>
          <li>Besök oss: xxxxx xxxx xxxx</li>
          <li>Ring oss: 000 000 00 00</li>
          <li>Mejla oss: mmerketo@email.com</li>
        </ul>
      </footer>
    </div>
  )
}
export default Footer;