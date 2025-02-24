import { Link } from "react-router-dom";
import { getPartnerExperiences } from "../../../services/experiences.service";
import { useState, useEffect } from "react";

function Experiences() {
  const [partnerExperiences, setPartnerExperiences] = useState([]);

  useEffect(() => {
    getPartnerExperiences()
      .then((res) => {
        console.log("in partner experiences", res.shelterTrips);
        setPartnerExperiences(res.shelterTrips);
      })
      .catch((error)=>next(error))
  }, []);
  return (
    <div className="p-3" style={{marginBottom: "50px"}}>
      <p>Here we will have all the expreiences created by this admin</p>
      <Link className="btn btn-secondary mb-3" to="/partner/create-post">
        Add Experience
      </Link>

      {partnerExperiences &&
        partnerExperiences.map((experience) => (
          <div className="card mb-3" style={{width: "18rem"}} key={experience._id}>
            <img src={experience.gallery[0]} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{experience.name}</h5>
              <p className="card-text">
                {experience.intro}
              </p>
              <Link to={`/partner/experience/${experience._id}/details`} className="btn btn-primary">
                See details
              </Link>
            </div>
          </div>
        ))}

      
    </div>
  );
}
export default Experiences;
