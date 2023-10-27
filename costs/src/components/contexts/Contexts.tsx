import { createContext } from "react"

export const UserContext = createContext<string | undefined>(undefined)

export const SetUserContext = createContext<React.Dispatch<React.SetStateAction<string | undefined>>>(() => {})