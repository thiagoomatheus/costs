import { Link } from "react-router-dom";
import Logo from './Logo'
import Navbar from './Navbar'

 export default function Header() {
    return (
        <header className='flex flex-row justify-between items-center py-5 px-20 bg-black'>
            <Logo />
            <Navbar>
                <li><Link className="hover:text-[#fb3] duration-500" to='/'>Home</Link></li>
                <li><Link className="hover:text-[#fb3] duration-500" to='/projects'>Projetos</Link></li>
                <li><Link className="hover:text-[#fb3] duration-500" to='/company'>Empresa</Link></li>
                <li><Link className="hover:text-[#fb3] duration-500" to='/contact'>Contato</Link></li>
                <li><Link className="hover:text-[#fb3] duration-500" to='/login'>Login</Link></li>
            </Navbar>
        </header>
    )
}