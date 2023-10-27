import { useState, useEffect } from "react"
import useGetData from "../hooks/useGetData"
import { Categorie } from "../types/types"

type Props = {
    children: React.ReactNode,
    nameHTML: string
    handleChange: React.Dispatch<React.SetStateAction<any>>,
    value: string | undefined
}

export default function Select({children, nameHTML, handleChange, value}: Props) {

    const [categories, setCategories] = useState<Categorie[]>()

    const { getCategories } = useGetData()

    useEffect( () => {
        getCategories()
        .then(response => {
            setCategories(response)
        })
        .catch(response => {
            console.log(response);
        })
    }, [])

    return (
        <label className="flex flex-col gap-y-3 font-bold">{children}

            <select name={nameHTML} className="p-2 font-normal text-gray-700 border-2 rounded-md border-black" onChange={handleChange} required={true} value={value ? value : "default"} >

                <option disabled value="default" >Selecione uma opção</option>

                {categories && categories.map(({name, id}) => (
                    <option key={id} value={name}>{name}</option>
                )
                )}

            </select>

        </label>
    )
}