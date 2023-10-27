import { createContext, useContext, useState, useEffect } from "react"
import { ProjectType } from "../types/types"
import useGetData from "../hooks/useGetData"
import { UserContext } from "./Contexts"


export const ProjectsContext = createContext<{
    projects: ProjectType[] | undefined,
    setProjects: React.Dispatch<React.SetStateAction<ProjectType[] | undefined>>
}>({
    projects: undefined,
    setProjects: () => {}
})

type Props = {
    children: React.ReactNode
}

export default function ProjectsContextProviver( { children }: Props ) {

    const { getProjects } = useGetData()

    const [projects, setProjects] = useState<ProjectType[] | undefined>()

    const uid = useContext(UserContext)

    useEffect(() => {
        
        getProjects()
        .then(response => {

            setProjects(response)

        })
        
    }, [uid])
    
    return (

        <ProjectsContext.Provider value={{
            projects: projects,
            setProjects: setProjects,
        }} >

            {children}

        </ProjectsContext.Provider>

    )

}