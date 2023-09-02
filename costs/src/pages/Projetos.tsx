import MainTitleWithButton from "../components/layout/MainTitleWithButton"
import ProjectsOpen from '../components/projects/ProjectsOpen'
import Styles from "./Projetos.module.css"
import Message from "../components/layout/Message"
import { useLocation, useNavigate} from "react-router-dom"
import { useEffect } from "react"

function Projetos() {
    

    const location = useLocation()
    const navigate = useNavigate()
    let message = "";
    let type = "";
    if (location.state) {
        message = location.state.message
        type = location.state.type
    }

    useEffect(() => {
        if (location.state) {
            const timer = setTimeout(()=> {
                navigate(location.state, {})
            }, 3000)
            
            return () => clearTimeout(timer)
        }
    })

    return (
        <main className={Styles.main}>
            <MainTitleWithButton title="Meus Projetos" to="/newproject" btnText="Criar Projeto" />
            {message && <Message msg={message} type={type} />}
            <ProjectsOpen />
        </main>
    )
}

export default Projetos