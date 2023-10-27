import { createContext, useState } from "react"
import { Message } from "../hooks/useMessage"

export const MessageContext = createContext<{

    message: {
        message: Message | undefined,
        type: "error" | "success" | undefined
    } | undefined

    setMessage: React.Dispatch<React.SetStateAction<{
        message: Message | undefined,
        type: "error" | "success" | undefined
    } | undefined>>
    
}>({
    message: undefined,
    setMessage: () => {}
})

type Props = {
    children: React.ReactNode
}

export default function MessageContextProvider( { children }: Props) {
    
    const [message, setMessage] = useState<{
        message: Message | undefined,
        type: "error" | "success" | undefined
    }>()

    return (

        <MessageContext.Provider value={{
            message: message,
            setMessage: setMessage
        }}>

            {children}

        </MessageContext.Provider>
        
    )

}