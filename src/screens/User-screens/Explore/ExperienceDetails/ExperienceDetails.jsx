import { getExperienceDetails } from "../../../../services/experiences.service";
import {
  getFavoritesService,
  addToFavoriteService,
} from "../../../../services/favorite.service";
import { getBookedExperiencesService } from "../../../../services/payment.service";

import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { LuPawPrint } from "react-icons/lu";
import { FaMapLocationDot } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";

import { Map, Marker } from "@vis.gl/react-google-maps";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import DatePicker from "react-datepicker";

function ExperienceDetails() {
  const { experienceId } = useParams();

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [userFavorites, setuserFavorites] = useState(null);
  const [experience, setExperience] = useState(null);
  const [favorite, setFavorite] = useState(null);
  const [bookedExperiences, setBookedExperiences] = useState([]);

  const [startDate, setSelectedDate] = useState(null);

  useEffect(() => {
    getBookedExperiencesService()
      .then((res) => {
        const bookedExperiencesId = res.map(
          (experience) => experience.experience._id
        );
        setBookedExperiences(bookedExperiencesId);
        console.log("booked experiences id-->", bookedExperiencesId);
      })
      .catch((error) => next(error));
  }, []);

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
        console.log("check details data-->", res.trip);
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }, []);

  useEffect(() => {
    if (userFavorites) {
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
          className="container-md mx-auto p-4 bg-white "
          style={{ marginBottom: "100px" }}
        >
          {/* Header Section */}
          <div className="mb-4 pb-3 border-bottom">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h1 className="display-5 fw-bold text-dark mb-2">
                  {experience.name}
                </h1>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <span className="fs-5 text-secondary">
                    📍 {experience.location}
                  </span>
                </div>
                <h2 className="text-success fw-bold mb-0 mt-2">
                  Price: {experience.price}
                  {experience.currency === "dollars" ? "$" : "€"}
                </h2>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="row g-4">
            {/* Left Column */}
            <div className="col-md-8">
              <h4>
                <LuPawPrint />
                Partner: {experience.partner.name}
              </h4>

              <p className="lead text-muted mb-4">{experience.intro}</p>

              {/* Duration & Type */}
              <div className="bg-light p-3 rounded-2 mb-4">
                <div className="d-flex gap-5">
                  <div>
                    <p className="fw-bold mb-1">Duration</p>
                    <p className="text-muted mb-0 d-flex align-items-center">
                      <IoMdTime style={{ marginRight: "3px" }} />
                      {experience.duration} {experience.durationType}
                    </p>
                  </div>
                  <div>
                    <p className="fw-bold mb-1">Experience Type</p>
                    <p className="text-muted mb-0 text-end">
                      {experience.type.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Coordinates */}
              <div className="mb-2 d-flex flex-column align-items-center">
                <h4 className="fw-bold mb-3 text-center d-flex align-items-center "><FaMapLocationDot style={{marginRight:"8px"}} />See us in the map</h4>

                <Map
                  style={{
                    width: "320px",
                    height: "350px",
                  }}
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
              <h4 className="fw-bold mb-3 d-flex align-items-center justify-content-center"> <GrGallery style={{marginRight:"8px"}}/>Gallery</h4>
              <div className="d-flex flex-column gap-3 ">
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
          {/* Choose Dates */}
          {!bookedExperiences.includes(experienceId) && (
            <div className="mb-4 d-flex flex-column align-items-center">
              <div className="mt-4">
                <p>
                  Available from:
                  {new Date(experience.availableDates[0].start).toLocaleString(
                    "en-UK",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
                <p>
                  Available till:{" "}
                  {new Date(experience.availableDates[0].end).toLocaleString(
                    "en-UK",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
              {experience.type[0] === "express" && (
                <div>
                  <p className="text-center">Select your date</p>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) =>
                      setSelectedDate(new Date(date).toDateString())
                    }
                    //startDate={startDate}
                    //excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
                    selectsRange
                    selectsDisabledDaysInRange
                    inline
                  />
                </div>
              )}
            </div>
          )}

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
                className="btn btn-warning d-flex justify-content-around align-items-center"
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
            {bookedExperiences.includes(experienceId) ? (
              <button
                className="btn btn-success mt-3"
                style={{ width: "fit-content" }}
              >
                Alredy reserved !
              </button>
            ) : experience.type[0] === "express" ? (
              <Link
                to={`/user/${experience.id}/payment`}
                className="btn btn-success mt-2"
                style={{ cursor: "pointer", width: "fit-content" }}
                state={{ startDate }}
              >
                Reserve now
              </Link>
            ) : (
              <Link
                to={`/user/${experience.id}/booking`}
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
