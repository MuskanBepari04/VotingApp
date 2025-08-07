
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
     <div>
       <Link to={'/auth/signup'} className='p-2 border'>Signup</Link>
       <Link to={'/auth/login'} className='p-2 border'>Login</Link>
     </div>
    </div>
  )
}

export default Home
