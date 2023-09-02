import loading from "../../assets/loading.svg"
import Styles from "./Loading.module.css"

function Loading() {
    return (
        <div className={Styles.loadingContainer}>
            <img className={Styles.loader} src={loading} alt="Loading" />
        </div>
    )
}

export default Loading