import { LuPawPrint } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";

import { Link } from "react-router-dom";
function Register() {
  return (
    <div className="row row-cols-1 row-cols-md-1 g-4 p-3">
      <div className="col">
        <div className="card">
          <div className="card-body ">
            <h5 className="card-title">
              <FaUserCircle style={{ marginRight: "8px" }} />
              Register as User
            </h5>
            <p className="card-text mt-3">
              Browse through a variety of conservation-focused activities and
              book your next adventure—whether it’s a quick visit, a mid-length
              stay, or an extended wildlife immersion. Start your journey today!
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
      </div>

      <div className="col">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              <LuPawPrint style={{ marginRight: "8px" }} />
              Register as Partner
            </h5>
            <p className="card-text mt-3">
              Help protect wildlife while sharing your expertise! As a partner,
              you can create and offer immersive conservation experiences, from
              short trips to extended stays, to nature enthusiasts eager to make
              a difference. Join us and inspire positive change!
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
