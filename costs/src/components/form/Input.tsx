type Props = {
    children: React.ReactNode,
    name?: string
    type: string,
    placeholder?: string,
    value?: string | number | readonly string[] | undefined,
    handleChange: React.Dispatch<React.SetStateAction<any>>,
    handleClick?: React.MouseEventHandler,
    autocomplete?: 'on'
}

export default function Input({ children, name, type, placeholder, value, handleChange, handleClick, autocomplete }: Props) {
    return (
        <label className="flex flex-col gap-y-3 font-bold">{children}
            <input name={name} className="font-normal p-2 text-gray-700 border-2 rounded-md border-black" type={type} value={value} placeholder={placeholder} onChange={handleChange} required={true} onClick={handleClick} autoComplete={autocomplete ? autocomplete : 'off'} />
        </label>
    )
}