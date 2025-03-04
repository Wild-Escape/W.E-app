import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/auth.service";
import { LuPawPrint } from "react-icons/lu";

function RegisterAdmin() {
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
    const requestBody = { name, email, password, role: "partner" };

    createUser(requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
        setErrors(err);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card-body p-3">
            <h4 className="card-title text-center">
              {" "}
              <LuPawPrint style={{ marginRight: "8px" }} />
              Register as Partner
            </h4>
            <form
              id="registrationForm"
              onSubmit={handleSubmit}
              className="mt-4"
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Shelter name
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
                    errors.message === "Resource already exists" && "is-invalid"
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
  );
}
export default RegisterAdmin;
