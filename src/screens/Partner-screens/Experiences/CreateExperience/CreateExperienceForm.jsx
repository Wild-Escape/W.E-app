import { useState, useRef } from "react";
import DatePicker from "react-datepicker";

import { createExperienceService } from "../../../../services/experiences.service";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";


import "react-datepicker/dist/react-datepicker.css";

function CreatePost() {
  const autocompleteRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    intro: "",
    price: 0,
    currency: "",
    duration: 0,
    durationType: "",
    availableDates: [],
    type: "",
    activities: "",
    location: "",
    coordinates: {},
    gallery: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? Array.from(files) : value,
    }));
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setFormData((prevFormData) => ({
      ...prevFormData,
      availableDates: [
        {
          start: new Date(start).toISOString(),
          end: new Date(end).toISOString(),
        },
      ],
    }));
  };
  const handlePlaceSelect = (place) => {
    if (place.geometry) {
      setFormData((prevFormData) => ({
        // 👈 Use functional update
        ...prevFormData, // Keep existing data
        location: place.formatted_address,
        coordinates: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
      }));
    }
  };
  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    e.preventDefault();

    const uploadData = new FormData();

    uploadData.append("name", formData.name);
    uploadData.append("intro", formData.intro);
    uploadData.append("price", formData.price);
    uploadData.append("currency", formData.currency);
    uploadData.append("duration", formData.duration);
    uploadData.append("durationType", formData.durationType);
    uploadData.append(
      "availableDates",
      JSON.stringify(formData.availableDates)
    );
    uploadData.append("type", formData.type);
    uploadData.append("activities", formData.activities);
    uploadData.append("location", formData.location);
    uploadData.append("coordinates", JSON.stringify(formData.coordinates));

    // Append gallery files
    formData.gallery.forEach((file) => {
      uploadData.append("gallery", file); // Key name depends on your backend
    });

    createExperienceService(uploadData, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then(() => {
        navigate("/partner/experiences");
      })
      .catch((error) => {
        console.error("Error creating experience:", error);
      });
  };
  return (
    <div>
      <div className="container mt-5" style={{ marginBottom: "80px" }}>
        <h2>Create Experience</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Intro */}
          <div className="mb-3">
            <label htmlFor="intro" className="form-label">
              Intro
            </label>
            <textarea
              className="form-control"
              id="intro"
              name="intro"
              value={formData.intro}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div className="mb-3">
            <div>
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="currency" className="form-label">
                Currency
              </label>
              <select
                type="text"
                className="form-select"
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                required
              >
                <option value="">Select a currency</option>
                <option value="euros">€</option>
                <option value="dollars">$</option>
              </select>
            </div>
          </div>

          {/* Duration */}
          <div className="mb-3">
            <div>
              <label htmlFor="duration" className="form-label">
                Duration
              </label>
              <input
                type="number"
                className="form-control"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="durationType" className="form-label">
                Duration type
              </label>
              <select
                type="text"
                className="form-select"
                id="durationType"
                name="durationType"
                value={formData.durationType}
                onChange={handleChange}
                required
              >
                <option value="">Select a type</option>
                <option value="hour">Hour</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="mb-3">
            <label htmlFor="dates" className="form-label">
              Select available dates
            </label>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          </div>

          {/* Type */}
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <select
              className="form-select"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select a type</option>
              <option value="express">Express</option>
              <option value="short stay">Short Stay</option>
              <option value="long stay">Long Stay</option>
              <option value="mixed stay">Mixed Stay</option>
            </select>
          </div>

          {/* Activities */}
          <div className="mb-3">
            <label htmlFor="activities" className="form-label">
              Activities
            </label>
            <textarea
              className="form-control"
              id="activities"
              name="activities"
              value={formData.activities}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}

          {/* Coordinates */}
          {/* <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <Autocomplete
                onLoad={(autocomplete) => {
                  autocompleteRef.current = autocomplete;
                }}
                onPlaceChanged={handlePlaceSelect}
              >
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Search for a location..."
                />
              </Autocomplete>
            </div> */}
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
           
              <Autocomplete
                onLoad={(autocomplete) => {
                  autocompleteRef.current = autocomplete;
                }}
                onPlaceSelected={handlePlaceSelect}
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Search for a location..."
                fields={["geometry", "name", "formatted_address"]}
              />
            
          </div>
          {/* Gallery */}
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">
              Gallery
            </label>
            <input
              type="file"
              className="form-control"
              id="gallery"
              name="gallery"
              onChange={handleChange}
              required
              multiple
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
