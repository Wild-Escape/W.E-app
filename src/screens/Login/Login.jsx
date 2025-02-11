import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginService } from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";

const API_URL = "http://localhost:3000";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);



  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {email, password}
    loginService(requestBody)
    .then((response)=>{
        
      

        storeToken(response.data.accesToken);  
        authenticateUser();
        navigate('/profile')
    })
    .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })

  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center">Login</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    onChange={handleEmail}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    onChange={handlePassword}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="mt-2 d-flex flex-column align-items-center" >
                <p>Don't have an account yet?</p>
                <Link to={"/register"}> Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
