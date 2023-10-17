import ButtonWithIcon from './ButtonWithIcon'
import { useNavigate } from "react-router-dom"
import { ProjectType } from '../../App'

import useProjects from '../hooks/useProjects';

type Props = {
    project: ProjectType
}

export default function ProjectCard({project}: Props) {

    const { removeProject } = useProjects()
    const navigate = useNavigate()

    let color: string = ""

    if (project.category === "Infra") {
        color = "#ffaebc";
    } else if (project.category === "Desenvolvimento") {
        color = "#a0e7e5";
    } else if (project.category === "Planejamento") {
        color = "#fbe7c6";
    } else if (project.category === "Design") {
        color = "#b4f8c8";
    }    

    return (
        <>
            {project && (
                <div className="flex flex-col gap-y-5 min-h-[220px] w-64 p-4 text-[#575757] rounded-md border border-[#575757] shadow-md">
                    <h2 className='p-2 bg-[#222] text-orange font-bold text-xl'>{project.name}</h2>
                    <p><span className='font-bold'>Orçamento:</span> R$ {project.budget}</p>
                    <p className="flex items-center">
                        <span className={`block w-3 h-3 rounded-md mr-1`} style={{
                            backgroundColor: color
                        }}></span>
                        {project.category}
                    </p>
                    <div className="flex flex-row gap-x-4">
                        <ButtonWithIcon text="Editar" icon='edit' handleClick={() => {
                            navigate(`/projects/${project.id}`)
                        }} />
                        <ButtonWithIcon text="Delete" icon='delete' handleClick={() => {
                            removeProject(project.id)
                        }} />
                    </div>
                </div>
            )}
        </>
    )
}