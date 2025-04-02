import { getAllExperiences } from "../../../services/experiences.service";
import { addToFavoriteService } from "../../../services/favorite.service";
import { useState, useEffect } from "react";
import Experience from "../../../components/Experience/Experience";
import { FaSearch, FaRegClock } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import "./Explore.css";
import filterController from '../../../public/filter-controller.svg'

function Explore() {
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getAllExperiences()
      .then((res) => {
        setExperiences(res.experiences);
        setFilteredExperiences(res.experiences);
        setFavorites(res.favorites);
      })
      .catch(console.error);
  }, []);

  function searchExperiences(value) {
    const searchedExperiences = experiences.filter((experience) =>
      experience.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchTerm(value);
    setFilteredExperiences(searchedExperiences);
  }
  function filterByCountry(value) {
    if (value.toLowerCase() === "all") {
      setFilteredExperiences(experiences);
    } else {
      const countryFilter = experiences.filter((experience) =>
        experience.location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredExperiences(countryFilter);
    }
  }
  function filterByType(value) {
    if (value.toLowerCase() === "all") {
      setFilteredExperiences(experiences);
    } else {
      const typeFilter = experiences.filter((experience) =>
        experience.type[0].toLowerCase().includes(value.toLowerCase())
      );
      setFilteredExperiences(typeFilter);
    }
  }

  return (
    <>
      {experiences.length === 0 && (
        <div className="loading-div">
          <h2>Loading ...</h2>
        </div>
      )}
      {experiences.length > 0 && (
        <div id="explore">
          
          <form id="search-bar" >
            <div id="search-div" className="search-bar d-flex">
            
              <div id="input-group" className="input-group">
                <FaSearch className="text-muted" />

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="search-addon"
                  value={searchTerm}
                  onChange={(e) => searchExperiences(e.target.value)}
                />
              </div>
              <div id="filter-button" onClick={()=> setIsOpen(!isOpen)}>
                <img src={filterController} alt="filter icon" />
              </div>
            </div>
            <div id="label-group" style={{display: isOpen ? "" : "none"}}  >
              <div id="country-div">
                <label htmlFor="countries" className="d-flex align-items-center"><FaMapLocationDot style={{marginRight:"3px"}} />Country:</label>
                <select
                  name="countries"
                  id="countries"
                  onChange={(e) => filterByCountry(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="South Africa">South Africa</option>
                </select>
              </div>
              <div id="type-div">
                <label htmlFor="type" className="d-flex align-items-center"><FaRegClock style={{marginRight:"3px"}}/>Type:</label>
                <select
                  name="type"
                  id="type"
                  onChange={(e) => filterByType(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Express">Express</option>
                  <option value="Short Stay">Short Stay</option>
                  <option value="Long stay">Long stay</option>
                  <option value="Mixed stay">Mixed stay</option>
                </select>
              </div>
            </div>
            
          </form>
          <div id="experiences-div" className="p-3">
          <div  className="row row-cols-1 row-cols-md-2 row-cols-xl-3 ">
            {filteredExperiences.map((experience) => (
              <div className="col mb-4" key={experience._id}>
                <Experience
                  isFavorite={favorites.find(
                    (fav) => fav.experience === experience._id
                  )}
                  _id={experience._id}
                  name={experience.name}
                  price={experience.price}
                  location={experience.location}
                  durationType={experience.durationType}
                  gallery={experience.gallery}
                  duration={experience.duration}
                  intro={experience.intro}
                  type={experience.type}
                  currency={experience.currency}
                  coordinates={experience.coordinates}
                  availableDates={experience.availableDates}
                  partner={experience.partner}
                  createdAt={experience.createdAt}
                  status={experience.status}
                  partnerName={experience.partner.name}
                />
              </div>
            ))}
          </div>
          </div>
          
        </div>
      )}
    </>
  );
}

export default Explore;
