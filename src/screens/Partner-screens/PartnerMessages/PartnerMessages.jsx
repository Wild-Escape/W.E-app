import { getChatsService } from "../../../services/chat.service";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PartnerMessages() {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    getChatsService()
      .then((res) => {
        console.log("all chats--->", res);
        setChats(res);
      })
      .catch((err) => next(err));
  }, []);

  return (
    <div className="p-3">
      <h1>Messages</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {chats &&
          chats.map((chat) => (
            <div className="col" key={chat.id}>
              <div className=" p-2 border-bottom d-flex align-items-center justify-content-around">
                <img
                  src={`${chat.participants[1].profileImage}`}
                  className="rounded-circle me-3"
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                  }}
                  alt="profile image"
                />
                
                <h4>@ {chat.participants[1].name}</h4>
                <Link to={`/chat/${chat.id}`} className="btn btn-info">enter chat</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PartnerMessages;
