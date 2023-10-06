import { Link, useNavigate } from "react-router-dom";
import Logo from './Logo'
import Navbar from './Navbar'
import { useContext } from "react";
import { SetUserContext, UserContext } from "../../App";
import { getAuth, signOut } from "firebase/auth";

 export default function Header() {
    const navigate = useNavigate()
    const uid = useContext(UserContext)
    const setUid = useContext(SetUserContext)

    return (
        <header className='flex flex-row justify-between items-center py-5 px-20 bg-black'>
            <Logo />
            <Navbar>
                <li><Link className="hover:text-[#fb3] duration-500" to='/'>Home</Link></li>
                <li><Link className="hover:text-[#fb3] duration-500" to='/projects'>Projetos</Link></li>
                <li><Link className="hover:text-[#fb3] duration-500" to='/register'>Cadastre-se</Link></li>
                {!uid && (
                    <li><Link className="hover:text-[#fb3] duration-500" to='/login'>Login</Link></li>
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
                    }}><Link className="hover:text-[#fb3] duration-500" to='/projects'>Logout</Link></li>
                )}
            </Navbar>
        </header>
    )
}