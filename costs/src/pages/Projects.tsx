import { useState, useEffect, useContext } from "react"
import MainTitleWithButton from "../components/layout/MainTitleWithButton"
import Message from "../components/layout/Message"
import ProjectCard from "../components/layout/ProjectCard"
import Loading from "../components/layout/Loading";
import { ProjectsContext } from "../components/contexts/Contexts";

export default function Projects() {
    
    const projects = useContext(ProjectsContext)
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false)
    },[])

    return (
        <main className="flex flex-col gap-y-7 md:gap-y-14">
            <MainTitleWithButton to="/newproject" btnText="Criar Projeto">
                Meus Projetos
            </MainTitleWithButton>
            <Message />
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