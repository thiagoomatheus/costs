import { MdOutlineModeEditOutline as Edit, MdDeleteOutline as Delete } from "react-icons/md";
import Styles from "./ButtonWithIcon.module.css"

function ButtonWithIcon({text, icon, action}) {

    function setIcon(icon) {
        if (icon === "edit") {
            return <Edit />
        }
        else if (icon === "delete") {
            return <Delete />
        }
    }

    return (
        <>
            <button className={Styles.button} onClick={action}>{setIcon(icon)}{text}</button>
        </>
    )
}

export default ButtonWithIcon