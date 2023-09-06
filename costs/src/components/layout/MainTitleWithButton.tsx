import Button from "./Button"
import Styles from "./MainTitleWithButton.module.css"

type Props = {
    title: string,
    to: string,
    btnText: string,
    action?: () => void
}

function MainTitleWithButton({title, to, btnText, action}: Props) {

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