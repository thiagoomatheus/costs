interface ContainerProps {
    children: React.ReactNode
}
export default function Container( {children}: ContainerProps ) {
    return (
        <div className="min-h-[60vh] sm:min-h-[75vh] my-10 sm:my-20 mx-5 md:mx-20">
            {children}
        </div>
    )
}