import Button from "./Button"

type Props = {
    title: string,
    to: string,
    btnText: string
}

export default function MainTitleWithButton({title, to, btnText}: Props) {

    return (
        <div className="flex flex-row justify-between items-center">
            <h1 className="text-5xl font-bold">{title}</h1>
            <Button to={to} text={btnText} />
        </div>
    )
}