import MainTitleWithButton from "../components/layout/MainTitleWithButton"
import ProjectsOpen from '../components/projects/ProjectsOpen'
import Styles from "./Projetos.module.css"
import Message from "../components/layout/Message"
import { useLocation, useNavigate} from "react-router-dom"
import { useState, useEffect, createContext } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../App"
import { ProjectType } from "../components/form/ProjectForm"

type ProjectsData = [
    ProjectType
] | undefined

export const ProjectsContext = createContext<ProjectsData>(undefined)

export default function Projects() {
    const [projects, setProjects] = useState<ProjectsData>();

    useEffect(() => {
        const docRef = doc(db, "projects", "3lMligpcZ07hUbWgKvrD")
        const getData = async () => {
            const r = await getDoc(docRef)
            if (!r.exists()) {
                console.log("erro");
                return
            }
            setProjects(r.data().projects);
        }
        getData()       
    },[])
    
    const location = useLocation()
    const navigate = useNavigate()
    let message = "";
    let type = "";
    if (location.state) {
        message = location.state.message
        type = location.state.type
    }

    useEffect(() => {
        if (location.state) {
            const timer = setTimeout(()=> {
                navigate(location.state, {})
            }, 3000)
            
            return () => clearTimeout(timer)
        }
    },[])

    return (
        
            <main className={Styles.main}>
                <MainTitleWithButton title="Meus Projetos" to="/newproject" btnText="Criar Projeto" />
                {message && <Message msg={message} type={type} />}
                <ProjectsContext.Provider value={projects}>
                    <ProjectsOpen />
                </ProjectsContext.Provider>
                
            </main>
    )
}