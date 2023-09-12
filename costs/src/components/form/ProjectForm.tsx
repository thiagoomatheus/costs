import Input from "./Input"
import Select from "./Select"
import { useState } from "react"
import uuid from "react-uuid"

export type ProjectType = {
    id: string,
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

    const [project, setProject] = useState<ProjectType>({
        id: dataProject ? dataProject.id : uuid(),
        name: dataProject ? dataProject.name : "",
        budget: dataProject ? dataProject.budget : 0,
        cost: dataProject ? dataProject.cost : 0,
        category: dataProject ? dataProject.category : "",
        services: dataProject ? dataProject.services : []
    })

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setProject({
            ...project,
            [target.name]: target.value
        })
    }

    return(
        <>
            <form className="flex flex-col gap-y-5" onSubmit={(e: React.FormEvent) => {
                e.preventDefault()
                handleSubmit(project)
            }}>

                <Input name="name" value={project.name } type='text' placeholder='Insira o nome de um projeto' handleChange={handleChange}>
                    Nome do projeto:
                </Input>

                <Input name="budget" value={project.budget} type='number' placeholder='Insira o orçamento total' handleChange={handleChange}>
                    Orçamento do projeto:
                </Input>

                <Select nameHTML="category" defaultValue={project.category} handleChange={handleChange}>
                    Selecione a categoria:
                </Select>

                <input className="font-bold bg-[#222] text-white text-xl border-none cursor-pointer py-3 hover:text-[#fb3] duration-500" type="submit" value={btnText} />

            </form>
        </>
    )
}