import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { loginService } from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";



function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const { login, isAuthLoaded, currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!isAuthLoaded) {
    return "Loading";
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    

    loginService(formData)
      .then((res) => {
        
        login(res);
      })
      .catch((error) => {
        
        setErrorMessage(error.message);
      });
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
                    id="email"
                    placeholder="Enter your username"
                    onChange={handleChange}
                    required
                    name="email"
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
                    onChange={handleChange}
                    required
                    name="password"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
              </form>
              
              <div className="mt-2 d-flex flex-column align-items-center">
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
