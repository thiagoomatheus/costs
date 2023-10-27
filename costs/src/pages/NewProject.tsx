import ProjectForm from "../components/form/ProjectForm"
import uuid from "react-uuid"
import ContentForm from "../components/form/ContentForm"
import useProjects from "../components/hooks/useProjects"


export default function NewProject() {

    const id = uuid()
    const { createProject } = useProjects()

    return (
        <main className="flex flex-col gap-y-10">  
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ContentForm>
                <ProjectForm btnText="Criar projeto" id={id} handleSubmit={createProject}/>
            </ContentForm>
        </main>
    )
}