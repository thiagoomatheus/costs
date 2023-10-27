import Brand from '../components/layout/Brand'
import Button from '../components/layout/Button'
import savings from './../assets/savings.svg'

export default function Home() {
    return (
        <main className='flex flex-col items-center gap-y-10'>
            <h1>Bem-vindo ao <Brand /></h1>
            <p className='text-gray-600'>Começe a gerenciar seus projetos agora mesmo!</p>
            <Button to="/newproject" text="Criar projeto" />
            <img className='w-2/3 md:w-[400px]' src={savings} alt='Economize dinheiro com o Costs' />
        </main>
    )
}