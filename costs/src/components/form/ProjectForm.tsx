import { ProjectType } from "../../App"
import Input from "./Input"
import Select from "./Select"
import { useState } from "react"

type Props = {
    btnText: string,
    dataProject?: ProjectType,
    id?: string,
    handleSubmit: (project: ProjectType) => void
}

export default function ProjectForm({btnText, dataProject, id, handleSubmit}: Props) {

    const [project, setProject] = useState<ProjectType>({
        id: dataProject ? dataProject.id : id ? id : '',
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

                <Select nameHTML="category" value={project.category} handleChange={handleChange}>
                    Selecione a categoria:
                </Select>

                <input type="submit" value={btnText} />

            </form>
        </>
    )
}