import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getPartnerExperience } from "../../../../services/experiences.service";
import { Link } from "react-router-dom";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function PartnerExperienceDetails() {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    getPartnerExperience(id)
      .then((res) => {
        console.log("API Response:", res.partnerExperience);
        setExperience(res.partnerExperience);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {experience && (
        <div
          className="container-md mx-auto p-4 bg-white rounded-3 shadow-sm"
          style={{ marginBottom: "100px" }}
        >
          {/* Header Section */}
          <div className="mb-4 pb-3 border-bottom">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h1 className="display-5 fw-bold text-dark mb-2">
                  {experience.name}
                </h1>
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-5 text-secondary">
                    📍 {experience.location}
                  </span>
                </div>
              </div>
              <div className="text-end">
                <h2 className="text-success fw-bold mb-0">
                  {experience.price} {experience.currency}
                </h2>
                <small className="text-muted">
                  per {experience.durationType}
                </small>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="row g-4">
            {/* Left Column */}
            <div className="col-md-8">
              <h4>Partner: {experience.partner.name}</h4>
              <p className="lead text-muted mb-4">{experience.intro}</p>

              {/* Duration & Type */}
              <div className="bg-light p-3 rounded-2 mb-4">
                <div className="d-flex gap-5">
                  <div>
                    <p className="fw-bold mb-1">Duration</p>
                    <p className="text-muted mb-0">
                      {experience.duration} {experience.durationType}
                    </p>
                  </div>
                  <div>
                    <p className="fw-bold mb-1">Experience Type</p>
                    <p className="text-muted mb-0">
                      {experience.type.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Coordinates */}
              <div className="mb-2">
                <p className="fw-bold mb-2">See us in the map</p>
                <Map
                  style={{ width: "320px", height: "350px" }}
                  defaultCenter={{
                    lat: experience.coordinates.lat,
                    lng: experience.coordinates.lng,
                  }}
                  defaultZoom={8}
                  gestureHandling={"greedy"}
                  disableDefaultUI={true}
                >
                  <Marker
                    position={{
                      lat: experience.coordinates.lat,
                      lng: experience.coordinates.lng,
                    }}
                  />
                </Map>
              </div>
            </div>

            {/* Right Column - Gallery */}
            <div className="col-md-4">
              <h3>Gallery</h3>
              <div className="d-flex flex-column gap-3">
                {experience.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Experience visual ${index + 1}`}
                    className="img-fluid rounded-2 shadow-sm"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-top text-muted small">
            <p className="mb-1">
              Created at: {new Date(experience.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Link className="btn btn-primary mt-2" to={`/experience/${id}/edit`}>
          Edit experience 
          </Link>
        </div>
      )}
    </div>
  );
}

export default PartnerExperienceDetails;
