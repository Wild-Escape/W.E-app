import { useState, useEffect, useRef } from "react";
import { getExperienceDetails } from "../../../../services/experiences.service";
import {
  getFavoritesService,
  addToFavoriteService,
} from "../../../../services/favorite.service";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function ExperienceDetails() {
  const { experienceId } = useParams();

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [userFavorites, setuserFavorites] = useState(null);
  const [experience, setExperience] = useState(null);
  const [favorite, setFavorite] = useState(null);

  useEffect(() => {
    getFavoritesService()
      .then((res) => {
        setuserFavorites(res.favExperiences);
      })
      .catch((error) => next(error));
  }, []);

  useEffect(() => {
    getExperienceDetails(experienceId)
      .then((res) => {
        setExperience(res.trip);
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }, []);

  useEffect(() => {
    if (userFavorites && userFavorites.length > 0) {
      const isFavorite = userFavorites.some(
        (favorite) => favorite.id === experienceId
      );
      setFavorite(isFavorite);
    }
  }, [userFavorites]);

  const submitFavorites = () => {
    addToFavoriteService(experienceId)
      .then((res) => {
        if (res.message === "Added to favorites") {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
              <div className="mb-4">
                <p className="fw-bold mb-2">See us in the map</p>
                <Map
                  style={{ width: "320px", height: "350px" }}
                  defaultCenter={{
                    lat: Number(JSON.parse(experience.coordinates).lat),
                    lng: Number(JSON.parse(experience.coordinates).lng),
                  }}
                  defaultZoom={8}
                  gestureHandling={"greedy"}
                  disableDefaultUI={true}
                >
                  <Marker
                    position={{
                      lat: Number(JSON.parse(experience.coordinates).lat),
                      lng: Number(JSON.parse(experience.coordinates).lng),
                    }}
                  />
                </Map>
              </div>
            </div>

            {/* Right Column - Gallery */}
            <div className="col-md-4">
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
          <div className="mt-4 d-flex flex-column ">
            {favorite ? (
              <button
                onClick={submitFavorites}
                className="btn btn-danger d-flex justify-content-around align-items-center"
                style={{ cursor: "pointer", width: "fit-content" }}
              >
                Remove from favorite
                <FaRegHeart style={{ marginLeft: "5px" }} />
              </button>
            ) : (
              <button
                onClick={submitFavorites}
                className="btn btn-primary d-flex justify-content-around align-items-center"
                style={{ cursor: "pointer", width: "fit-content" }}
              >
                Add to favorite
                <FaHeart style={{ marginLeft: "5px" }} />
                
              </button>
            )}

            {experience.type[0] === "express" ? (
              <Link
                to={`/user/${experience.id}/payment`}
                className="btn btn-success mt-2"
                style={{ cursor: "pointer", width: "fit-content" }}
              >
                Reserve now
              </Link>
            ) : (
              <Link
                className="btn btn-success mt-2"
                style={{ cursor: "pointer", width: "fit-content" }}
              >
                Send a booking request
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default ExperienceDetails;
