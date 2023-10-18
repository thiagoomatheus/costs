import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import MainTitleWithButton from "../components/layout/MainTitleWithButton"
import Loading from "../components/layout/Loading"
import { ProjectType, ServiceType } from "../App"
import ServiceForm from "../components/form/ServiceForm"
import Message from "../components/layout/Message"
import ServiceCard from "../components/layout/ServiceCard"
import ProjectForm from "../components/form/ProjectForm"
import useProjects from "../components/hooks/useProjects"
import { ProjectsContext } from "../components/contexts/Contexts"

export default function ProjectId() {

    const { editProject, createService, editService, removeService } = useProjects()
    const projects = useContext(ProjectsContext)
    const { id } = useParams()

    const [project, setProject] = useState<ProjectType>()
    const [showSection, setShowSection] = useState<"loading" | "showData" | "editProject" | "createService" | "editService">("loading")
    const [serviceData, setServiceData] = useState<ServiceType | undefined>(undefined)

    // // Message
    // let message = "";
    // let type = "";

    // if (location.state) {
    //     message = location.state.message
    //     type = location.state.type
    // }

    // useEffect(() => {
    //     if (location.state) {
    //         const timer = setTimeout(() => {
    //             navigate(location.state, {})
    //         }, 3000)

    //         return () => clearTimeout(timer)
    //     }
    // },[project])

    useEffect(() => {
        if (projects !== undefined) {
            setProject(projects.filter((project) => project.id === id)[0])            
            setShowSection("showData")
        }
    },[projects])

    return (
        <main className="flex flex-col gap-y-10">
            {showSection === "loading" && <Loading />}

            <Message />

            {project && (
                <MainTitleWithButton to="" btnText={showSection === "showData" ? "Editar projeto" : "Fechar"} handleClick={() => {
                    if (showSection === "showData") {
                        setShowSection("editProject")
                        return
                    }
                    setShowSection("showData")
                }}>
                    Projeto: {project.name}
                </MainTitleWithButton>
            )}

            {project && showSection === "showData" && (
                <>
                    <div className="flex flex-col gap-y-3 pb-8 border-b-2 border-black">
                        <p>
                            <span className="font-bold">Categoria:</span> {project.category}
                        </p>
                        <p>
                            <span className="font-bold">Total Orçamento:</span> R$ {project.budget}
                        </p>
                        <p>
                            <span className="font-bold">Total Utilizado:</span> R$ {project.cost}
                        </p>
                    </div>
                    <MainTitleWithButton to="" btnText={showSection === "showData" ? "Adicionar serviço" : "Fechar"} handleClick={() => {
                        if (showSection === "showData") {
                            setShowSection("createService")
                            return
                        }
                        setShowSection("showData")
                    }}>
                        Serviços
                    </MainTitleWithButton>
                    {project?.services && (
                        <>
                            {project.services.length > 0 ? (
                            <div className="flex flex-col gap-x-9 gap-y-10">
                                {project.services?.map((service) => (
                                        <ServiceCard service={service} handleRemove={removeService} key={service.id} handleEditService={() => {
                                            setServiceData(service)
                                            setShowSection("editService")
                                        }} />
                                    ))
                                }
                            </div>
                        ) : (
                            <p>Adicione um serviço</p>
                        )}
                        </>
                    )}
                </>
            )}

            {project && showSection === "editProject" && (
                <ProjectForm btnText="Salvar alterações" dataProject={project} handleSubmit={editProject} />
            )}

            {project && showSection === "createService" && (
                <>
                    <div className="flex flex-col gap-y-3 pb-8 border-b-2 border-black">
                        <p>
                            <span className="font-bold">Categoria:</span> {project.category}
                        </p>
                        <p>
                            <span className="font-bold">Total Orçamento:</span> R$ {project.budget}
                        </p>
                        <p>
                            <span className="font-bold">Total Utilizado:</span> R$ {project.cost}
                        </p>
                    </div>
                    <ServiceForm btnText='Adicionar serviço' handleSubmit={createService} />
                </>
            )}

            {showSection === "editService" && (
                <ServiceForm btnText="Salvar alterações" serviceData={serviceData} handleSubmit={editService} />
            )}
        </main>
    )
}