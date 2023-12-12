import { Challenge } from "@/types/challenges";
import {
  convertIpfsImageUrl,
  cutOffTooLongString,
  shortenAddress,
} from "@/utils";
import {
  useIonRouter,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSkeletonText,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel,
  IonContent,
  IonChip,
  IonButton,
} from "@ionic/react";
import { add, remove } from "ionicons/icons";
import React, { useState } from "react";

export interface MintItemContentProps {
  challenge: Challenge;
}

const MintItemContent: React.FC<MintItemContentProps> = ({
  challenge: { imageUrl, name, floorPrice, groupCount },
}: MintItemContentProps) => {
  const ipfsImageUrl = convertIpfsImageUrl(imageUrl);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);
  const router = useIonRouter();

  const handleDetailsClick = () => {};
  const handleChangeCollectiveClick = () => {};
  const handleMintClick = () => {};

  const handlePlusClick = () => {
    setAmount(amount + 1);
  };

  const handleMinusClick = () => {
    if (amount > 2) {
      setAmount(amount - 1);
    } else {
      setAmount(1);
    }
  };

  return (
    <IonContent>
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size="8">
            <IonCard className="challenge-mint-card">
              <img
                className="challenge-mint-img"
                alt="NFT Image"
                style={{ display: loading ? "none" : "block" }}
                src={ipfsImageUrl}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
              />
              {loading ? (
                <IonSkeletonText
                  className="challenge-mint-img-skeleton"
                  animated={true}
                ></IonSkeletonText>
              ) : null}
              <div className="challenge-time-chip challenge-time-chip-ontop">
                28 mins left
              </div>
              <IonCardHeader>
                <IonCardTitle>
                  {loading ? (
                    <IonSkeletonText animated={true}></IonSkeletonText>
                  ) : (
                    `Creator.eth`
                  )}
                </IonCardTitle>
                <IonCardSubtitle>
                  <div className="name">{cutOffTooLongString(name, 20)}</div>
                  <div className="cost">{floorPrice} ETH</div>
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid className="">
                  <IonRow className="ion-justify-content-left ion-align-items-center">
                    <IonCol size="auto">
                      <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>
                      <IonLabel>80</IonLabel>
                    </IonCol>
                    <IonCol size="auto">
                      <IonIcon src="/assets/icons/people-tile.svg"></IonIcon>
                      <IonLabel>{`${groupCount || 0}`}</IonLabel>
                    </IonCol>
                    <IonCol size="auto">
                      <IonIcon src="/assets/icons/message-tile.svg"></IonIcon>
                      <IonLabel>80</IonLabel>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center ion-align-items-center">
          <IonCol size="8" className="challenge-mint-amount-container">
            <IonButton
              className="challenge-mint-amount-btn"
              fill="outline"
              shape="round"
              size="small"
              onClick={handlePlusClick}
            >
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
            <IonButton
              className="challenge-mint-amount"
              fill="outline"
              shape="round"
              size="small"
            >
              <IonLabel>{amount}</IonLabel>
            </IonButton>
            <IonButton
              className="challenge-mint-amount-btn"
              fill="outline"
              shape="round"
              size="small"
              onClick={handleMinusClick}
            >
              <IonIcon slot="icon-only" icon={remove}></IonIcon>
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="6">NFT & Fee: 0.00077</IonCol>
          <IonCol size="2">
            <IonButton fill="clear" size="small" onClick={handleDetailsClick}>
              Details
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="6">Collective Name</IonCol>

          <IonCol size="2">
            <IonButton
              fill="clear"
              size="small"
              onClick={handleChangeCollectiveClick}
            >
              Change
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="mint-content-bottom-ribbon ion-justify-content-center ion-align-items-center">
          <IonCol size="12">
            <IonButton fill="clear" size="small" className="ion-no-padding">
              Mint in a Group
            </IonButton>
            <IonLabel> for a chance to get rewared</IonLabel>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="auto">
            <IonButton onClick={() => {}} color="primary" shape="round">
              Mint {floorPrice} ETH
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default MintItemContent;
