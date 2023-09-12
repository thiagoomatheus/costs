import Button from "./Button"

type Props = {
    children: React.ReactNode,
    to: string,
    btnText: string,
    handleClick?: () => void
}

export default function MainTitleWithButton({children, to, btnText, handleClick}: Props) {

    return (
        <div className="flex flex-row justify-between items-center">
            <h1 className="text-5xl font-bold">{children}</h1>
            <Button to={to} text={btnText} handleClick={handleClick}/>
        </div>
    )
}