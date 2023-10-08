import { MdOutlineModeEditOutline as Edit, MdDeleteOutline as Delete } from "react-icons/md";

type Props = {
    text: string,
    icon: string,
    handleClick: React.MouseEventHandler
}

export default function ButtonWithIcon({text, icon, handleClick}: Props) {

    function setIcon(icon: string) {
        if (icon === "edit") {
            return <Edit />
        }
        else if (icon === "delete") {
            return <Delete />
        }
    }

    return (
        <>
            <button className="flex items-center gap-x-2 text-sm w-[85px] p-2 border border-[#222] hover:bg-black hover:text-[#fb3]" onClick={handleClick}>{setIcon(icon)}{text}</button>
        </>
    )
}