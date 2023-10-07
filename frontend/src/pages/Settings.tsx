import Header from '@/components/Header';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        Settings
      </IonContent>
    </IonPage>
  );
};

export default Settings;
