import ButtonWithIcon from './ButtonWithIcon'
import { doc,deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"
import { ProjectType, ProjectsContext, SetProjectsContext } from '../../App'
import { db } from '../../App';
import { useContext } from 'react';

type Props = {
    project: ProjectType
}

export default function Card({project}: Props) {

    const projects = useContext(ProjectsContext)
    const setProjects = useContext(SetProjectsContext)

    let color: string = ""

    if (project.category === "Infra") {
        color = "#ffaebc";
    } else if (project.category === "Desenvolvimento") {
        color = "#a0e7e5";
    } else if (project.category === "Planejamento") {
        color = "#fbe7c6";
    } else if (project.category === "Design") {
        color = "#b4f8c8";
    }
    
    const navigate = useNavigate()

    async function deleteProject() {

    //     fetch(`http://localhost:5000/projects/${id}`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //     })
    //     .then(() => {
    //         // setProjects(projects.filter(projects => projects.id !== id))
    //         navigate("/projects", {state: {message: "Projeto removido com sucesso", type: "error"}})
    //     })
    //     .catch((err) => console.log(err))

    //     function deleteProject() { // Funcionando com localStorage
    //     projects = projects.filter(projects => projects.id !== id)
    //     localStorage.setItem("projects", JSON.stringify(projects))
    //     setProjects(projects)
    // }
    
        // const projectRef = doc(db, "projects", "3lMligpcZ07hUbWgKvrD")
        // try {
        //     await updateDoc(projectRef, {
        //         projects: arrayRemove(project)
        //     })
        //     setProjects(projects?.filter((item) => item.id !== project.id))
        //     navigate("/projects", {state: {message: "Projeto removido com sucesso", type: "error"}})  
        // } catch (error) {
        //     console.log(error);
        // } 

        try {
            await deleteDoc(doc(db, 'userId', project.id))
            setProjects(projects?.filter((item) => item.id !== project.id))
            navigate("/projects", {state: {message: "Projeto removido com sucesso", type: "error"}})
        } catch (error) {
            console.log(error)
        }
        
        
    }

    function editProjects() {
        navigate(`/projects/${project.id}`)
    }

    return (
        <>
            {project && (
                <div className="flex flex-col gap-y-5 min-h-[220px] w-64 p-4 text-[#575757] rounded-md border border-[#575757] shadow-md">
                    <h2 className='p-2 bg-[#222] text-orange font-bold text-xl'>{project.name}</h2>
                    <p><span className='font-bold'>Orçamento:</span> R$ {project.budget}</p>
                    <p className="flex items-center">
                        <span className={`block w-3 h-3 rounded-md mr-1`} style={{
                            backgroundColor: color
                        }}></span>
                        {project.category}
                    </p>
                    <div className="flex flex-row gap-x-4">
                        <ButtonWithIcon text="Editar" icon='edit' handleClick={editProjects} />
                        <ButtonWithIcon text="Delete" icon='delete' handleClick={() => {
                            deleteProject()
                        }} />
                    </div>
                </div>
            )}
        </>
    )
}