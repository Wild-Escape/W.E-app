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
      .catch((error) => next(error));
  }, []);
  return (
    <div className="p-3" style={{ marginBottom: "50px" }}>
      <div className="d-flex justify-content-between mb-3">
        <h1 className="mb-3">Postings</h1>
        <Link className="btn btn-secondary mb-3" to="/partner/create-post">
          Add Experience
        </Link>
      </div>
      <div class="row row-cols-1 row-cols-md-2 g-4">
        {partnerExperiences &&
          partnerExperiences.map((experience) => (
            <div class="col" key={experience._id}>
              <div className="card mb-3" >
                <img
                  src={experience.gallery[0]}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{experience.name}</h5>
                  <p className="card-text">{experience.intro}</p>
                  <Link
                    to={`/partner/experience/${experience._id}/details`}
                    className="btn btn-primary"
                  >
                    See details
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Experiences;
