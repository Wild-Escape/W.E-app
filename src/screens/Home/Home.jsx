import './Home.css';
import { Link } from 'react-router-dom';

function Home() {

    return (
      <div id='home' className="p-3 d-flex flex-column align-items-center justify-content-center ">
        <div id='description' className=' d-flex flex-column align-items-center justify-content-center p-3 '>
        <h1 className='text-center mb-3'>Welcome to wild Escape!!!</h1>
          <p className='text-center'>
           Were you can find all your wildlife experiences in one place!! 
          </p>
          <p className='text-center'>
            Click below to register and start your new adventure!
          </p>
          <Link to='/register' className='btn btn-primary'>
            Register here
          </Link>

        </div>
      </div>
    );
  }

export default Home;
