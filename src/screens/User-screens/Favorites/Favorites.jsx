import Experience from "../../../components/Experience/Experience";
import { useState, useEffect } from "react";
import { getFavoritesService } from "../../../services/favorite.service";
function Favorites() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    getFavoritesService()
      .then((res) => {
        console.log("this are all the favorites-->>", res);
        setFavorites(res.favExperiences);
      })
      .catch((error) => next(error));
  }, []);
  return (
    <div className="p-3" style={{ marginBottom: "55px" }}>
      <h1 className="mb-3 ms-2">Favorites</h1>
      {favorites.length === 0 && (
        <div>
          <p>No favorites yet</p>
          <button className="btn btn-primary"> Go explore!!</button>
        </div>
      )}
      {favorites &&
        favorites.map((experience) => (
          <Experience
            key={experience._id}
            isFavorite={favorites.find((fav) => fav._id === experience._id)}
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
            createdAt={experience.createdAt}
            status={experience.status}
            partnerName={experience.partner.name}
          />
        ))}
    </div>
  );
}

export default Favorites;
