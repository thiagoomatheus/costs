import logo from '../../assets/costs_logo.png'
import { Link } from 'react-router-dom'

function Logo() {
    return (
        <>
            <Link to="/"><img className='min-w-[40px] max-w-[100px]' src={logo} alt='Costs'/></Link>
        </>
    )
}

export default Logo