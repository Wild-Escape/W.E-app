import { getAllExperiences } from "../../../services/experiences.service";
import { addToFavoriteService } from "../../../services/favorite.service";
import { useState, useEffect } from "react";
import Experience from "../../../components/Experience/Experience";
import { FaSearch } from "react-icons/fa";
import "./Explore.css";

function Explore() {
  const [experiences, setExperiences] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllExperiences()
      .then((res) => {
        setExperiences(res.experiences);
        setFavorites(res.favorites);
      })
      .catch(console.error);
  }, []);

  // Filter experiences based on search term
  const filteredExperiences = experiences.filter((experience) =>
    experience.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {experiences.length === 0 && (
        <div className="loading-div">
          <h2>Loading ...</h2>
        </div>
      )}
      {experiences.length > 0 && (
        <div id="explore">
          <form id="search-bar" className="container">
            <div className="search-bar">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="search-addon"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="search-addon"
                >
                  <FaSearch className="text-muted" />
                </button>
              </div>
            </div>
          </form>

          {filteredExperiences.map((experience) => (
            <div key={experience._id}>
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
      )}
    </>
  );
}

export default Explore;
