type NavbarProps = {
    children?: React.ReactNode
}

export default function Navbar( {children}: NavbarProps ) {
    return (
        <>
            <ul className="flex flex-row justify-between gap-x-2 items-center list-none sm:gap-x-5 text-white">
                {children}
            </ul>
        </>
    )
}