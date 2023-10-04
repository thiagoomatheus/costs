import { useEffect, useState } from "react"
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import MainTitleWithButton from "../components/layout/MainTitleWithButton";
import Message from "../components/layout/Message";
import LoginForm, { UserType } from "../components/form/LoginForm";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const provider = new GoogleAuthProvider();

type Props = {
    getUserId: (uid: string) => void
}

export default function Login({getUserId}: Props) {

    const navigate = useNavigate()

    // Message
    const [message, setMessage] = useState<string | undefined>()
    let type = "error";

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(undefined)
            }, 5000)

            return () => clearTimeout(timer)
        }
    },[message])

    function handleLogin(user: UserType) {
        const auth = getAuth();
        if (user?.email && user.password) {
            signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                getUserId(user.uid)
                sessionStorage.setItem("uid", user.uid)
                navigate("/projects")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setMessage(errorCode + errorMessage)
            });
        }
    }

    function handleLoginGoogle() {
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            setMessage("Login realizado com sucesso")
            getUserId(user.uid)
            sessionStorage.setItem("uid", user.uid)
            navigate("/projects")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setMessage(errorCode + errorMessage)
        });
    }

    return (
        <main className="flex flex-col mx-10 gap-y-10">
            {message && <Message msg={message} type={type} />}
            <MainTitleWithButton to="/register" btnText="Cadastre-se">
                Acesse sua conta
            </MainTitleWithButton>
            <LoginForm handleSubmit={handleLogin} btnText="Acessar minha conta" />
            <button onClick={handleLoginGoogle} className="flex flex-row justify-center gap-x-6 p-1 items-center bg-sky-500 text-2xl font-bold text-white w-2/5 m-auto hover:bg-sky-700 duration-500">
                <span>Login com Google</span> 
                <span className="bg-white text-3xl p-1"><FcGoogle /></span>
            </button>
        </main>
    )
}