import { useEffect, useState } from "react";
import { getPendingPaymentsService } from "../../../services/payment.service";

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

    return (
        <div>
            <p>Let's see if we have pending experiences!! </p>
            {pendingExperiences.length === 0 && (
                <div>
                    <p>No pending experiences :(</p>

                </div>
            )}
            {pendingExperiences && pendingExperiences.map((experience) => (
                <div key={experience._id} className="row mb-4">
                    <div className="col-12 col-md-8 mx-auto">
                        <div className="card shadow-sm hover-shadow-lg-hover transition-all h-100 p-3">
                            <div className="d-flex  justify-content-between">
                                <div className="d-flex justify-content-between" >
                                    <span className="text-dark">
                                        Date: {new Date(experience.dates.start).toLocaleDateString(
                                            "en-US",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )}
                                    </span>

                                    <span
                                        className={`  badge ${experience.experience.status === "confirmed"
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
                                <div>
                                    <p>User name: {experience.user.name} </p>
                                    <p>Experience: {experience.experience.name} </p>
                                    <p>Type: {experience.experience.type[0]} </p>
                                    {experience.experience.type[0]=== "express" ? (<button className="btn btn-primary">Confirm</button>) : (<button className="btn btn-primary">Review</button>)}
                                    

                                </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default Today;