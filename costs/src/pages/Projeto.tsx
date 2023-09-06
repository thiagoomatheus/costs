import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import MainTitleWithButton from "../components/layout/MainTitleWithButton"
import Loading from "../components/layout/Loading"
import ProjectForm, { ProjectType } from "../components/form/ProjectForm"
import ServiceForm from "../components/form/ServiceForm"
import Message from "../components/layout/Message"
import Styles from "./Projeto.module.css"
import styleContainer from "../components/Projects/ProjectsOpen.module.css"
import ServiceCard from "../components/layout/ServiceCard"

export default function Projeto() {

    // Hooks
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [showProject, setShowProject] = useState(true)
    const [showService, setShowService] = useState(true)

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

    function changeProjectBtnText() {
        setShowProject(!showProject)
    }

    function changeServiceBtnText() {
        setShowService(!showService)
    }

    // Action Form
    function editData(project: ProjectType) {
        if (project.cost > project.budget) {
            navigate(`/projects`, { state: { message: "O orçamento não pode ser menor que o custo do projeto", type: "error" } })
            return
        }

        fetch(`http://localhost:5000/projects/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json()
        ).then(
            (data) => {
                setProjects(data);
                navigate(`/projects/${id}`, { state: { message: "Projeto alterado com sucesso", type: "success" } })
                changeProjectBtnText()
            }
        ).catch(
            (err) => console.log(err)
        )
    }

    function createService(project: ProjectType) {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json()
        ).then(
            (data) => {
                setProjects(data);
                navigate(`/projects/${id}`, { state: { message: "Serviço adicionado com sucesso", type: "success" } })
                changeServiceBtnText()
            }
        ).catch(
            (err) => console.log(err)
        )
    }

    function removeService(id, cost) {
        const servicesUpdate = projects.services.filter((service) => service.id !== id)
        const projectUpdate = projects
        projectUpdate.services = servicesUpdate
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)
        
        fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(projectUpdate)
        }).then((resp) => resp.json()
        ).then(
            () => {
                setProjects(projectUpdate);
                navigate(`/projects/${projectUpdate.id}`, { state: { message: "Serviço removido com sucesso", type: "error" } })
            }
        ).catch(
            (err) => console.log(err)
        )
    }

    return (
        <main className={Styles.main}>
            {loading ? <Loading /> : <MainTitleWithButton title={`Projeto: ${projects.name}`} btnText={showProject ? "Editar projeto" : "Fechar"} action={changeProjectBtnText} />}

            {showProject ? (
                <>
                    {showProject && (
                        <>
                            {message && <Message msg={message} type={type} />}
                            <div className={Styles.container}>
                                <p>
                                    <span>Categoria:</span> {projects.category}
                                </p>
                                <p>
                                    <span>Total Orçamento:</span> R$ {projects.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> R$ {projects.cost}
                                </p>
                            </div>
                            <>
                                <MainTitleWithButton title="Serviços" btnText={showService ? "Adicionar serviço" : "Fechar"} action={changeServiceBtnText} />
                                {showService ? (
                                    <>
                                        {projects.services && (
                                            <div className={styleContainer.projectsContainer}>
                                                {projects.services.length ? (
                                                    projects.services.map(({ service, cost, description, id }) => (
                                                        <ServiceCard service={service} cost={cost} description={description} id={id} handleRemove={removeService} key={id} />
                                                    ))
                                                ) : (
                                                    <p>Adicione um serviço</p>
                                                )}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <ServiceForm project={projects} btnText="Adicionar serviço" action={createService} />
                                    </>
                                )}
                            </>
                        </>
                    )}
                </>
            ) : (
                <>
                    <ProjectForm btnText="Salvar alterações" action={editData} project={projects} />
                </>
            )}

        </main>
    )
}