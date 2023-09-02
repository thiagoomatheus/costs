type NavbarProps = {
    children?: React.ReactNode
}

function Navbar( {children}: NavbarProps ) {
    return (
        <>
            <ul className="flex flex-row justify-center list-none gap-x-5 text-white">
                {children}
            </ul>
        </>
    )
}

export default Navbar