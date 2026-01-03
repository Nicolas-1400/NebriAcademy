import { Link } from "react-router-dom"

function Nav() {
  return (
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link> 
            </li>
            <li>
              <Link to='/'>Mi Academia</Link> 
            </li>
            <li>
              <Link to='/users'>Alumnos</Link> 
            </li>
            <li>
              <Link to='/cursos'>Cursos</Link> 
            </li>
            <li>
              <Link to='/masterclass'>Masterclass</Link> 
            </li>
          </ul>
        </nav>
  )
}

export default Nav