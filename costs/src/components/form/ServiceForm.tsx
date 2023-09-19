import { useState } from "react"
import Input from "./Input"
import { useNavigate } from "react-router-dom"
import { ProjectType } from "./ProjectForm"

type Props = {
    btnText: string,
    dataProject: ProjectType,
    handleAddService: (project: ProjectType) => void
}

function ServiceForm({ btnText, dataProject, handleAddService }: Props) {

    const [service, setService] = useState()
    const [cost, setCost] = useState()
    const [description, setDescripition] = useState()

    const navigate = useNavigate()

    let services = {
        id: dataProject.services.length + 1,
        service: service,
        cost: cost,
        description: description
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (parseFloat(dataProject.budget) < parseFloat(dataProject.cost) + parseFloat(dataProjectservices.cost)) {
            navigate(`/projects/${project.id}`, { state: { message: "Valor de serviços ultrapassaram o orçamento", type: "error" } })
            return
        }
        const newCost = parseFloat(dataProject.cost) + parseFloat(cost);
        dataProject.cost = newCost;
        dataProject.services.push(services)
        action(project)
    }


    return (
        <form className={Styles.formContainer} onSubmit={handleSubmit}>
            <label>Nome do serviço:
                <Input type="text" placeholder="Insira um serviço" event={setService} />
            </label>
            <label>Valor do serviço:
                <Input type="number" placeholder="Insira o valor do serviço" event={setCost} />
            </label>
            <label>Descrição do serviço:
                <Input type="text" placeholder="Insira uma breve descrição do serviço" event={setDescripition} />
            </label>
            <Input type="submit" value={btnText} />
        </form>
    )
}

export default ServiceForm