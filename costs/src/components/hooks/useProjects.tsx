import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import useMessage, { Message } from "./useMessage"
import { ProjectsContext, SetProjectsContext, UserContext } from "../contexts/Contexts"
import { ProjectType, ServiceType } from "../types/types"
import { db } from "../../App"

export default function useProjects() {
    const { id } = useParams()
    const projects = useContext(ProjectsContext)
    const setProjects = useContext(SetProjectsContext)
    const uid = useContext(UserContext)
    const { generateMessage } = useMessage()

    const postDataInDB = async (data: ProjectType) => {
        if (uid) {
            try {
                await setDoc(doc(db, uid, data.id), data, { merge: true })
                return "success"
            } catch (error) {
                console.log(error);
                return "error"
            }
        }
        return "error"
    }

    const postDataInLocalStorage = async (data: ProjectType[]) => {
        try {
            await localStorage.setItem("projects", JSON.stringify(data))
            return "success"
        } catch (error) {
            console.log(error);
            return "error"
        }
    }

    const postData = (data: ProjectType, newProjects: ProjectType[], messageSuccess: Message, messageError: Message) => {
        if (uid) {
            postDataInDB(data)
            .then((type
                ) => {
                generateMessage(messageSuccess, messageError, type)
                switch (type) {
                    case "error":
                        break;
                    case "success":
                        setProjects(newProjects)
                }
            })
        } else {
            postDataInLocalStorage(newProjects)
            .then((type) => {
                generateMessage(messageSuccess, messageError, type)
                switch (type) {
                    case "error":
                        break;
                    case "success":
                        setProjects(newProjects)
                }
            })
        }
    }
    
    const checkNumbersInProject: (project: ProjectType) => ProjectType = (project: ProjectType) => {
        if (typeof project.budget === "string") {
            return {
                ...project,
                budget: parseFloat(project.budget)
            }
        } else if (typeof project.cost === "string") {
            return {
                ...project,
                cost: parseFloat(project.cost)
            }
        } else if (typeof project.budget === "string" && typeof project.cost === "string") {
            return {
                ...project,
                budget: parseFloat(project.budget),
                cost: parseFloat(project.cost)
            }
        } else {
            return project
        }
    }

    const checkNumberInService: (service: ServiceType) => ServiceType = (service: ServiceType) => {
        if (typeof service.cost === "string") {
            return {
                ...service,
                cost: parseFloat(service.cost)
            }
        } else {
            return service
        }
    }

    const checkBudgetBelowCost = async (cost: number | undefined, budget: number | undefined) => {
        if (cost !== undefined && budget) {
            if (cost > budget) {
                generateMessage(undefined, Message.BudgetBelowCost, "error")
                return "invalid"
            }
            return "valid"  
        }
        return "invalid"
    }

    const checkServiceExpensive = async (budget: number | undefined, newCost: number | undefined): Promise<"valid" | "invalid"> => {
        if (budget && newCost) {
            if (budget < newCost) {
                generateMessage(undefined, Message.ServiceExpensive, "error")
                return "invalid"
            }
            return "valid"
        }
        return "invalid"
    }

    const createProject = (project: ProjectType) => {
        const data = checkNumbersInProject(project)
        const newProjects = [
            ...(projects ? projects : []),
            data
        ]
        postData(data, newProjects, Message.CreatedProject, Message.FailedCreateProject)
    }

    const editProject = (project: ProjectType) => {
        const data = checkNumbersInProject(project)
        checkBudgetBelowCost(data.cost, data.budget)
        .then((response) => {
            switch (response) {
                case "invalid":
                    break;
                case "valid":
                    if (projects) {
                        const newProjects = projects.map(projectServer => {
                            if (projectServer.id === id) {
                                return data
                            } else {
                                return projectServer
                            }
                        })
                        postData(data, newProjects, Message.EditedProject, Message.FailedEditProject)
                    }
                    break
            }
        })
    }

    const removeProject = async (projectId: string) => {
        if (projects) {
            const newProjects = projects?.filter(project => project.id !== projectId)
            if (uid) {
                try {
                    await deleteDoc(doc(db, uid, projectId))
                    setProjects(projects?.filter((item) => item.id !== projectId))
                    generateMessage(Message.RemovedProject, undefined, "success")
                } catch (error) {
                    generateMessage(undefined, Message.FailedRemoveProject, "error")
                    return
                }
            } else {
                postDataInLocalStorage(newProjects)
                .then(response => {
                    switch (response) {
                        case "error":
                            generateMessage(undefined, Message.FailedRemoveProject, response)
                            return;
                        case "success":
                            generateMessage(Message.RemovedProject, undefined, response)
                            break
                    }
                })
            }
            setProjects(newProjects)
        }
         
    }

    const createService = (service: ServiceType) => {
        const newService = checkNumberInService(service)
        const project = projects?.filter(project => project.id === id)[0]
        if (project && project.cost !== undefined) {
            const newCost = project.cost + newService.cost
            checkServiceExpensive(project.budget, newCost)
            .then((response) => {
                switch (response) {
                    case "invalid":
                        break;
                    case "valid":
                        const data: ProjectType = {
                            ...project,
                            cost: newCost,
                            services: [
                                ...(project.services ? project.services : []),
                                {
                                    ...newService,
                                }
                            ]
                        }
                        const newProjects = projects.map(projectServer => {
                            if (projectServer.id === id) {
                                return data
                            } else {
                                return projectServer
                            }
                        })
                        postData(data, newProjects, Message.CreatedService, Message.FailedCreateService)
                        break
                }
            })
        }   
    }

    const removeService = (service: ServiceType) => {
        const project = projects?.filter(project => project.id === id)[0]
        if (project && project.cost) {
            const newCost = project.cost - service.cost
            const data: ProjectType = {
                ...project,
                cost: newCost,
                services: project?.services?.filter(serviceServer => serviceServer.id !== service.id)
            }
            const newProjects = projects.map(projectServer => {
                if (projectServer.id === id) {
                    return data
                } else {
                    return projectServer
                }
            })
            postData(data, newProjects, Message.RemovedService, Message.FailedRemovedService)
        }
    }

    const editService = (service: ServiceType) => {
        const newService = checkNumberInService(service)
        const project = projects?.filter(project => project.id === id)[0]
        if (project) {
            const newProject = checkNumbersInProject(project)
            const previousCostService = newProject.services?.filter(serviceServer => serviceServer.id === service.id)[0].cost
            const newCost = ((newProject.cost ? newProject.cost : 0) - (previousCostService ? previousCostService : 0)) + newService.cost
            checkServiceExpensive(newProject.budget, newCost)
            .then((response) => {
                switch (response) {
                    case "invalid":
                        break;
                    case "valid":
                        const data: ProjectType = {
                            ...newProject,
                            cost: newCost,
                            services: newProject.services?.map(serviceServer => {
                                if (serviceServer.id === newService.id) {
                                    return newService
                                }
                                return serviceServer
                            })
                        }
                        const newProjects = projects.map(projectServer => {
                            if (projectServer.id === id) {
                                return data
                            } else {
                                return projectServer
                            }
                        })
                        postData(data, newProjects, Message.EditedService, Message.FailedEditService)
                        break
                }
            })
        }     
    }

    return {
        createProject,
        editProject,
        removeProject,
        createService,
        editService,
        removeService
    }
}