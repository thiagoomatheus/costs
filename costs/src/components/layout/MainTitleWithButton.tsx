import Button from "./Button"
import Styles from "./MainTitleWithButton.module.css"

function MainTitleWithButton({title, to, btnText, action}) {

    function handleClick() {
        if (action) {
            action()
            return
        }
    }

    return (
    <header className={Styles.header}>
        <h1>{title}</h1>
        <Button to={to} text={btnText} handleClick={handleClick} />
    </header>
    )
}

export default MainTitleWithButton