import { useLocation, useNavigate} from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { ProjectsContext } from "../App"
import MainTitleWithButton from "../components/layout/MainTitleWithButton"
import Message from "../components/layout/Message"
import Card from "../components/projects/Card"
import Loading from "../components/layout/Loading";

export default function Projects() {
    
    const projects = useContext(ProjectsContext)

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
        setLoading(false)
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
        <main className="flex flex-col gap-y-7 px-5 md:gap-y-14 md:px-20">
            <MainTitleWithButton to="/newproject" btnText="Criar Projeto">
                Meus Projetos
            </MainTitleWithButton>
            {message && <Message msg={message} type={type} />}
            {loading && (
                <Loading />
            )}
            {!loading && !projects?.length && (
                <p>Que pena! Você ainda não tem um projeto. Crie um clicando no botão acima e visualize aqui!</p>
            )}
            {projects && (
                <div className="flex flex-row justify-center sm:justify-start flex-wrap gap-x-9 gap-y-10">
                    {projects.map((project) => (
                        <Card key={project.id} project={project} />
                    )
                    )}
                </div>
            )}
        </main>
    )
}