import Button from "./Button"

type Props = {
    children: React.ReactNode,
    to: string,
    btnText: string,
    handleClick?: () => void
}

export default function MainTitleWithButton({children, to, btnText, handleClick}: Props) {

    return (
        <div className="flex flex-col gap-5 sm:flex-row justify-between items-center">
            <h1>{children}</h1>
            <Button to={to} text={btnText} handleClick={handleClick}/>
        </div>
    )
}