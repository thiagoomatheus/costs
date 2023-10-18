import { Link, useNavigate } from "react-router-dom";
import Logo from './Logo'
import Navbar from './Navbar'
import { useContext, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";
import { SetUserContext, UserContext } from "../contexts/Contexts";

 export default function Header() {
    const navigate = useNavigate()
    const uid = useContext(UserContext)
    const setUid = useContext(SetUserContext)

    const [showMenu, setShowMenu] = useState<boolean>(false)

    return (
        <header className='flex flex-row justify-between items-center py-2 px-10 md:py-5 md:px-20 bg-black'>
            <Logo />
            <li className={`${!showMenu ? 'block' : 'hidden'} text-4xl cursor-pointer sm:hidden text-white`} onClick={() => {
                setShowMenu(!showMenu)
            }}><MdOutlineMenu /></li>
            <Navbar hidden={showMenu}>
                {showMenu && (
                    <li className={`${showMenu ? 'block' : 'hidden'} text-3xl cursor-pointer sm:hidden text-white`} onClick={() => {
                        setShowMenu(!showMenu)
                    }}><MdOutlineClose /></li>
                )}
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/projects'>Projetos</Link></li>
                <li className="flex text-center"><Link to='/register'>Criar conta</Link></li>
                {!uid && (
                    <li><Link to='/login'>Login</Link></li>
                )}
                {uid && (
                    <li onClick={() => {
                        const auth = getAuth();
                        signOut(auth).then(() => {
                            setUid(undefined)
                            navigate("/projects", {state: { message: "Usuário desconectado", type: "error"}})
                        }).catch((error) => {
                            console.log(error);
                        });
                    }}><Link to='/projects'>Logout</Link></li>
                )}
            </Navbar>
        </header>
    )
}