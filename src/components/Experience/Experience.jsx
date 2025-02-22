import { useState } from "react";
import { Link } from "react-router-dom";
import { addToFavoriteService } from "../../services/favorite.service";
import { FaMapMarkerAlt, FaClock, FaEuroSign,FaDollarSign, FaRegHeart, FaHeart } from "react-icons/fa";

function Experience({
  isFavorite,
  _id,
  name,
  price,
  location,
  durationType,
  gallery,
  duration,
  intro,
  type,
  currency,
  coordinates,
  availableDates,
  partner,
  createdAt,
  status,
  setFavorites
}) {
  const [favorite, setFavorite] = useState(isFavorite);

  const submitFavorites = () => {
    addToFavoriteService(_id)
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
    <div className="card shadow-sm h-100 mb-3">
      {/* Gallery Image */}
      <img
        src={gallery?.[0] || 'default-image.jpg'}
        className="card-img-top"
        alt={name}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <div className="card-body">
        {/* Status Badge */}
        <div className="d-flex mb-2">
          <small className="text-muted">
            {Array.isArray(type) ? type.join(", ") : type}
          </small>
        </div>

        {/* Title */}
        <h5 className="card-title">{name}</h5>

        {/* Location */}
        <div className="d-flex align-items-center mb-2">
          <FaMapMarkerAlt className="me-2" />
          <span className="card-text">{location}</span>
        </div>

        {/* Duration & Price */}
        <div className="d-flex justify-content-between mb-3">
          <div>
            <FaClock className="me-2" />
            <span>{duration}</span>
            <span>{durationType}</span>
          </div>
          <div>
            {currency === "dollars" ? (
              <FaDollarSign className="me-2" />
            ) : (
              <FaEuroSign className="me-2" />
  )}
            
            <span>{price} / person</span>
          </div>
        </div>

        {/* Description */}
        <p className="card-text">{intro}</p>
      </div>

      {/* Footer */}
      <div className="card-footer bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <div onClick={submitFavorites} style={{ cursor: "pointer" }}>
            {favorite ? (
              <FaHeart />
            ) : (
              <FaRegHeart  />
            )}
          </div>
          <Link to={`/user/experience/${_id}`} className="btn btn-primary btn-sm">
            See details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Experience;