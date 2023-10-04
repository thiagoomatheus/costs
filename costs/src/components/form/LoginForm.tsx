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
        <form className="flex flex-col w-2/5 m-auto gap-y-6" onSubmit={(e: React.FormEvent) => {
            e.preventDefault()
            handleSubmit(user)
        }}>
            <Input name="email" type="email" placeholder="Insira seu email" handleChange={handleChange}>
                Email:
            </Input>
            <Input name="password" type="password" placeholder="Insira sua senha" handleChange={handleChange}>
                Senha:
            </Input>
            <input className="font-bold bg-[#222] text-white text-base border-none cursor-pointer py-3 hover:text-[#fb3] duration-500" type="submit" value={btnText} />
        </form>
    )
}