import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/auth.service";
import { LuPawPrint } from "react-icons/lu";
import { testService } from "../../services/test.service";
import "./RegisterPartner.css";
import partnerImage from "../../public/register-partner.png";

function RegisterAdmin() {
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
        navigate("/common/login");
      })
      .catch((err) => {
        console.log(err.message);
        setErrors(err);
      });
  };

  return (
    <>
    {loading && <div className="d-flex justify-content-center align-items-center vh-100">
      <p>Loading...</p>
    </div> }
    {apiRunning && <div id="register-partner">
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-3 mt-5">
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

                <button type="submit" className="btn  w-100">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <img src={partnerImage} alt="hawk" />
    </div>}
    </>
    
  );
}
export default RegisterAdmin;
