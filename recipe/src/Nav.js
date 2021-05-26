import { Link } from 'react-router-dom'

function Nav()
{
    return(
        <nav>
            <h1>RecipeMust</h1>
            <ul className='nav-links'>
                <Link to = '/home'>
                    <li>
                        Home
                    </li>
                </Link>
                <Link to = '/NutFacts'>
                    <li>
                        Nutrition Facts
                    </li>
                </Link>
                <Link to = '/Contact'>
                    <li>
                        Contact
                    </li>
                </Link>

            </ul>
        </nav>
    )
}

export default Nav