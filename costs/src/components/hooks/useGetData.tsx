import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useContext } from "react"
import { db } from "../../App";
import { UserContext } from "../contexts/Contexts";

export default function useGetData() {

    const uid = useContext(UserContext)

    const getProjects = async () => {

        const data: any = []

        if (uid) {

            const response = await getDocs(collection(db, uid))

            try {

                response.forEach((doc) => {
                    data.push(doc.data())
                })

                return data

            } catch (error) {

            console.log(error);

            return undefined

            }

        }

        const projects = localStorage.getItem("projects")

        return projects ? JSON.parse(projects) : undefined
    }

    const getCategories = async () => {

        const response = await getDoc(doc(db, 'content', 'categories'))

        try {

            if (response.exists()) {

                return response.data().categories

            }    

        } catch (error) {

            return error

        }
        
    }

    return {
        getProjects,
        getCategories
    }
}