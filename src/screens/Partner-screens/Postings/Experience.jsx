import { Link } from "react-router-dom";
import { getPartnerExperiences } from "../../../services/experiences.service";
import { useState, useEffect } from "react";

function Postings() {
  const [partnerExperiences, setPartnerExperiences] = useState([]);
  
  
  useEffect(() => {
    getPartnerExperiences()
      .then((res) => {
        console.log("this are the experiences", res.data.shelterTrips
        );
        setPartnerExperiences(res.data.shelterTrips);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="p-3">
      <p>Here we will have all the expreiences created by this admin</p>
      <ul>
        {partnerExperiences && partnerExperiences.map((experience)=>
            <li>
                <p>{experience.name}</p>
            </li>
        )}
      </ul>
      <Link className="btn btn-secondary" to="/partner/create-post">
        Add Experience
      </Link>
    </div>
  );
}
export default Postings;
