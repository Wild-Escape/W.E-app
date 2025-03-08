import {
  getChatService,
  sendMessageService,
} from "../../../../services/chat.service";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { AuthContext } from "../../../../context/auth.context";
import { useContext } from "react";
import "./Chat.css";
import { Link } from "react-router-dom";

const Chat = () => {
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const intervalRef = useRef(null);
  const { currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const getChat = useCallback(() => {
    getChatService(id)
      .then((response) => {
        console.log(response);
        setChat(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const createMessage = (e) => {
    e.preventDefault();

    sendMessageService(id, message)
      .then((response) => {
        setMessage("");
        getChat();
      })
      .catch((error) => {
        console.error(error);
      });
  };


  useEffect(() => {
    getChat();

    intervalRef.current = setInterval(() => {
      getChat();
    }, 2000);
  }, [getChat]);

  return (
    <div className="container p-3" style={{ marginBottom: "70px" }}>
      <div
      id="chat-header"
        className="card-header p-3 d-flex align-items-center"
        style={{ backgroundColor: "white", width: "100vw" }}
      >
        <Link to="/partner/messages" className="me-3">
          <IoChevronBackOutline size={20} />
        </Link>
        <img
          src={`${chat?.participants[1].profileImage}`}
          className="rounded-circle me-3"
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
          }}
          alt="profile image"
        />
        <p className="fw-bold mb-0">{chat?.participants[1].name}</p>
      </div>

      <div id="chat-body" className="card-body">
        <ul className="list-group list-group-flush">
          {chat?.messages.map((message, index) => (
            <li
              key={index}
              className={`list-group-item rounded-4 mb-2 ${
                message.sender.id === currentUser.id && "justify-content-end ms-4"
              } ${
                message.sender.id !== currentUser.id && "justify-content-end me-4"
              } `}
              style={{backgroundColor:`${message.sender.id === currentUser.id ? ("rgba(204, 15, 91, 0.25)"):("rgba(0, 15, 144, 0.25)") }`}}
            >
              <div className="me-2">{message.text}</div>
              <div className="text-muted" style={{textAlign:`${message.sender.id === currentUser.id && "end"}`}}>
                {new Date(message.sender.createdAt)
                  .toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })
                  .replace(":", ".")}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-form">
        <form onSubmit={createMessage}>
          <div
            id="text-area"
            className="form-group p-4 d-flex"
            style={{ position: "sticky" }}
          >
            <textarea
              onChange={handleChange}
              value={message}
              style={{ height: "20px", resize:"none"}}
              type="text"
              className="form-control rounded-4"
              id="message"
            />
            <button
              type="submit"
              className="d-flex align-items-center justify-content-center"
            >
              <IoMdSend className="ms-1" size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
