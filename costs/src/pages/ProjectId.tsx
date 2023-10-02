import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import MainTitleWithButton from "../components/layout/MainTitleWithButton"
import Loading from "../components/layout/Loading"
import { ProjectType, ServiceType } from "../App"
import ServiceForm from "../components/form/ServiceForm"
import Message from "../components/layout/Message"
import ServiceCard from "../components/layout/ServiceCard"
import { ProjectsContext, SetProjectsContext, db } from "../App"
import { arrayRemove, arrayUnion, doc, setDoc, updateDoc} from "firebase/firestore"
import ProjectForm from "../components/form/ProjectForm"

export default function ProjectId() {

    const projects = useContext(ProjectsContext)
    const setProjects = useContext(SetProjectsContext)

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
    })

    // Functions

    // useEffect(() => {
    //     fetch(`http://localhost:5000/projects/${id}`)
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //             setProjects(data)
    //             setLoading(false)
    //             setShowProject(true)
    //             setShowService(true)
    //         })
    //         .catch((err) => console.log(err))
    // }, [id])

    useEffect(() => {
        if (projects !== undefined) {
            setProject(projects.filter((project) => project.id === id)[0])            
            setShowSection("showData")
        }
    },[projects])

    // Action Form

    async function editData(project: ProjectType) {
        // if (project.cost > project.budget) {
        //     navigate(`/projects`, { state: { message: "O orçamento não pode ser menor que o custo do projeto", type: "error" } })
        //     return
        // }

    //     fetch(`http://localhost:5000/projects/${id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //         body: JSON.stringify(project)
    //     }).then((resp) => resp.json()
    //     ).then(
    //         (data) => {
    //             setProjects(data);
    //             navigate(`/projects/${id}`, { state: { message: "Projeto alterado com sucesso", type: "success" } })
    //             changeProjectBtnText()
    //         }
    //     ).catch(
    //         (err) => console.log(err)
    //     )
    if (project.cost !== undefined && project.budget) {
        if (project.cost > project.budget) {
            navigate(`/projects/${project.id}`, { state: { message: "O orçamento não pode ser menor que o custo do projeto", type: "error" } })
            return
        }
        try {
            setDoc(doc(db, 'userId', project.id), project, {merge: true})
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

    async function createService(service: ServiceType) {

        // fetch(`http://localhost:5000/projects/${id}`, {
        //     method: "PATCH",
        //     headers: {
        //         "Content-type": "application/json",
        //     },
        //     body: JSON.stringify(project)
        // }).then((resp) => resp.json()
        // ).then(
        //     (data) => {
        //         setProjects(data);
        //         navigate(`/projects/${id}`, { state: { message: "Serviço adicionado com sucesso", type: "success" } })
        //         changeServiceBtnText()
        //     }
        // ).catch(
        //     (err) => console.log(err)
        // )
        if (project && project.budget && project.cost !== undefined) {
            if (project.budget < (project.cost + service.cost)) {
                navigate(`/projects/${id}`, { state: { message: "Valor de serviços ultrapassaram o orçamento", type: "error" } })
                return
            }
            const newCost = project.cost + service.cost // está retornando string
            try {
                if (id) {
                    const newProject: ProjectType = {
                        id: id,
                        name: project?.name,
                        budget: project?.budget,
                        cost: newCost,
                        category: project?.category,
                        services: [
                            ...(project?.services !== undefined ? project.services : []),
                            service
                         ]
                    }
                    await setDoc(doc(db, 'userId', id), newProject, {merge: true})
                    
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
    //     const servicesUpdate = projects.services.filter((service) => service.id !== id)
    //     const projectUpdate = projects
    //     projectUpdate.services = servicesUpdate
    //     projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)
        
    //     fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //         body: JSON.stringify(projectUpdate)
    //     }).then((resp) => resp.json()
    //     ).then(
    //         () => {
    //             setProjects(projectUpdate);
    //             navigate(`/projects/${projectUpdate.id}`, { state: { message: "Serviço removido com sucesso", type: "error" } })
    //         }
    //     ).catch(
    //         (err) => console.log(err)
    //     )
        try {
            if (id) {
                await updateDoc(doc(db, 'userId', id), {
                    services: arrayRemove(service)
                })
                const newProject: ProjectType = {
                    id: id,
                    name: project?.name,
                    budget: project?.budget,
                    cost: project?.cost,
                    category: project?.category,
                    services: project?.services?.filter(serviceServer => serviceServer.id !== service.id)
                }
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
        const newServices = project?.services?.map(serviceServer => {
            if (serviceServer.id === service.id) {
                return {
                    ...service
                }
            } else {
                return serviceServer
            }
        })
        if (id) {
            await updateDoc(doc(db, 'userId', id), {
                services: newServices
            })
            const newProject: ProjectType = {
                id: id,
                name: project?.name,
                budget: project?.budget,
                cost: project?.cost,
                category: project?.category,
                services: newServices
            }
            const newProjects = projects?.map(projectServer => {
                if (projectServer.id !== id) {
                    return projectServer
                } else {
                    return {
                        ...newProject
            }}})
            setProject(newProject)
            setProjects(newProjects)
        }
        navigate(`/projects/${id}`, { state: { message: "Serviço alterado com sucesso", type: "success" } })   
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