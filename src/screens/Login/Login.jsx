import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { loginService } from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import { testService } from "../../services/test.service";
import { useEffect } from "react";
import "./Login.css";
import lemur from "../../public/lemur-login.png"
import ClipLoader from "react-spinners/ClipLoader";
function Login() {
  const [apiRunning, setApiRunning] = useState(false);
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
      testService()
        .then((res)=>{
          if (res === "API running"){
            setApiRunning(true)
            setLoading(false)

          } else {
            throw new Error('Backend not ready');
          }
        })
        .catch((err)=>console.log(err))
  })
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const { login, isAuthLoaded } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    loginService(formData)
      .then((res) => {
        login(res);
      })
      .catch((error) => {
        console.log("error in login-->", error);
        setErrorMessage(error.message);
      });
  };
  return (
    <>
    {loading && <div className="d-flex justify-content-center align-items-center vh-100">
      <p>Loading... <ClipLoader /></p>
    </div> }
    {apiRunning && 
    <div id="login-screen">
    <div id="login-form" className="container p-4">
      <div className="row  justify-content-center ">
        <div className="col-md-4">
          <div className="card mt-5">
            <div   className="card-body">
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
                <button type="submit" className="btn w-100" >
                  Login
                </button>
                {errorMessage && (
                  <div className="alert alert-danger mt-2" role="alert">
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
      <img src={lemur} alt="lemur illustration" />
    </div>
  </div>}
    </>
    
  );
}

export default Login;
