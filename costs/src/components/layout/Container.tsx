interface ContainerProps {
    children: React.ReactNode
}
export default function Container( {children}: ContainerProps ) {
    return (
        <div className="min-h-[75vh] py-20">
            {children}
        </div>
    )
}