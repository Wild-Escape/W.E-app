import { LuPawPrint } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import "./Register.css";
import registerImage from '../../public/register-main.png'

import { Link } from "react-router-dom";
function Register() {
  return (
    
    <div id="main-register" >
      <div
        className=" container p-4  justify-content-around"
        style={{ height: "90vh", }}
        id="card-container"
      >
        <div className="card" id="card-1">
          <div className="card-body ">
            <h5 className="card-title">
              <FaUserCircle style={{ marginRight: "8px" }} />
              Register as User
            </h5>
            <p className="card-text mt-3">
              Explore and book conservation adventures, from quick visits to
              extended stays. Start your journey today!
            </p>
            <Link
              type="button"
              className="btn btn-primary "
              to="/register/user"
            >
              Register here
            </Link>
          </div>
        </div>

        <div className="card" id="card-2" >
          <div className="card-body">
            <h5 className="card-title">
              <LuPawPrint style={{ marginRight: "8px" }} />
              Register as Partner
            </h5>
            <p className="card-text mt-3">
              Protect wildlife while sharing your expertise! Partner with us to
              offer conservation experiences, from short trips to long stays,
              and inspire change.
            </p>
            <Link
              type="button"
              className="btn btn-primary"
              to="/register/partner"
            >
              Register here
            </Link>
          </div>
          
        </div>
      </div>
      
    </div>

    
  );
}

export default Register;
