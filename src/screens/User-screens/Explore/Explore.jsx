import { getAllExperiences } from "../../../services/experiences.service";
import { useState, useEffect } from "react";

function Explore() {
    const [experiences, setExperiences] = useState([]);
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      
      getAllExperiences()
      .then((res) => {
        
        setExperiences(res.data.trips);
      })
      .catch((error) => {
        
        
      })
    }, []);
    return (
      <div className="p-3 mb-5">
   
        {experiences && experiences.map((experience)=><div key={experience._id} className="card" style={{ width: '18rem', margin: '10px' }}>
        <img src={experience.gallery[0]} className="card-img-top" alt="Expedition" />
        <div className="card-body">
          <h5 className="card-title">{experience.name}</h5>
          
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Price:</strong> ${experience.price}</li>
            <li className="list-group-item"><strong>Duration:</strong> {experience.duration} days</li>
            <li className="list-group-item"><strong>Location:</strong> {experience.location}</li>
            
           
          </ul>
        </div>
        
      </div>)}
      </div>
    );
  }

export default Explore;