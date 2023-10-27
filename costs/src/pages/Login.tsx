import MainTitleWithButton from "../components/layout/MainTitleWithButton";
import Message from "../components/layout/Message";
import LoginForm from "../components/form/LoginForm";
import { FcGoogle } from "react-icons/fc";
import ContentForm from "../components/form/ContentForm";
import useLogin from "../components/hooks/useLogin";

export default function Login() {

    const { handleLogin, handleLoginGoogle } = useLogin()

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