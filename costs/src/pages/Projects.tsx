import { useLocation, useNavigate} from "react-router-dom"
import { useState, useEffect, createContext } from "react"
import { doc, getDoc } from "firebase/firestore"
import uuid from "react-uuid"
import { db } from "../App"
import { ProjectType } from "../components/form/ProjectForm"
import MainTitleWithButton from "../components/layout/MainTitleWithButton"
import Message from "../components/layout/Message"
import Card from "../components/projects/Card"
import Loading from "../components/layout/Loading";

export type ProjectsData = [
    ProjectType
] | undefined

export const ProjectsContext = createContext<ProjectsData>(undefined)

export default function Projects() {
    const [projects, setProjects] = useState<ProjectsData>();
    const [loading, setLoading] = useState<boolean>(true);

    const location = useLocation()
    const navigate = useNavigate()
    let message = "";
    let type = "";
    if (location.state) {
        message = location.state.message
        type = location.state.type
    }

    useEffect(() => {
        const docRef = doc(db, "projects", "3lMligpcZ07hUbWgKvrD")
        const getData = async () => {
            const r = await getDoc(docRef)
            if (!r.exists()) {
                console.log("erro");
                return
            }
            setProjects(r.data().projects);
            setLoading(false)
        }
        getData()
    },[])

    // const [projects, setProjects] = useState(JSON.parse(localStorage.getItem("projects"))) // Com localStorage - funcionando

    useEffect(() => {
        if (location.state) {
            const timer = setTimeout(()=> {
                navigate(location.state, {})
            }, 3000)
            
            return () => clearTimeout(timer)
        }
    },[])

    return (
        <main className="flex flex-col gap-y-14 px-20">
            <MainTitleWithButton title="Meus Projetos" to="/newproject" btnText="Criar Projeto" />
            {message && <Message msg={message} type={type} />}
            <ProjectsContext.Provider value={projects}>
                {loading && (
                    <Loading />
                )}
                {!loading && !projects?.length && (
                    <p>Que pena! Você ainda não tem um projeto. Crie um clicando no botão acima e visualize aqui!</p>
                )}
                {projects && (
                    <div className="flex flex-row flex-wrap gap-x-9 gap-y-10">
                        {projects.map((project) => (
                                <Card key={project.id} project={project} setProjects={setProjects}/>
                        )
                        )}
                    </div>
                )}
            </ProjectsContext.Provider>
        </main>
    )
}