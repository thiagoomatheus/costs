import {useEffect, useState} from "react"
import { db } from "../../App"
import { DocumentReference, doc, getDoc } from "firebase/firestore"

type Props = {
    children: React.ReactNode,
    handleChange: React.Dispatch<React.SetStateAction<string | undefined>>,
    defaultValue: string | undefined
}

function Select({children, handleChange, defaultValue}: Props) {

    const [categories, setCategories] = useState<{id: number, name: string}[]>()

    // Usando Doc

    useEffect(() => {
        const docRef = doc(db, "content", "categories")
        const getData = async (docRef: DocumentReference) => {
            const r = await getDoc(docRef)
            if (!r.exists()) {
                console.log("erro");
                return
            }
            setCategories(r.data().categories);
        }
        getData(docRef)
        
    },[])

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