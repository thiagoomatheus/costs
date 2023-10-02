import { ServiceType } from "../../App"
import ButtonWithIcon from "../projects/ButtonWithIcon"

type Props = {
    service: ServiceType
    handleRemove: (service: ServiceType) => void
    handleEditService?: (service: ServiceType) => void
}

export default function ServiceCard({service, handleRemove, handleEditService}: Props) {

    return (
            <div className="grid grid-cols-serviceCard gap-x-5 items-center w-full p-4 text-[#575757] rounded-md border border-[#575757] shadow-md">
            <h2 className='p-2 bg-[#222] text-orange font-bold text-xl'>{service.title}</h2>
            <p><span className='font-bold'>Custo do serviço:</span> R$ {service.cost}</p>
            <p><span className='font-bold'>Descrição do serviço:</span> {service.description}</p>
            <ButtonWithIcon text="Excluir" icon="delete" handleClick={() => {
                handleRemove(service)
            }}/>
            {handleEditService && (
                <ButtonWithIcon text="Editar" icon="edit" handleClick={() => {
                    handleEditService(service)
                }} />
            )}
        </div>
    )
}