import { useState, useEffect } from "react";
import { getBookedExperiencesService } from "../../../services/payment.service";
import "./UserExperiences.css";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
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
                <IoMdPricetag style={{marginRight:"5px"}}/> {experience.experience.price}
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
