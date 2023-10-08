import { useNavigate } from "react-router-dom"
import ProjectForm from "../components/form/ProjectForm"
import { ProjectType, UserContext } from "../App"
import { doc, setDoc } from "firebase/firestore"
import { ProjectsContext, SetProjectsContext, db } from "../App"
import { useContext } from "react"
import uuid from "react-uuid"
import ContentForm from "../components/form/ContentForm"


export default function NewProject() {
    const projects = useContext(ProjectsContext)
    const setProjects = useContext(SetProjectsContext)
    const uid = useContext(UserContext)

    const id = uuid()

    const navigate = useNavigate()

    // function postData() { // Post com localStorage - Funcionando muito bem!

    //     const getData = localStorage.length

    //     let id = localStorage.length + 1

    //     if (getData === 0) {
    //         let project = [{
    //             id: id,
    //             name: name,
    //             budget: budget, 
    //             category: category
    //         }]
    //         localStorage.setItem("projects", JSON.stringify(project))
    //         navigate("/projects")
    //     }
    //     else {
    //         let projects = JSON.parse(localStorage.getItem("projects"))
    //         let project = {
    //             id: projects.length + 1,
    //             name: name,
    //             budget: budget, 
    //             category: category
    //         }
    //         projects.push(project)
    //         localStorage.setItem("projects", JSON.stringify(projects))
    //         navigate("/projects")
    //     }
    // }

    async function postData(project: ProjectType) { // Melhor opção
        if (typeof project.budget === "string") {
            const data = {
                id: project.id,
                name: project.name,
                budget: parseFloat(project.budget),
                cost: project.cost,
                category: project.category,
                services: project.services
            }
            try {
                if (uid) {
                    setDoc(doc(db, uid, project.id), data, {merge: true})
                    projects?.push(data)
                    setProjects(projects)
                    navigate("/projects", {state: {message: "Projeto criado com sucesso", type: "success"}})
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <main className="flex flex-col gap-y-10">  
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ContentForm>
                <ProjectForm btnText="Criar projeto" id={id} handleSubmit={postData}/>
            </ContentForm>
        </main>
    )
}