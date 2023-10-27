import { useState } from "react"
import Input from "./Input"
import uuid from "react-uuid"
import { ServiceType } from "../types/types"

type Props = {
    btnText: string,
    serviceData?: ServiceType,
    handleSubmit: (service: ServiceType) => void
}

export default function ServiceForm({ btnText, serviceData, handleSubmit }: Props) {

    const [service, setService] = useState<ServiceType>({
        id: serviceData ? serviceData.id : uuid(),
        title: serviceData ? serviceData.title : '',
        cost: serviceData ? serviceData.cost : 0,
        description: serviceData ? serviceData.description : ''
    })

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setService({
            ...service,
            [target.name]: target.value
        })
    }

    return (
        <form className="flex flex-col gap-y-5"onSubmit={(e: React.FormEvent) => {
            e.preventDefault()
            handleSubmit(service)
        }}>
            <Input type="text" name="title" placeholder="Insira um serviço" value={service.title} handleChange={handleChange}>
                Nome do serviço:
            </Input>
            <Input type="number" name="cost" placeholder="Insira o valor do serviço" value={service.cost} handleChange={handleChange}>
                Valor do serviço:
            </Input>
            <Input type="text" name="description" placeholder="Insira uma breve descrição do serviço" value={service.description} handleChange={handleChange}>
                Descrição do serviço:
            </Input>
            <input className="font-bold bg-[#222] text-white text-xl border-none cursor-pointer py-3 hover:text-[#fb3] duration-500" type="submit" value={btnText} />
        </form>
    )
}