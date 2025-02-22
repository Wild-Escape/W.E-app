
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPartnerExperience } from "../../../../services/experiences.service";
import { FaCalendarAlt, FaInfoCircle, FaMapMarkerAlt, FaRegClock, FaTags, FaEdit } from 'react-icons/fa';

function PartnerExperienceDetails() {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  
  useEffect(() => {
    getPartnerExperience(id)
    .then((res) => {
        console.log("API Response:", res.partnerExperience); // Check raw API response
        const exp = res.partnerExperience;
        
        // Parse coordinates and categories
        const parsedExp = {
            ...exp,
            coordinates: tryParseJson(exp.coordinates) || {},
            category: exp.category.map(c => tryParseJson(c) || []) // Changed from 'categories' to 'category'
        };
        
        console.log("Parsed Experience:", parsedExp);
        setExperience(parsedExp);
    })
    .catch((error) => {
      console.log(error);
      // Remove 'next' unless you're using Express-like middleware
    });
}, [id]); // Added id to dependency array

// Helper function for safe JSON parsing
const tryParseJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str; // Return original value if parsing fails
  }
};

if (!experience) return <div>Loading...</div>;
  return (
    <div className="p-3" style={{ marginBottom: "50px" }}>
      {experience && (
        <div className="card shadow-lg h-100 border border-2 border-secondary-subtle">
          {/* Header with Status */}
          <div className="card-header bg-light d-flex justify-content-between align-items-center">
            <div>
              <span
                className={`badge bg-${
                  experience.status === "pending" ? "warning" : "success"
                } text-dark me-2`}
              >
                <FaInfoCircle className="me-1" />
                {experience.status.toUpperCase()}
              </span>
              <small className="text-muted">ID: {experience.id}</small>
            </div>
            <div className="text-muted">
              <FaCalendarAlt className="me-1" />
              Created: {new Date(experience.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Main Content */}
          <div className="card-body">
            <div className="row">
              {/* Main Image */}
              <div className="col-md-4">
                <img
                  src={experience.gallery[0]}
                  className="img-fluid rounded mb-3"
                  alt="Main"
                  style={{ height: "180px", objectFit: "cover" }}
                />
              </div>

              {/* Details */}
              <div className="col-md-8">
                <h4 className="mb-3">{experience.name}</h4>

                <div className="row g-3">
                  {/* Location & Duration */}
                  <div className="col-6">
            <p className="mb-1">
              <FaMapMarkerAlt className="me-2" />
              {experience.location}
              <small className="d-block text-muted ms-4 mt-1">
                {experience.coordinates && (
                  `(${experience.coordinates.lat?.toFixed(4)}, ${experience.coordinates.lng?.toFixed(4)})`
                )}
              </small>
            </p>
          </div>

                  <div className="col-6">
                    <p className="mb-1">
                      <FaRegClock className="me-2" />
                      Duration: {experience.duration}
                    </p>
                  </div>

                  {/* Pricing & Bookings */}
                  <div className="col-6">
                    <div className="card bg-light p-2">
                      <small>
                        <span className="fw-bold">Price:</span> €
                        {experience.price}
                        <br />
                        <span className="fw-bold">Available Dates:</span>{" "}
                        {experience.availableDates.length}
                        <br />
                        <span className="fw-bold">Booked Dates:</span>{" "}
                        {experience.bookedDates.length}
                      </small>
                    </div>
                  </div>

                  {/* Categories & Type */}
                  <div className="col-6">
            <div className="card bg-light p-2">
              <small>
                <FaTags className="me-1" />
                <span className="fw-bold">Type:</span>{" "}
                {Array.isArray(experience.type) ? experience.type.join(", ") : experience.type}
                <br />
                <span className="fw-bold">Categories:</span>{" "}
                {experience.category.flatMap(c => 
                  Array.isArray(c) ? c : [c]
                ).join(", ")}
              </small>
            </div>
          </div>
                  {/* Gallery Preview */}
                  <div className="col-12">
                    <div className="mt-2">
                      <small className="text-muted d-block mb-1">
                        Gallery ({experience.gallery.length} images):
                      </small>
                      <div className="d-flex gap-2">
                        {experience.gallery.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            className="border rounded"
                            style={{
                              width: "60px",
                              height: "40px",
                              objectFit: "cover",
                            }}
                            alt={`Preview ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Actions */}
          <div className="card-footer bg-light d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Partner ID: {experience.partner}
            </small>
            <div className="btn-group">
              <button className="btn btn-sm btn-outline-secondary">
                <FaEdit className="me-1" />
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PartnerExperienceDetails;

