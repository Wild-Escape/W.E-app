import { useState, useEffect, useContext } from "react";
import { getConfirmedExperiencesService } from "../../../../services/payment.service";
import { createChatService, getChatsService } from "../../../../services/chat.service";
import { useNavigate } from "react-router-dom";
import {
  FaCalendar,
  FaTag,
  FaDollarSign,
  FaUser,
  FaEnvelope,
  FaComment,
} from "react-icons/fa";
import { AuthContext } from "../../../../context/auth.context";

function ConfirmedExperiences() {
  const [confirmedExperiences, setConfirmedExperiences] = useState([]);
  const [chats, setChats] = useState([]);
    useEffect(() => {
      getChatsService()
        .then((res) => {
          console.log("all chats--->", res);
          setChats(res);
        })
        .catch((err) => {
          console.error(err)
        });
    }, []);

  const navigate = useNavigate();

  useEffect(() => {
    getConfirmedExperiencesService()
      .then((res) => {
        console.log("confirmed experiences-->", res);
        setConfirmedExperiences(res);
      })
      .catch((err) => next(err));
  }, []);

  const createChat = (id) => {
    console.log("user id-->", id)
    createChatService(id)
      .then((response) => {
        console.log(response)
        navigate("/partner/messages");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-3" style={{ marginBottom: "70px" }}>
      <h1 className="mb-3">Confirmed experiences</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {confirmedExperiences.length > 0 &&
          confirmedExperiences.map((experience) => (
            <div className="col" key={experience._id}>
              <div className="card shadow-sm" >
                <div className="card-body" style={{margin:"0"}}>
                  <div className="d-flex align-items-center mb-3">
                    <FaCalendar className="text-muted me-2" />
                    <small className="text-muted">
                      {formatDate(experience.dates.start)}
                    </small>
                  </div>

                  <h5 className="card-title mb-3">
                    {experience.experience.name}
                  </h5>

                  <div className="row mb-3">
                    <div className="col">
                      <span className="badge bg-light text-dark">
                        <FaTag className="me-2" />
                        {experience.experience.type.join(", ")}
                      </span>
                    </div>
                    <div className="col text-end">
                      <h5 className="mb-0">
                        {experience.price.currency === "dollars" ? "$" : "€"} {experience.price.amount} {experience.price.currency}
                      </h5>
                    </div>
                  </div>

                  <div className="d-flex align-items-center border-top pt-3">
                    <img
                      src={experience.user.profileImage}
                      alt={experience.user.name}
                      className="rounded-circle me-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <p className="mb-1">
                        <FaUser className="me-2" />
                        {experience.user.name}
                      </p>
                      <p className="mb-0 text-muted small">
                        <FaEnvelope className="me-2" />
                        {experience.user.email}
                      </p>
                    </div>
                  </div>
                  {}
                  <button onClick={()=>createChat(experience.user.id)} className="btn btn-outline-primary w-100 mt-3">
                    <FaComment className="me-2" />
                    Text User
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ConfirmedExperiences;
