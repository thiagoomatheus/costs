import Styles from './Card.module.css'
import ButtonWithIcon from './ButtonWithIcon'
import { useNavigate } from "react-router-dom"
import { ProjectType } from '../form/ProjectForm'

type Props = {
    id: number,
    name: string,
    budget: number,
    category: string,
    projects: ProjectType,
    setProjects: () => void
}

function Card({id, name, budget, category, projects, setProjects}: Props) {

    // function deleteProject() { // Funcionando com localStorage
    //     projects = projects.filter(projects => projects.id !== id)
    //     localStorage.setItem("projects", JSON.stringify(projects))
    //     setProjects(projects)
    // }

    const navigate = useNavigate()

    function deleteProject() {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        })
        .then(() => {
            setProjects(projects.filter(projects => projects.id !== id))
            navigate("/projects", {state: {message: "Projeto removido com sucesso", type: "error"}})
        })
        .catch((err) => console.log(err))
    }

    function editProjects() {
        navigate(`/projects/${id}`)
    }

    return (
        <div className={Styles.cardContainer}>
            <h2>{name}</h2>
            <p><span>Orçamento:</span> R$ {budget}</p>
            <p className={Styles.cardCategory}><span className={`${Styles[category.toLowerCase()]}`}></span>{category}</p>
            <div className={Styles.cardButtons}>
                <ButtonWithIcon text="Editar" icon='edit' action={editProjects} />
                <ButtonWithIcon text="Delete" icon='delete' action={deleteProject} />
            </div>
        </div>
    )
}

export default Card