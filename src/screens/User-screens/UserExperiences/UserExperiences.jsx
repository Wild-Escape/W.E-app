import { useState, useEffect } from "react";
import { getBookedExperiencesService } from "../../../services/payment.service";
import "./UserExperiences.css";
import { FaCalendarAlt, FaCalendarTimes } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

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
        <div className="border border-secondary rounded p-3 mt-5 d-flex flex-column align-items-center">
          <p className="d-flex align-items-center justify-content-center mb-0 fw-bold">
            <FaCalendarTimes style={{marginRight:"8px"}} /> No experiences booked... 
          </p>
          <p className="fw-bold">for now!!</p>
          <Link to="/user/explore" className="btn btn-primary mt-3 d-flex align-items-center" style={{width:"fit-content"}}> <IoSearch style={{marginRight:"5px"}} />Start searching</Link>
        </div>
      )}
      {experiences &&
        experiences.map((experience) => (
          <div
            key={experience._id}
            className="mb-3 card shadow-sm hover-shadow-lg-hover p-3"
          >
            <h3 className="card-title h4 mb-0">{experience.experience.name}</h3>
            <div className="d-flex justify-content-between mt-3 align-items-center">
              <div className="d-flex align-items-center">
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
              <div className="d-flex align-items-center">
                <IoMdPricetag style={{ marginRight: "5px" }} />{" "}
                {experience.experience.price}
                {experience.experience.currency === "dollars" ? (
                  <BsCurrencyDollar />
                ) : (
                  <MdEuro />
                )}
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
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
              <Link
                to={`/user/experience/${experience.experience._id}`}
                className="btn btn-primary"
              >
                See details
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default UserExperiences;
