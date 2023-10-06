import { useNavigate } from "react-router-dom";
import LoginForm, { UserType } from "../components/form/LoginForm";
import MainTitleWithButton from "../components/layout/MainTitleWithButton";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { SetUserContext } from "../App";
import { useContext, useState, useEffect } from "react"
import Message from "../components/layout/Message";

export default function Register() {

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

    const setUid = useContext(SetUserContext)
    const navigate = useNavigate()

    function handleRegister(user: UserType) {
        const regexEmail: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
        const regexPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
        if (!user?.email || !regexEmail.test(user?.email)) { // Validando email
            setMessage('Insira um email válido')
            return
        } else if (!user.password || !regexPassword.test(user.password)) {
            setMessage('Insira uma senha válida válida')
            return
        }
        const auth = getAuth();
        if (user?.email && user.password) {
            createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUid(user.uid)
                sessionStorage.setItem("uid", user.uid)
                navigate("/projects")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
            });
            }
    }

    return (
        <main className="flex flex-col mx-10 gap-y-10">
            {message && <Message msg={message} type={type} />}
            <MainTitleWithButton to="/login" btnText="Login">
                Cadastre-se
            </MainTitleWithButton>
            <p>Com seu cadastro ativo você consegue acessar seus projetos de qualquer lugar! Cadastre-se preenchendo os campos abaixo.</p>
            <LoginForm btnText="Cadastrar" handleSubmit={handleRegister} />
        </main>
    )
}