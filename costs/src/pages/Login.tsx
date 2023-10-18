import { useEffect, useState, useContext } from "react"
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import MainTitleWithButton from "../components/layout/MainTitleWithButton";
import Message from "../components/layout/Message";
import LoginForm, { UserType } from "../components/form/LoginForm";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import ContentForm from "../components/form/ContentForm";
import { SetUserContext } from "../components/contexts/Contexts";

const provider = new GoogleAuthProvider();

export default function Login() {
    const setUid = useContext(SetUserContext)
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
                setUid(user.uid)
                navigate("/projects", {state: {message: "Login realizado com sucesso", type: "success"}})
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
            setUid(user.uid)
            navigate("/projects", {state: {message: "Login realizado com sucesso", type: "success"}})
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setMessage(errorCode + errorMessage)
        });
    }

    return (
        <main className="flex flex-col gap-y-10">
            <Message />
            <MainTitleWithButton to="/register" btnText="Criar Conta">
                Acesse sua conta
            </MainTitleWithButton>
            <ContentForm>
                <LoginForm handleSubmit={handleLogin} btnText="Acessar minha conta" />
                <button onClick={handleLoginGoogle} className="flex flex-row justify-center gap-x-6 p-1 sm:p-2 items-center bg-sky-500 sm:text-2xl font-bold text-white w-full hover:bg-sky-700 duration-500 out">
                    <span>Login com Google</span>
                    <span className="bg-white text-3xl p-1"><FcGoogle /></span>
                </button>
            </ContentForm>
        </main>
    )
}