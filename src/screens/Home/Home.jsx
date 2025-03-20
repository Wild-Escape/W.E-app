import './Home.css';
import { Link } from 'react-router-dom';

function Home() {

    return (
      <div id='home' className="p-3 d-flex flex-column align-items-center justify-content-center ">
        <div id='description' className='card d-flex flex-column align-items-center p-3 '>
        <h1>Welcome to wild Escape!!!</h1>
          <p>
           Were you can find all your wildlife experiences in one place!! 
          </p>
          <p>
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
