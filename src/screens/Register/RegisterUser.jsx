import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/auth.service";

function RegisterUser() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate()

    const handleName = (e) => setName(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

  const handleSubmit = (e) => {
    console.log("entro en handle submit")
    e.preventDefault()
    const requestBody = {name,
        email, password , role : "user"
    }
    console.log("user data-->", requestBody)
    createUser(requestBody)
    .then(()=>{
        console.log("user created :)")
        navigate("/login")
    })
    .catch((err) => {
        setErrors(err.errors)
      });

  }


  return (
  
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
             
              <div className="card-body">
              <h4 className="card-title text-center">Register as user</h4>
                <form id="registrationForm" onSubmit={handleSubmit} >
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                    Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      required
                      onChange={handleName}

                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      required
                      onChange={handleEmail}
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
                      name="password"
                      required
                      onChange={handlePassword}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default RegisterUser;
