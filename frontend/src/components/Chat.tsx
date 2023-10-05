import React, { FormEvent, useEffect, useState } from "react";
import "../theme/chat-box.css";
//@ts-ignore
import websocketService from "../services/Websocket/WebsocketService";
import eventBus from "../services/Websocket/EventBus";
import { messageTypes } from "../services/Websocket/MessageHandler";
//@ts-ignore
import UserService from "../services/UserService";
import { Message } from "@/types/chat";
import GenerateInvite from "./GenerateInvite";
import { useChatHistory } from "@/hooks/useChatHistory";

interface ChatProps {
  groupName?: string;
  groupId: number | null;
}

export const Chat = (props: ChatProps) => {
  const { groupName, groupId } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { chatHistory, loading } = useChatHistory(groupId as number);

  const listenToCrossmintSuccess = (data: Message) => {
    const newMessage = data;
    setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
    console.log("Websocket event sent from db", data);
  };

  useEffect(() => {
    //TODO: replace with userid/address
    if (chatHistory.length) {
      setMessages(chatHistory);
    }
    websocketService.connect(2);
    eventBus.on(messageTypes.CROSSMINT_SUCCESS, listenToCrossmintSuccess);
    return () => {
      eventBus.remove(messageTypes.CROSSMINT_SUCCESS, listenToCrossmintSuccess);
    };
  }, [chatHistory]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage === "") return;
    //submit message to db

    try {
      const message = {
        sender: "0x012", //TODO replace with user public address
        text: newMessage,
        group_id: groupId as number,
      };
      const postMessage = await UserService.createMessage(message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setNewMessage("");
  };
  console.log(messages, "msgs", groupId, newMessage);
  return (
    <div className="chat">
      <u>
        WELCOME TO
        <b> {groupName}</b>
      </u>
      <br></br>
      <br></br>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <span>
              <b>{message.sender}</b>
            </span>
            <div>{message.text}</div>{" "}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type message.."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        ></input>
        <button type="submit">Send</button>
      </form>
      <GenerateInvite groupId={groupId} />
    </div>
  );
};

export default Chat;
