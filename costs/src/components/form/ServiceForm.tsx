import { useState } from "react"
import Input from "./Input"
import { useNavigate } from "react-router-dom"

function ServiceForm({ btnText, project, action }) {

    const [service, setService] = useState()
    const [cost, setCost] = useState()
    const [description, setDescripition] = useState()

    const navigate = useNavigate()

    let services = {
        id: project.services.length + 1,
        service: service,
        cost: cost,
        description: description
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (parseFloat(project.budget) < parseFloat(project.cost) + parseFloat(services.cost)) {
            navigate(`/projects/${project.id}`, { state: { message: "Valor de serviços ultrapassaram o orçamento", type: "error" } })
            return
        }
        const newCost = parseFloat(project.cost) + parseFloat(cost);
        project.cost = newCost;
        project.services.push(services)
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