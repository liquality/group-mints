import Header from "@/components/Header";
import ChallengeRows from "@/components/Challenges/ChallengeRows";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Discover: React.FC = () => {
  return (
    <IonPage>
      <Header title="Discover" />
      <IonContent className="ion-padding" color="light">
        <ChallengeRows />
      </IonContent>
    </IonPage>
  );
};

export default Discover;
