type Props = {
    children: React.ReactNode
}

export default function ContentForm({children}: Props) {
    return (
        <section className="flex flex-col w-full gap-y-6 self-center sm:w-4/5 lg:w-2/5">
            {children}
        </section>
    )
}