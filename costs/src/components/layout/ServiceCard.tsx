import ButtonWithIcon from "../projects/ButtonWithIcon"
import Styles from "../Projects/Card.module.css"

function ServiceCard({service, cost, description, id, handleRemove}) {
    
    function remove() {
        handleRemove(id, cost)
    }

    return(
        <div className={Styles.cardContainer}>
            <h2>{service}</h2>
            <p><span>Custo do serviço:</span> R$ {cost}</p>
            <p><span>Descrição do serviço:</span> {description}</p>
            <ButtonWithIcon text="Excluir" icon="delete" action={remove}/>
        </div>
    )
}

export default ServiceCard