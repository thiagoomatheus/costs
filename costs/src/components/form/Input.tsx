type InputProps = {
    label?: string,
    type: string,
    placeholder?: string,
    value?: string | number,
    defaultValue?: string | number,
    event?: React.Dispatch<React.SetStateAction<string | number>> ,
    action?: React.MouseEventHandler,
}

function Input({label, type, placeholder, value, defaultValue, event, action}: InputProps) {
    return (
        <label>{label}
            <input type={type} value={value} defaultValue={defaultValue} placeholder={placeholder} onChange={(e) => event(e.target.value)} required={true} onClick={action} />
        </label>
    )
}

export default Input