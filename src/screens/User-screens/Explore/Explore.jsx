import { getAllExperiences } from "../../../services/experiences.service";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaClock, FaEuroSign } from "react-icons/fa";

function Explore() {
  const [experiences, setExperiences] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getAllExperiences()
      .then((res) => {
        console.log("seeing response", res);
        setExperiences(res.trips);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="p-3 mb-5">
      {experiences &&
        experiences.map((experience) => (
          <div className="card shadow-sm h-100 mb-3" key={experience._id}>
            {/* Gallery Image */}
            <img
              src={experience.gallery[0]}
              className="card-img-top"
              alt={experience.name}
              style={{ height: "200px", objectFit: "cover" }}
            />

            <div className="card-body">
              {/* Status Badge */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span
                  className={`badge bg-${
                    experience.status === "pending" ? "warning" : "success"
                  } text-dark`}
                >
                  {experience.status}
                </span>
                <small className="text-muted">
                  {experience.type.join(", ")}
                </small>
              </div>

              {/* Title */}
              <h5 className="card-title">{experience.name}</h5>

              {/* Location */}
              <div className="d-flex align-items-center mb-2">
                <FaMapMarkerAlt className="me-2" />
                <span className="card-text">{experience.location}</span>
              </div>

              {/* Duration & Price */}
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <FaClock className="me-2" />
                  <span>{experience.duration}</span>
                </div>
                <div>
                  <FaEuroSign className="me-2" />
                  <span>{experience.price} / person</span>
                </div>
              </div>

              {/* Description */}
              <p className="card-text">{experience.intro}</p>
            </div>
          
            {/* Footer */}
            <div className="card-footer bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Category: {experience.category.join(", ")}
                </small>
                <button className="btn btn-primary btn-sm">See details</button>
               
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Explore;
