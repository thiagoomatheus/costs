import { Link } from 'react-router-dom'

type ButtonProps = {
    to: string,
    text: string,
    handleClick?: React.MouseEventHandler
}

function Button ({to, text, handleClick}: ButtonProps ) {
    return (
        <div className="flex items-center justify-center text-xl text-white bg-[#222] border-none no-underline py-3 px-4 hover:bg-black hover:text-[#fb3] duration-500">
            <Link to={to} onClick={handleClick}>{text}</Link>
        </div>
    )
}

export default Button