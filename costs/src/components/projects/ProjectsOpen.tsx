import { useEffect, useState, useContext } from 'react'
import Card from './Card'
import Loading from "../layout/Loading"
import Styles from './ProjectsOpen.module.css'
import { ProjectsContext } from '../../pages/Projects'

export default function ProjectsOpen() {
        
        const projects = useContext(ProjectsContext)
        const [loading, setLoading] = useState(true)
        console.log(projects);
        

        // useEffect(() => {
        //     fetch("http://localhost:5000/projects")
        //     .then((resp) => resp.json())
        //     .then((data) => {
        //         setProjects(data);
        //         setLoading(false)
        //     })
        //     .catch((err) => console.log(err))
        // }, [])

    // const [projects, setProjects] = useState(JSON.parse(localStorage.getItem("projects"))) // Com localStorage - funcionando

    console.log("renderizou");

    return (
        <div className={Styles.projectsContainer} >
            
            {projects !== null && projects.length !== 0 && (
                projects.map(({id, name, budget, category}) => (
                    <Card key={id} id={id} name={name} budget={budget} category={category} projects={projects} setProjects={setProjects}/>
            )
            )
            )
            }
            {loading && (
                <Loading />
            )}
            {!loading && projects.length === 0 && (
                <p>Que pena! Você ainda não tem um projeto. Crie um clicando no botão acima e visualize aqui!</p>
            )}
            
        </div>
    )
}