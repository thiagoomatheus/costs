import { Link } from 'react-router-dom'

type ButtonProps = {
    to: string,
    text: string,
    handleClick?: React.MouseEventHandler
}

export default function Button ({to, text, handleClick}: ButtonProps ) {
    return (
        <div className="flex items-center px-3 py-2 text-white justify-center bg-[#222] hover:bg-black">
            <Link to={to} onClick={handleClick}>{text}</Link>
        </div>
    )
}