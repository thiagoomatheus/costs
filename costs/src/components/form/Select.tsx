import {useContext} from "react"
import { CategoriesContext } from "../contexts/Contexts"

type Props = {
    children: React.ReactNode,
    nameHTML: string
    handleChange: React.Dispatch<React.SetStateAction<any>>,
    value: string | undefined
}

function Select({children, nameHTML, handleChange, value}: Props) {
    const categories = useContext(CategoriesContext)

    return (
        <label className="flex flex-col gap-y-3 font-bold">{children}
            <select name={nameHTML} className="p-2 font-normal text-gray-700 border-2 rounded-md border-black" onChange={handleChange} required={true} value={value ? value : "default"} >
                <option disabled value="default" >Selecione uma opção</option>
                {categories != undefined && categories.map(({name, id}) => (
                    <option key={id} value={name}>{name}</option>
                )
                )}
            </select>
        </label>
    )
}

export default Select