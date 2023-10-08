import { useEffect, useState } from "react"
import Styles from "./Message.module.css"

type Props = {
    msg: string,
    type: string
}

export default function Message({msg, type}: Props) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(!msg) {
            setVisible(false)
            return
        }

        setVisible(true)

    }, [msg])

    return (
        <>
            {visible && (
                <div className={`${Styles.message} ${Styles[type]}`}>
                    <p>{msg}</p>
                </div>
            )
            }
        </>
    )
}