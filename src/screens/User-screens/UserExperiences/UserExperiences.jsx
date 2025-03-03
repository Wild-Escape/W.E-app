import { useState, useEffect } from "react";
import { getBookedExperiencesService } from "../../../services/payment.service";
import "./UserExperiences.css";
import { FaMoneyBillWave, FaCalendarAlt, FaHome } from "react-icons/fa";
import { MdEuro } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";

function UserExperiences() {
  const [experiences, setExperiences] = useState([]);
  useEffect(() => {
    getBookedExperiencesService()
      .then((res) => {
        setExperiences(res);
        console.log("booked experiences-->", res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-3">
      <h1 className="ms-2 mb-3">My Booked Experiences</h1>
      {experiences.length === 0 && (
        <div>
          <p>No experiences reserved :(</p>
          <button className="btn btn primary"> Start searching</button>
        </div>
      )}
      {experiences &&
        experiences.map((experience) => (
          <div key={experience._id} className="row mb-4">
            <div className="col-12 col-md-8 mx-auto">
              <div className="card shadow-sm hover-shadow-lg-hover transition-all h-100 p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <FaCalendarAlt className="me-2" />
                    <span className="text-dark">
                      {new Date(experience.dates.start).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <span
                    className={`badge ${
                      experience.status === "confirmed"
                        ? "bg-success"
                        : experience.status === "declined"
                        ? "bg-danger"
                        : "bg-warning"
                    }`}
                  >
                    {experience.status}
                  </span>
                </div>

                <div className="d-flex align-items-center mb-3 mt-2">
                  <FaHome className="text-primary me-2" size={24} />
                  <h2 className="card-title h4 mb-0">
                    {experience.experience.name}
                  </h2>
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <div className="d-flex  align-items-center justify-content-between text-muted">
                      <div className="d-flex ">
                        <div className="d-flex align-items-center justify-content-center">
                          <FaMoneyBillWave className="me-2 mb-2" />
                        </div>
                        <div className="d-flex">
                          <p className="h5 text-dark">
                            {experience.experience.price}
                          </p>
                          <div>
                            {experience.experience.currency === "dollars" ? (
                              <BsCurrencyDollar />
                            ) : (
                              <MdEuro />
                            )}
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/user/experience/${experience.experience._id}`}
                        className="btn btn-primary"
                      >
                        See details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default UserExperiences;
