import { useState, useEffect } from "react"
import { getExperienceDetails } from "../../../../services/experiences.service"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
function ExperienceDetails() {
    const { expeienceId } = useParams();
    console.log("the id-->", expeienceId)
    const [experience, setExperience] = useState(null)
    useEffect(() => {
        getExperienceDetails(expeienceId)
            .then((res) => {
                console.log("THis is de data--->>", res.trip)
                setExperience(res.trip)
            })
            .catch((error) => {
                console.log(error)
                next(error)
            })
    }, [])
    return (
        <div>

            {experience && <div className="container-md mx-auto p-4 bg-white rounded-3 shadow-sm" style={{ marginBottom: "100px" }}>
                {/* Header Section */}
                <div className="mb-4 pb-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <h1 className="display-5 fw-bold text-dark mb-2">{experience.name}</h1>
                            <div className="d-flex align-items-center gap-2">
                                <span className="fs-5 text-secondary">📍 {experience.location}</span>

                            </div>
                        </div>
                        <div className="text-end">
                            <h2 className="text-success fw-bold mb-0">
                                {experience.price} {experience.currency}
                            </h2>
                            <small className="text-muted">per {experience.durationType}</small>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="row g-4">
                    {/* Left Column */}
                    <div className="col-md-8">
                        <p className="lead text-muted mb-4">{experience.intro}</p>

                        {/* Duration & Type */}
                        <div className="bg-light p-3 rounded-2 mb-4">
                            <div className="d-flex gap-5">
                                <div>
                                    <p className="fw-bold mb-1">Duration</p>
                                    <p className="text-muted mb-0">
                                        {experience.duration} {experience.durationType}
                                    </p>
                                </div>
                                <div>
                                    <p className="fw-bold mb-1">Experience Type</p>
                                    <p className="text-muted mb-0">{experience.type.join(', ')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Coordinates */}
                        <div className="mb-4">
                            <p className="fw-bold mb-2">Coordinates</p>
                            <div className="d-flex gap-3 text-muted">
                                <span>Lat: {JSON.parse(experience.coordinates).lat.toFixed(4)}</span>
                                <span>Lng: {JSON.parse(experience.coordinates).lng.toFixed(4)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Gallery */}
                    <div className="col-md-4">
                        <div className="d-flex flex-column gap-3">
                            {experience.gallery.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Experience visual ${index + 1}`}
                                    className="img-fluid rounded-2 shadow-sm"
                                    style={{ height: '180px', objectFit: 'cover' }}
                                />
                            ))}
                        </div>
                    </div>
                </div>



                {/* Footer */}
                <div className="mt-4 pt-3 border-top text-muted small">
                    <p className="mb-1">Created at: {new Date(experience.createdAt).toLocaleDateString()}</p>

                </div>
                {experience.type[0] === "express" ? (
                    <Link to="/user/checkout" className="btn btn-success mt-4">
                        Reserve now
                    </Link>
                ) : (
                    <Link className="btn btn-success mt-4">
                        Send a booking request
                    </Link>
                )}
            </div>}
        </div>
    )
}
export default ExperienceDetails



