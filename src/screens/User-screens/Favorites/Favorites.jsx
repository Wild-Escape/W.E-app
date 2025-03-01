import Experience from "../../../components/Experience/Experience";
import { useState, useEffect} from "react";
import { getFavoritesService } from "../../../services/favorite.service";
function Favorites () {
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
       getFavoritesService()
       .then((res)=>{
        console.log("this are all the favorites-->>", res)
        setFavorites(res.favExperiences)
       })
       .catch((error)=>next(error))
    }
    , []);
    return (
        <div className="p-4" style={{marginBottom:"55px"}}> 
            <p>Here will be the liked experiences of the user</p>
            {favorites && favorites.map((experience) => (   
                
                    
                    <Experience key={experience._id}
                    isFavorite={favorites.find(
                        (fav) => fav._id === experience._id
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
                
            ))}
        </div>
    )
}

export default Favorites;