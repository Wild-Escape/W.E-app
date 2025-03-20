import { getAllExperiences } from "../../../services/experiences.service";
import { addToFavoriteService } from "../../../services/favorite.service";
import { useState, useEffect } from "react";
import Experience from "../../../components/Experience/Experience";
import { FaSearch } from "react-icons/fa";
import './Explore.css'

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
    <div id="explore" >
      <div id="search-bar">
        <form className="input-group shadow-sm">
          <input
            type="text"
            className="form-control form-control-lg border-end-0"
            placeholder="Search experiences..."
            aria-label="Search experiences"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-light bg-white border-start-0"
            type="button"
          >
            <FaSearch className="text-muted" />
          </button>
        </form>
      </div>

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
  );
}

export default Explore;