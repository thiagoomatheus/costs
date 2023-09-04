type InputProps = {
    children: React.ReactNode,
    type: string,
    placeholder?: string,
    value?: string | number | readonly string[] | undefined,
    handleChange: React.Dispatch<React.SetStateAction<any>>,
    handleClick?: React.MouseEventHandler,
}

export default function Input({ children, type, placeholder, value, handleChange, handleClick }: InputProps) {
    return (
        <label className="flex flex-col gap-y-3 font-bold">{children}
            <input className="font-normal p-2 text-gray-700 border-2 rounded-md border-black" type={type} value={value} placeholder={placeholder} onChange={(e) => handleChange(e.target.value)} required={true} onClick={handleClick} />
        </label>
    )
}