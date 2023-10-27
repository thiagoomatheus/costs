import { useState} from "react"
import Input from "./Input";

type Props = {
    btnText: string,
    handleSubmit: (user: UserType) => void
}

export type UserType = {
    email?: string,
    password?: string
} | undefined

export default function LoginForm({handleSubmit, btnText}: Props) {
    const [user, setUser] = useState<UserType>({
        email: "",
        password: ""
    })

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setUser({
            ...user,
            [target.name]: target.value
        })
    }
    
    return (
        <form className="flex flex-col gap-y-6" onSubmit={(e: React.FormEvent) => {
            e.preventDefault()
            handleSubmit(user)
        }}>
            <Input name="email" type="email" placeholder="Insira seu email" handleChange={handleChange} autocomplete="on">
                Email:
            </Input>
            <Input name="password" type="password" placeholder="Insira sua senha" handleChange={handleChange}>
                Senha:
            </Input> 
            <p>Lembre-se: Sua senha deve conter pelo menos uma letra miníscula, uma letra maiúscula, um caractere especial ($*&@#), um número e 8 caracteres.</p>
            <input type="submit" value={btnText} />
        </form>
    )
}