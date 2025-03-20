import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/auth.service";
import { FaUserCircle } from "react-icons/fa";
import "./RegisterUser.css";

function RegisterUser() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, email, password, role: "user" };

    createUser(requestBody)
      .then(() => {
        navigate("/common/login");
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  return (
    <div id="register-user">
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-3 mt-5 ">
              <h4 className="card-title text-center">
                {" "}
                <FaUserCircle style={{ marginRight: "8px" }} /> Register as user
              </h4>
              <form
                id="registrationForm"
                onSubmit={handleSubmit}
                className="mt-4"
              >
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
                    className={`form-control ${
                      errors.message === "Resource already exists" &&
                      "is-invalid"
                    }`}
                    id="email"
                    name="email"
                    required
                    onChange={handleEmail}
                  />
                  <div id="email" className="invalid-feedback">
                    Please provide a valid email.
                  </div>
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
