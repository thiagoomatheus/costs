import { useNavigate } from "react-router-dom"
import Form from "../components/form/ProjectForm"
import Styles from './NewProject.module.css'

function NewProject() {

    const navigate = useNavigate()

    function postData(project: Array[]) {

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(project)
        }).then(
            (data) => {
                console.log(data);
                navigate("/projects", {state: {message: "Projeto criado com sucesso", type: "success"}})
            } 
        ).catch(
            (err) => console.log(err)
        )
    }

    return (
        <main className={Styles.main}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <Form btnText="Criar projeto" action={postData}/>
        </main>
    )
}

export default NewProject