import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

import "react-datepicker/dist/react-datepicker.css";

function CreatePost() {
  const autocompleteRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    intro: "",
    price: 0,
    category: [],
    duration: 0,
    availableDates:[],
    type: "",
    activities: "",
    location: "",
    coordinates: {},
    gallery: [],
    highlights: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value.split(",").map((item) => item.trim()),
    });
  };
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setFormData({
      ...formData,
      availableDates:[
        {
          start: start,
          end: end
        }
      ]
    })
  };
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      setFormData({
        ...formData,
        location: place.formatted_address,
        coordinates: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("check data-->", formData);
  };
  return (
    <LoadScript
    googleMapsApiKey="AIzaSyBR9AHmU3Iw9rsvCcC4uKXJRg3aQ_RXWRY"
    libraries={["places"]}
  >
    <div>
      <div className="container mt-5" style={{ marginBottom: "70px" }}>
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

          {/* Category */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category (comma-separated)
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={formData.category.join(", ")}
              onChange={(e) => handleArrayChange(e, "category")}
              required
            />
          </div>

          {/* Duration */}
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">
              Duration 
            </label>
            <input
              type="text"
              className="form-control"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
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
          <div className="mb-3">
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
        </div>
          {/* Gallery */}
          <div className="mb-3">
            <label htmlFor="gallery" className="form-label">
              Gallery 
            </label>
            <input
              type="text"
              className="form-control"
              id="gallery"
              name="gallery"
              value={formData.gallery.join(", ")}
              onChange={(e) => handleArrayChange(e, "gallery")}
              required
            />
          </div>

          {/* Highlights */}
          <div className="mb-3">
            <label htmlFor="highlights" className="form-label">
              Highlights (comma-separated)
            </label>
            <input
              type="text"
              className="form-control"
              id="highlights"
              name="highlights"
              value={formData.highlights.join(", ")}
              onChange={(e) => handleArrayChange(e, "highlights")}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
    </LoadScript>
  );
}

export default CreatePost;
