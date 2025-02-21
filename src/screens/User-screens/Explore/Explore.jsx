import { getAllExperiences } from "../../../services/experiences.service";
import { addToFavoriteService } from "../../../services/favorite.service";
import { useState, useEffect } from "react";
import Experience from "../../../components/Experience/Experience";

function Explore() {
  const [experiences, setExperiences] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getAllExperiences()
      .then((res) => {
        console.log("seeing response", res);
        setExperiences(res.experiences);
        setFavorites(res.favorites);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-3 mb-5">
      <p>here we have all the experiences</p>
      {experiences.map((experience) => (
        <div key={experience._id}>
          <Experience
            isFavorite={favorites.find(
              (fav) => fav.experience === experience._id
            )}
            _id={experience._id}
            name={experience.name}
            price={experience.price}
            location={experience.location}
            category={experience.category}
            gallery={experience.gallery}
            duration={experience.duration}
            intro={experience.intro}
            type={experience.type}
            highlights={experience.highlights}
            coordinates={experience.coordinates}
            availableDates={experience.availableDates}
            partner={experience.partner}
            createdAt={experience.createdAt}
            status={experience.status}
          />
        </div>
      ))}
    </div>
  );
}

export default Explore;
