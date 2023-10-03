import { useNavigate } from "react-router-dom";
import LoginForm, { UserType } from "../components/form/LoginForm";
import MainTitleWithButton from "../components/layout/MainTitleWithButton";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

type Props = {
    getUserId: (uid: string) => void
}

export default function Register({getUserId}: Props) {
    const navigate = useNavigate()

    function handleRegister(user: UserType) {
        const auth = getAuth();
        if (user?.email && user.password) {
            createUserWithEmailAndPassword(auth, user.email, user.password)
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
                console.log(errorCode + errorMessage);
            });
            }
    }

    return (
        <main className="flex flex-col mx-10 gap-y-10">
            <MainTitleWithButton to="/login" btnText="Login">
                Cadastre-se
            </MainTitleWithButton>
            <p>Com seu cadastro ativo você consegue acessar seus projetos de qualquer lugar! Cadastre-se preenchendo os campos abaixo.</p>
            <LoginForm btnText="Cadastrar" handleSubmit={handleRegister} />
        </main>
    )
}