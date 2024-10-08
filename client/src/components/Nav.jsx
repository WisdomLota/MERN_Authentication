import {Link} from 'react-router-dom'
const Nav = () => {
  return (
    <nav className='navBar'>
      <Link to='/'>Home</Link>
      <Link to='/register'>Register</Link>
      <Link to='login'>Login</Link>
    </nav>
  )
}

export default Nav