import { getChatsService, getChatService, } from "../../../services/chat.service";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import './UserMessages.css'

function UserMessages () {
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
   
     return (
       <div id="messages-container">
         <h1>Messages</h1>
         <div className="row row-cols-1 row-cols-md-1 g-4">
          {chats.length === 0 && <div>
            <p>No messages yet</p>
            </div>}
           {chats &&
             chats.map((chat) => (
               <Link
                 to={`/user/chat/${chat.id}`}
                 className="col"
                 key={chat.id}
                 style={{ textDecoration: "none", color:"inherit" }}
               >
                 <div className=" p-2 border-bottom d-flex align-items-center justify-content-between">
                   <div className="d-flex">
                     <img
                       src={`${chat.participants[0].profileImage}`}
                       className="rounded-circle me-3"
                       style={{
                         width: "40px",
                         height: "40px",
                         objectFit: "cover",
                       }}
                       alt="profile image"
                     />
                     <div>
                     <h5 className="mb-0">@ {chat.participants[0].name.split(" ")[0]}...</h5>
                     <p className="mb-0 ms-3 small text-muted">{chat.messages.at(-1)?.text.slice(0,27)}{chat.messages.length > 0 && "..."}</p>
   
                     </div>
                   </div>
                     <IoIosArrowForward />
                 </div>
               </Link>
             ))}
         </div>
       </div>
      );
}

export default UserMessages;