import { useEffect, useState, useContext } from "react"
import Styles from "./Message.module.css"
import { MessageContext } from "../contexts/MessageContextProvider"

export default function Message() {

    const [visible, setVisible] = useState(false)
    const { message } = useContext(MessageContext)

    useEffect(() => {
        if(!message) {
            setVisible(false)
            return
        }
        setVisible(true)
    }, [message])
    
    return (
        <>
            {visible && message?.message && message?.type && (
                <div className={`${Styles.message} ${Styles[message.type]}`}>
                    <p>{message.message}</p>
                </div>
            )
            }
        </>
    )
}