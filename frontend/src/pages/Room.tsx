import React, { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
} from "@ionic/react";
import Chat from "@/components/Chat";
import UserService from "../services/UserService";
import { Group } from "@/types/chat";
import Header from "@/components/Header";

const Room = () => {
  const [isInChat, setIsInChat] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState<number | null>(null);

  const handleEnterChat = async () => {
    const groupObject: Group = {
      group_name: groupName,
    };
    try {
      const result = await UserService.createGroup(groupObject);
      setGroupId(result.id);
      setIsInChat(true);
    } catch (error) {
      console.log(error, "error posting group");
    }
  };

  //TODO: add usefecct/custom hook here that fetches all users groups
  //and displays them if he/she is in them, if not display 'create group'
  return (
    <IonPage>
     <Header />
      <IonContent fullscreen>
        <ProtectedRoute>
          {" "}
          {!isInChat ? (
            <IonItem className="room">
              <IonLabel>Type room name: </IonLabel>

              <input onChange={(e) => setGroupName(e.target.value)} />
              <IonButton onClick={handleEnterChat}>Create Chat</IonButton>
            </IonItem>
          ) : (
            <Chat groupName={groupName} groupId={groupId} />
          )}
        </ProtectedRoute>
      </IonContent>
    </IonPage>
  );
};

export default Room;
