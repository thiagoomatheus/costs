import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa6'
import { Link } from "react-router-dom";

export default function Social() {
    return(
        <div className='flex flex-row gap-x-8 text-3xl'>
            <Link className='hover:text-[#fb3] duration-500' to='//www.facebook.com'>
                <FaFacebook />
            </Link>
            <Link className='hover:text-[#fb3] duration-500' to='//www.instagram.com'>
                <FaInstagram />
            </Link>
            <Link className='hover:text-[#fb3] duration-500' to='//www.linkedin.com'>
                <FaLinkedin />
            </Link>
        </div>
    )
}