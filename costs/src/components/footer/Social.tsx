import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa6'
import { Link } from "react-router-dom";

export default function Social() {
    return(
        <div id='footer' className='flex flex-row gap-x-8 text-5xl'>
            <Link to='//www.facebook.com'>
                <FaFacebook />
            </Link>
            <Link to='//www.instagram.com'>
                <FaInstagram />
            </Link>
            <Link to='//www.linkedin.com'>
                <FaLinkedin />
            </Link>
        </div>
    )
}