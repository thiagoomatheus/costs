import { useState } from "react"
import Input from "./Input"
import uuid from "react-uuid"
import { ServiceType } from "../../App"

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

    // async function handleSubmit(e: React.FormEvent) {
    //     e.preventDefault()
        // if (parseFloat(dataProject.budget) < parseFloat(dataProject.cost) + parseFloat(dataProjectservices.cost)) {
        //     navigate(`/projects/${project.id}`, { state: { message: "Valor de serviços ultrapassaram o orçamento", type: "error" } })
        //     return
        // }
        // const newCost = parseFloat(dataProject.cost) + parseFloat(cost);
        // dataProject.cost = newCost;
    //     dataProject.services.push(services)
    //     handleAddService(project)
    // }

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