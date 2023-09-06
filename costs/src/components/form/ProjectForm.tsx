import Input from "./Input"
import Select from "./Select"
import { useState } from "react"

export type ProjectType = {
    name: string | undefined,
    budget: number | undefined,
    cost: number | undefined,
    category: string | undefined,
    services: {
        id: number,
        service: string,
        cost: number,
        description: string
    }[] | undefined
} 

type Props = {
    btnText: string,
    dataProject?: ProjectType,
    handleSubmit: (project: ProjectType) => void,
}

export default function ProjectForm({btnText, dataProject, handleSubmit}: Props) {

    const [name, setName] = useState<string>()
    const [budget, setBudget] = useState<number>()
    const [category, setCategory] = useState<string>()

    function handleSubmitForm(e: React.FormEvent) {
        e.preventDefault()
        let project: ProjectType = {
            name: name,
            budget: budget,
            cost: dataProject ? dataProject.cost : 0,
            category: category,
            services: dataProject ? dataProject.services : []
        }
        handleSubmit(project)
    }   

    // function postData(e) {
    //     e.preventDefault()
    //     action(projects)
    // }

    // function editData(e) {
    //     e.preventDefault()
    //     action(projects)
    // }



    return(
        <>
            <form className="flex flex-col gap-y-5" onSubmit={handleSubmitForm}>

                <Input value={dataProject ? dataProject.name : undefined } type='text' placeholder='Insira o nome de um projeto' handleChange={setName}>
                    Nome do projeto:
                </Input>

                <Input value={dataProject ? dataProject.budget : undefined } type='number' placeholder='Insira o orçamento total' handleChange={setBudget}>
                    Orçamento do projeto:
                </Input>

                <Select defaultValue={dataProject ? dataProject.category : undefined } handleChange={setCategory}>
                    Selecione a categoria:
                </Select>

                <input className="font-bold bg-[#222] text-white text-xl border-none cursor-pointer py-3 hover:text-[#fb3] duration-500" type="submit" value={btnText} />

            </form>
        </>
    )
}