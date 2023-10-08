type NavbarProps = {
    children?: React.ReactNode
    hidden: boolean
}

export default function Navbar( {children, hidden}: NavbarProps ) {
    return (
        <>
            <ul className={`${hidden ? 'flex' : 'hidden'} absolute bg-black top-[30px] rounded-md px-4 pb-3 right-0 flex-col sm:flex sm:flex-row justify-between gap-2 items-center list-none sm:gap-x-5 text-white`}>
                {children}
            </ul>
        </>
    )
}