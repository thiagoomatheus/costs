import logo from '../../assets/costs_logo.png'
import { Link } from 'react-router-dom'

function Logo() {
    return (
        <>
            <Link to="/"><img src={logo} alt='Costs'/></Link>
        </>
    )
}

export default Logo