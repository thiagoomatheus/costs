import { useNavigate } from "react-router-dom"
import ProjectForm from "../components/form/ProjectForm"
import { ProjectType } from "../components/form/ProjectForm"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../App"


export default function NewProject() {

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

    async function postData(project: ProjectType) {
        const docRef = doc(db, "projects", "3lMligpcZ07hUbWgKvrD");
        try {
            await updateDoc(docRef, {
                projects: arrayUnion(project)
            })
            navigate("/projects", {state: {message: "Projeto criado com sucesso", type: "success"}})  
        } catch (error) {
            console.log(error);
        } 
    }

    return (
        <main className="flex flex-col w-80 mx-auto">
            <h1 className="text-5xl font-bold">Criar projeto</h1>
            <p className="my-5">Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm btnText="Criar projeto" handleSubmit={postData}/>
        </main>
    )
}