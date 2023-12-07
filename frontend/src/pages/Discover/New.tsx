import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonPage,
} from "@ionic/react";
import HorizontalSwipe from "@/components/Images/HorizontalSwipe";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { RouteComponentProps } from "react-router";
import PageSearchBar from "@/components/PageSearchBar";
import DiscoverTopBar from "./DiscoverTopBar";
import { useEffect, useRef, useState } from "react";
import CreateGroupModal from "./CreateChallengeModal";
import { Challenge } from "@/types/challenges";
import ChallengeItemModal from "@/components/ChallengeSwipeModal/ChallengeItemModal";


const New: React.FC<RouteComponentProps> = (routerProps) => {
  const { challenges, loading, setChallenges } = useGetChallenges();
  const page = useRef(undefined);
  const createChallengeModal = useRef<HTMLIonModalElement>(null);
  const [itemModalIsOpen, setItemModalIsOpen] = useState(false);

  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);
  const [resultChallenge, setResultChallenge] = useState<Challenge | null>(
    null
  );

  const [selectedChallenge, setSelectedChallenge] = useState<
    Challenge | undefined | null
  >();

  useEffect(() => {
    //If a new challenge has been created, push into exisitng challenge array state to avoid re-fetching of challenges
    if (resultChallenge) {
      setChallenges((prevGroups: Challenge[]) => [
        ...(prevGroups || []),
        resultChallenge,
      ]);
    }
    setPresentingElement(page.current);
  }, [resultChallenge]);

  function hideCreateChallengeModal() {
    createChallengeModal.current?.dismiss();
  }

  function handleCreateChallenge(groupId: number) {
    hideCreateChallengeModal();
  }

  const onChallengeSelected = async (challenge: Challenge) => {
    setSelectedChallenge(challenge);
  };

  const onCloseChallenteItemModal = () => {
    setSelectedChallenge(null);
  };

  useEffect(() => {
    if (selectedChallenge) {
      !itemModalIsOpen && setItemModalIsOpen(true);
    } else {
      setItemModalIsOpen(false);
    }
  }, [selectedChallenge]);

  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <DiscoverTopBar {...routerProps}>
          <PageSearchBar />
        </DiscoverTopBar>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton
            id="open-create-challenge-modal"
            className="create-fab-button"
          >
            <IonIcon src="/assets/icons/add.svg"></IonIcon>
            <IonLabel>Create Challenge</IonLabel>
          </IonFabButton>
        </IonFab>

        <CreateGroupModal
          trigger="open-create-challenge-modal"
          ref={createChallengeModal}
          presentingElement={presentingElement}
          dismiss={hideCreateChallengeModal}
          onSuccess={handleCreateChallenge}
          resultChallenge={resultChallenge}
          setResultChallenge={setResultChallenge}
        />

        <div className="spaced-on-sides">
          <IonLabel>Art | {challenges?.length}</IonLabel>
          <IonLabel color="primary">See All</IonLabel>
        </div>

        <HorizontalSwipe
          imageData={challenges}
          setSelectedChallenge={onChallengeSelected}
          loading={loading}
        ></HorizontalSwipe>

        <div className="spaced-on-sides">
          <IonLabel>Music | {challenges?.length}</IonLabel>
          <IonLabel color="primary">See All</IonLabel>
        </div>
        <HorizontalSwipe
          setSelectedChallenge={onChallengeSelected}
          imageData={challenges}
          loading={loading}
        ></HorizontalSwipe>
        <ChallengeItemModal
          isOpen={itemModalIsOpen}
          challenges={challenges}
          selectedChallengeId={selectedChallenge?.id}
          presentingElement={presentingElement!}
          dismiss={onCloseChallenteItemModal}
        />
      </IonContent>
    </IonPage>
  );
};

export default New;
