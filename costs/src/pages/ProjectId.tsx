import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import MainTitleWithButton from "../components/layout/MainTitleWithButton"
import Loading from "../components/layout/Loading"
import { ProjectType, ServiceType, UserContext } from "../App"
import ServiceForm from "../components/form/ServiceForm"
import Message from "../components/layout/Message"
import ServiceCard from "../components/layout/ServiceCard"
import { ProjectsContext, SetProjectsContext, db } from "../App"
import { doc, setDoc } from "firebase/firestore"
import ProjectForm from "../components/form/ProjectForm"

export default function ProjectId() {

    const projects = useContext(ProjectsContext)
    const setProjects = useContext(SetProjectsContext)
    const uid = useContext(UserContext)

    // Hooks
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    const [project, setProject] = useState<ProjectType>()
    const [showSection, setShowSection] = useState<"loading" | "showData" | "editProject" | "createService" | "editService">("loading")
    const [serviceData, setServiceData] = useState<ServiceType | undefined>(undefined)

    // Message
    let message = "";
    let type = "";

    if (location.state) {
        message = location.state.message
        type = location.state.type
    }

    useEffect(() => {
        if (location.state) {
            const timer = setTimeout(() => {
                navigate(location.state, {})
            }, 3000)

            return () => clearTimeout(timer)
        }
    },[project])

    useEffect(() => {
        if (projects !== undefined) {
            setProject(projects.filter((project) => project.id === id)[0])            
            setShowSection("showData")
        }
    },[projects])

    // Action Form

    async function editData(project: ProjectType) {

    if (project.cost !== undefined && project.budget && uid) {
        if (project.cost > project.budget) {
            navigate(`/projects/${project.id}`, { state: { message: "O orçamento não pode ser menor que o custo do projeto", type: "error" } })
            return
        }
        if (typeof project.budget === "string") {
            const data = {
                id: project.id,
                name: project.name,
                budget: parseFloat(project.budget),
                cost: project.cost,
                category: project.category,
                services: project.services
            }
            try {
                setDoc(doc(db, uid, project.id), data, {merge: true})
                const newProjects = projects?.map(projectServer => {
                    if (projectServer.id !== id) {
                        return projectServer
                    } else {
                        return {
                            ...project
                        }
                    }
                })
                setProject(project)
                setProjects(newProjects)
                navigate(`/projects/${project.id}`, { state: { message: "Projeto alterado com sucesso", type: "success" } })
                setShowSection("showData")
            } catch (error) {
                console.log(error);
            }
        }
    }
    }

    async function createService(service: ServiceType) {
        if (project && project.budget && project.cost !== undefined && typeof service.cost === "string") {
            if (project.budget < (project.cost + parseFloat(service.cost))) {
                navigate(`/projects/${id}`, { state: { message: "Valor de serviços ultrapassaram o orçamento", type: "error" } })
                return
            }
            const newCost = project.cost + parseFloat(service.cost)
            try {
                if (id && uid) {
                    const newProject: ProjectType = {
                        id: id,
                        name: project?.name,
                        budget: project?.budget,
                        cost: newCost,
                        category: project?.category,
                        services: [
                            ...(project?.services !== undefined ? project.services : []),
                            {
                                ...service,
                                cost: parseFloat(service.cost)
                            }
                         ]
                    }
                    await setDoc(doc(db, uid, id), newProject, {merge: true})
                    
                    const newProjects = projects?.map(projectServer => {
                        if (projectServer.id !== id) {
                            return projectServer
                        } else {
                            return {
                                ...newProject
                    }}})
                    setProject(newProject)
                    setProjects(newProjects)
                    navigate(`/projects/${id}`, { state: { message: "Projeto alterado com sucesso", type: "success" } })
                    setShowSection("showData")
                }
            } catch (error) {
                console.log(error);
            }
        }
        
        
    }

    async function removeService(service: ServiceType) {
        try {
            if (id && project?.cost && uid) {
                const newCost = project?.cost - service.cost
                const newProject: ProjectType = {
                    id: id,
                    name: project?.name,
                    budget: project?.budget,
                    cost: newCost,
                    category: project?.category,
                    services: project?.services?.filter(serviceServer => serviceServer.id !== service.id)
                }
                await setDoc(doc(db, uid, id), newProject, {merge: true})
                const newProjects = projects?.map(projectServer => {
                    if (projectServer.id !== id) {
                        return projectServer
                    } else {
                        return {
                            ...newProject
                }}})
                setProject(newProject)
                setProjects(newProjects)
                navigate(`/projects/${id}`, { state: { message: "Serviço excluido com sucesso", type: "error" } })
            }
        } catch (error) {
            console.log(error)
        }
    }

    function editService(service: ServiceType) {
        setServiceData(service)
        setShowSection("editService")
    }

    async function updateService(service:ServiceType) {
        if (project && project.budget && project.cost !== undefined && typeof service.cost === "string") {
            const previousCostService = project.services?.filter(serviceServer => serviceServer.id === service.id)
            const newCost = (project.cost - (previousCostService ? previousCostService[0].cost : 0)) + (parseFloat(service.cost))
            if (project.budget < newCost) {
                navigate(`/projects/${id}`, { state: { message: "Valor de serviços ultrapassaram o orçamento", type: "error" } })
                return
            }
            try {
                if (id && uid) {
                    const newProject: ProjectType = {
                        id: id,
                        name: project?.name,
                        budget: project?.budget,
                        cost: newCost,
                        category: project?.category,
                        services: project?.services?.map(serviceServer => {
                            if (serviceServer.id === service.id && typeof service.cost === "string") {
                                return {
                                    ...service,
                                    cost: parseFloat(service.cost)
                                }
                            } else {
                                return serviceServer
                            }
                        })
                    }
                    await setDoc(doc(db, uid, id), newProject, {merge: true})
                    
                    const newProjects = projects?.map(projectServer => {
                        if (projectServer.id !== id) {
                            return projectServer
                        } else {
                            return {
                                ...newProject
                    }}})
                    setProject(newProject)
                    setProjects(newProjects)
                    navigate(`/projects/${id}`, { state: { message: "Serviço alterado com sucesso", type: "success" } })
                    setShowSection("showData")
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <main className="flex flex-col mx-10 gap-y-10">
            {showSection === "loading" && <Loading />}

            {message && <Message msg={message} type={type} />}

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
                                        <ServiceCard service={service} handleRemove={removeService} key={service.id} handleEditService={editService} />
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
                <ProjectForm btnText="Salvar alterações" dataProject={project} handleSubmit={editData} />
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
                <ServiceForm btnText="Salvar alterações" serviceData={serviceData} handleSubmit={updateService} />
            )}
        </main>
    )
}