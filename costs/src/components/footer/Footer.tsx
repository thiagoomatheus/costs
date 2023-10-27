import Brand from '../layout/Brand'
import Social from "./Social"
import { MdCopyright } from "react-icons/md";

export default function Footer() {
    return (
        <footer className='flex flex-col items-center bg-black text-white gap-y-5 py-8'>
            <Social />
            <p className='flex flex-row items-center'><Brand /> <MdCopyright /> 2021 </p>
        </footer>
    )
}