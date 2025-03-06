import { getChatService, sendMessageService } from "../../../../services/chat.service";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { AuthContext } from "../../../../context/auth.context";
import { useContext } from "react";


const Chat = () => {
    const [chat, setChat] = useState(null);
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const intervalRef = useRef(null)
    const { currentUser } = useContext(AuthContext);
  
    const handleChange = (e) => {
      setMessage(e.target.value);
    }
  
    const getChat = useCallback(() => {
      getChatService(id)
        .then((response) => {
          console.log(response)
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
    }
  
    useEffect(() => {
      getChat();
  
      intervalRef.current = setInterval(() => {
        getChat();
      }, 2000);
    }, [getChat]);
  
    return (
      <div className="container p-3" style={{marginBottom:"70px"}}>
        
          <div className="card-header d-flex align-items-center" style={{margin:""}}>
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
            <p className="fw-bold mb-0">
              {chat?.participants[1].name}
            </p>
          </div>
          <div className="card-body">
  
            <ul className="list-group list-group-flush">
              {chat?.messages.map((message, index) => (
                <li key={index} className={`list-group-item d-flex ${message.sender.id === currentUser.id && "justify-content-end" } `}>
                  <div className="me-2">{message.text}</div>
                  <div className="small text-muted">{new Date(message.sender.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }).replace(":", ".")}</div> 
                </li>
              ))}
            </ul>
  
          </div>
          <div className="chat-form">
            <form onSubmit={createMessage}>
              <div className="form-group p-4 d-flex">
                <textarea onChange={handleChange} value={message} style={{height:"20px"}} type="text" className="form-control" id="message" />
                <button type="submit" className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" style={{marginLeft:"7px"}}><IoMdSend /></button>
              </div>
              
               
              
            </form>
          </div>
        
      </div>
    );
  };
  
  export default Chat;
  