import LoginForm from "../components/form/LoginForm";
import MainTitleWithButton from "../components/layout/MainTitleWithButton";
import Message from "../components/layout/Message";
import ContentForm from "../components/form/ContentForm";
import useLogin from "../components/hooks/useLogin";

export default function Register() {

    const { handleRegister } = useLogin()

    return (
        <main className="flex flex-col gap-y-10">
            <Message />
            <MainTitleWithButton to="/login" btnText="Login">
                Crie Sua Conta
            </MainTitleWithButton>
            <p>Com seu cadastro ativo você consegue acessar seus projetos de qualquer lugar! Cadastre-se preenchendo os campos abaixo.</p>
            <ContentForm>
                <LoginForm btnText="Cadastrar" handleSubmit={handleRegister} />
            </ContentForm>
        </main>
    )
}