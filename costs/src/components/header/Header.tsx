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
        <header className='grid grid-cols-[1fr_2fr] sm:flex sm:flex-row sm:justify-between items-center py-5 px-2 md:py-5 md:px-20 bg-black'>
            <Logo />
            <Navbar>
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