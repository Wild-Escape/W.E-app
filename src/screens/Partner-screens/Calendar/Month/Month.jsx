import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChatsService } from "../../../../services/chat.service";
import { GiDinosaurRex } from "react-icons/gi";
import { Link } from "react-router-dom";
import {
  FaCalendar,
  FaTag,
  FaUser,
  FaEnvelope,
  FaComment,
} from "react-icons/fa";


function Month() {
  const location = useLocation();
  const { experiences } = location.state || {};
  const { month } = useParams();
  console.log("experiences--->", experiences);
  console.log("month--->", month);

  const [chats, setChats] = useState([]);
  useEffect(() => {
    getChatsService()
      .then((res) => {
        console.log("all chats--->", res);
        setChats(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <div className="p-3" style={{ marginBottom: "70px" }}>
      <h1>{month}</h1>
      {experiences.length === 0 && <div className="d-flex align-items-center justify-content-center p-3 mt-3 border border-light-subtle rounded-3">
        <GiDinosaurRex style={{ marginRight: "15px" }} size={23 } />
        <p className="m-0 fs-5"> 
          No experiences yet
        </p>
      </div>}
      <div className="row row-cols-1 row-cols-md-2 g-4">

        {experiences.length > 0 &&
          experiences.map((experience) => (
            <div className="col" key={experience._id}>
              <div className="card shadow-sm">
                <div className="card-body" style={{ margin: "0" }}>
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
                        {experience.price.currency === "dollars" ? "$" : "€"}{" "}
                        {experience.price.amount} {experience.price.currency}
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
                  {(() => {
                    const chat = chats.find(
                      (chat) => chat.participants[1].id === experience.user.id
                    );

                    return chat ? (
                      <Link
                        to={`/chat/${chat.id}`} // Just the id here
                        className="btn btn-outline-primary w-100 mt-3"
                      >
                        <FaComment className="me-2" />
                        Go to chat
                      </Link>
                    ) : (
                      <button
                        onClick={() => createChat(experience.user.id)}
                        className="btn btn-outline-primary w-100 mt-3"
                      >
                        <FaComment className="me-2" />
                        Text User
                      </button>
                    );
                  })()}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Month;


