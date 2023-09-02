import Brand from '../components/layout/Brand'
import Button from '../components/layout/Button'
import savings from './../assets/savings.svg'

function Home() {
    return (
        <main className='flex flex-col items-center gap-y-[30px]'>
            <h1 className='text-5xl font-bold'>Bem-vindo ao <Brand /></h1>
            <p className='text-xl text-gray-600'>Começe a gerenciar seus projetos agora mesmo!</p>
            <Button to="/newproject" text="Criar projeto" />
            <img className='w-[400px]' src={savings} alt='Economize dinheiro com o Costs' />
        </main>
    )
}

export default Home