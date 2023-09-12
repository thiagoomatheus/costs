import ButtonWithIcon from "../projects/ButtonWithIcon"

type Service = {
        id: number;
        service: string;
        cost: number;
        description: string;
}

type Props = {
    service: Service,
    handleRemove: (id: number, cost: number | undefined) => void
}

export default function ServiceCard({service, handleRemove}: Props) {
    
    function remove() {
        handleRemove(service.id, service.cost)
    }

    return(
        <div className="">
            <h2>{service.service}</h2>
            <p><span>Custo do serviço:</span> R$ {service.cost}</p>
            <p><span>Descrição do serviço:</span> {service.description}</p>
            <ButtonWithIcon text="Excluir" icon="delete" handleClick={remove}/>
        </div>
    )
}