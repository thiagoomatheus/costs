import { useState, useEffect, useContext } from "react"
import { ProjectsContext } from "../App"
import MainTitleWithButton from "../components/layout/MainTitleWithButton"
import Message from "../components/layout/Message"
import ProjectCard from "../components/layout/ProjectCard"
import Loading from "../components/layout/Loading";
import useMessage from "../components/hooks/useMessage"

export default function Projects() {
    
    const projects = useContext(ProjectsContext)
    const { message, type } = useMessage()

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false)
    },[])

    // const [projects, setProjects] = useState(JSON.parse(localStorage.getItem("projects"))) // Com localStorage - funcionando

    return (
        <main className="flex flex-col gap-y-7 md:gap-y-14">
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
                        <ProjectCard key={project.id} project={project} />
                    )
                    )}
                </div>
            )}
        </main>
    )
}