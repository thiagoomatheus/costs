import { createContext } from "react"
import { Categories, ProjectType } from "../../App"
import { Message } from "../hooks/useMessage"

export const MessageContext = createContext<{
    message: Message | undefined,
    type: "error" | "success" | undefined
} | undefined>(undefined)

export const SetMessageContext = createContext<React.Dispatch<React.SetStateAction<{
    message: Message | undefined,
    type: "error" | "success" | undefined
} | undefined>>>(() => {})

export const CategoriesContext = createContext<Categories | undefined>(undefined)

export const ProjectsContext = createContext<ProjectType[] | undefined>(undefined)

export const SetProjectsContext = createContext<React.Dispatch<React.SetStateAction<ProjectType[] | undefined>>>(() => {})

export const UserContext = createContext<string | undefined>(undefined)

export const SetUserContext = createContext<React.Dispatch<React.SetStateAction<string | undefined>>>(() => {})