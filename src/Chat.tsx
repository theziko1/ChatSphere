import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
type content = {
  user: string;
  message: string;
  room: string;
};

type ChatProps = { socket: Socket<DefaultEventsMap, DefaultEventsMap>; username: string; room: number };

const Chat: React.FC<ChatProps> = ({ socket, username, room }) => {
  const [messages, setMessages] = useState<content[] | undefined>([]);
  const [currentMsg, setCurrentMsg] = useState<string>("");
  const [joinedMessage, setJoinedMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // const getUser =async () => {
  //   const res = await fetch('http://localhost:5000/api/v1/user')
  //   const data = await res.json()
  //   console.log(data)
  // }

  const getMessages = async () => {
    try {
      const res = await axios.get<content[]| undefined>("https://chatsphere-60b8.onrender.com/api/v1/messages");
      const data =  res.data;
      setMessages(data);
      
    } catch (error) {
      console.log("🚀 ~ getMessages ~ error:", error)
      
    }
  };

  const sendMessage = async () => {
    if (currentMsg !== "") {
      const DataMsg = {
        user: username,
        message: currentMsg,
        room: room,
      };
       socket.emit("send-msg", DataMsg);
      setMessages((list: any) => [...list, DataMsg]);
      //  console.log(messages)
      setCurrentMsg("");
    }
  };

  const exitUser = async () => {
    socket.emit("leftuser", username);
    setJoinedMessage(`${username}`);
    navigate("/");
  };

  useEffect(() => {
    getMessages();

    socket.on("chat", (data: content) => {
      console.log(data);
      setMessages((list) => [...list || [], data]);
    });

    socket.on("new-user", (username: string) => {
      setJoinedMessage(`${username}`);
    });

    socket.on("left-user", (username: string) => {
      setJoinedMessage(`${username}`);
    });

    return () => {
      socket.off("chat");
      socket.off("left-user");
    };
  }, [socket, username]);

  console.log(messages);

  return (
    <div className="fixed w-full h-full  max-h-[600px]  border-x border-solid border-[#eee]">
      <div className="bg-[#111] h-[50px] flex justify-between items-center py-1 px-5">
        <div className="text-[#eee] text-xl font-semibold">ChatRoom</div>
        <button
          onClick={exitUser}
          className="py-2 px-3 text-xl cursor-pointer outline-none border border-[#eee] border-solid bg-transparent text-[#eee]"
        >
          Exit
        </button>
      </div>
      <div className=" w-full h-[70%] bg-[#f5f5f5] overflow-auto  pb-16">
        {messages?.map((message, idx) => (
          <div
            key={idx}
            className={`flex p-3 ${
              username === message.user ? "justify-end" : "justify-start"
            }`}
          >
            <div className="max-w-3/4 bg-[#fff] shadow-md p-3">
              <div className="text-xl text-[#555] mb-1">
                {username === message.user ? "you" : message.user} :
              </div>
              <div className="break-words">{message.message}</div>
            </div>
          </div>
        ))}
      </div>

      {joinedMessage ? (
        <div className="bg-black font-bold text-white text-center p-3 italic">
          {" "}
          {joinedMessage}{" "}
        </div>
      ) : (
        ""
      )}

      <div className="fixed bottom-2 w-full h-12 flex shadow-md z-10">
        <input
          type="text"
          value={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
          className="flex-1 h-12 text-xl border-black border-2"
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="w-20 h-full bg-[#111] text-[#eee] text-xl outline-none border-none cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
