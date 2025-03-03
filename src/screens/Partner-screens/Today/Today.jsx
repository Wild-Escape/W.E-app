import { useEffect, useState } from "react";
import { getPendingPaymentsService } from "../../../services/payment.service";
import { FaCalendarAlt, FaRegUserCircle } from "react-icons/fa";
import { confirmExperienceService, declineExperienceService } from "../../../services/payment.service";
function Today() {
  const [pendingExperiences, setPendingExperiences] = useState([]);
  useEffect(() => {
    getPendingPaymentsService()
      .then((res) => {
        setPendingExperiences(res);
        console.log("pending payments-->", res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const confirmPayment = async (id) => {
    try {
      const res = await confirmExperienceService(id);
      console.log("experience confirmed", res);
      
      const pendingExperiences = await getPendingPaymentsService();
      setPendingExperiences(pendingExperiences);
    } catch (error) {
      console.error(error);
      next(error); 
    }
  };

  const declinePayment = async (id) => {
    try {
      const res = await declineExperienceService(id);
      console.log("experience declined", res);
      
      const pendingExperiences = await getPendingPaymentsService();
      setPendingExperiences(pendingExperiences);
    } catch (error) {
      console.error(error);
      next(error); 
    }
  };

  return (
    <div className="p-3">
      <p clas> Today preview </p>
      {pendingExperiences.length === 0 && (
        <div>
          <p>No pending experiences :(</p>
        </div>
      )}
      {pendingExperiences &&
        pendingExperiences.map((experience) => (
          <div key={experience._id} className="row mb-4">
            <div className="col-12 col-md-8 mx-auto">
              <div className="card shadow-sm hover-shadow-lg-hover transition-all h-100 p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <span className="text-dark">
                      <FaCalendarAlt className="me-1" />
                      Date:{" "}
                      {new Date(experience.dates.start).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`  badge ${
                        experience.experience.status === "confirmed"
                          ? "bg-success"
                          : experience.experience.status === "pending"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {experience.experience.status}
                    </span>
                  </div>
                </div>

                <div className="mt-3 ">
                  
                    
                    <p><FaRegUserCircle /> User name: {experience.user.name} </p>
                  
                  <p>Experience: {experience.experience.name} </p>
                  <div className="d-flex justify-content-between">
                    <p className="badge bg-info">
                      Type: {experience.experience.type[0]}{" "}
                    </p>
                    {experience.experience.type[0] === "express" ? (
                      <div>
                        <button onClick={()=>declinePayment(experience._id)} className="btn btn-danger ">Decline</button>
                        <button onClick={()=>confirmPayment(experience._id)} className="btn btn-primary ms-2">
                          Confirm
                        </button>
                      </div>
                    ) : (
                      <button className="btn btn-primary">Review</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Today;
