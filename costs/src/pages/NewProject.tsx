import { useNavigate } from "react-router-dom"
import ProjectForm from "../components/form/ProjectForm"
import { ProjectType } from "../components/form/ProjectForm"
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore"
import { ProjectsContext, SetProjectsContext, db } from "../App"
import { useContext } from "react"


export default function NewProject() {
    const projects = useContext(ProjectsContext)
    const setProject = useContext(SetProjectsContext)

    const navigate = useNavigate()

    // function postData(project: ProjectType) {

    //     fetch("http://localhost:5000/projects", {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //         body: JSON.stringify(project)
    //     }).then(
    //         (data) => {
    //             console.log(data);
    //             navigate("/projects", {state: {message: "Projeto criado com sucesso", type: "success"}})
    //         } 
    //     ).catch(
    //         (err) => console.log(err)
    //     )
    // }

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

    async function teste(project:ProjectType) {
        const docRef = collection(db, "users", "6bbQnvJI1fevlS17kF7aJVgb4UU2", "projects")
        try {
            await addDoc(docRef, project)
        } catch (error) {
            console.log(error);
            
        }
    }

    async function postData(project: ProjectType) {
        const docRef = doc(db, "projects", "3lMligpcZ07hUbWgKvrD");
        try {
            await updateDoc(docRef, {
                projects: arrayUnion(project)
            })
            projects?.push(project)
            setProject(projects)
            navigate("/projects", {state: {message: "Projeto criado com sucesso", type: "success"}})  
        } catch (error) {
            console.log(error);
        } 
    }

    return (
        <main className="flex flex-col w-80 mx-auto">
            <h1 className="text-5xl font-bold">Criar projeto</h1>
            <p className="my-5">Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm btnText="Criar projeto" handleSubmit={teste}/>
        </main>
    )
}