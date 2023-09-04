import {useEffect, useState} from "react"
import { db } from "../../App"
import { collection, getDocs } from "firebase/firestore";

type Props = {
    children: React.ReactNode,
    handleChange: React.Dispatch<React.SetStateAction<string | undefined>>,
    defaultValue: string | undefined
}

function Select({children, handleChange, defaultValue}: Props) {

    const [categories, setCategories] = useState<{id: number, name: string}[]>()

    useEffect(() => {
        const data = async () => {
            const r = await getDocs(collection(db, "content"))
            r.forEach((doc) => {
                setCategories(doc.data().categories)     
            })
        }
        data()
    }, [])

    console.log("render");
    

    return (
        <label className="flex flex-col gap-y-3 font-bold">{children}:
            <select className="p-2 font-normal text-gray-700 border-2 rounded-md border-black" onChange={(e) =>  handleChange(e.target.value)} required={true} defaultValue={defaultValue ? defaultValue : "default"} >
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