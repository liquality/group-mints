import {
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";

import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { RouteComponentProps } from "react-router";
import PageSearchBar from "@/components/PageSearchBar";
import RewardsTopBar from "@/components/TopBars/RewardsTopBar";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import { shortenAddress } from "@/utils";
import { useMemo } from "react";
import { useSignInWallet } from "@/hooks/useSignInWallet";
import GenerateInviteBtn from "@/components/GenerateInvite";
import { pathConstants } from "@/utils/routeNames";
import Header from "@/components/Header";
import useGetRewardsSummary from "@/hooks/useGetRewardsSummary";

const Summary: React.FC<RouteComponentProps> = (routerProps) => {
  //TODO: change parent tag to IonPage

  const { myGroups, loading, reload } = useGetMyGroups();
  const { user } = useSignInWallet();
  const { summary, loading: loadingSummary } = useGetRewardsSummary();
  const router = useIonRouter();

  const loadingAllData = !myGroups && loading && loadingSummary;

  const myCollectives = useMemo(() => {
    if (myGroups && user?.id) {
      return myGroups.filter((group) => group.createdBy === user.id);
    } else return [];
  }, [myGroups, user?.id]);

  const memberOfCollectives = useMemo(() => {
    if (myGroups && user?.id) {
      return myGroups.filter((group) => group.createdBy !== user.id);
    } else return [];
  }, [myGroups, user?.id]);

  const handleManageNavigation = (groupId: string) => {
    const url = pathConstants.rewards.manage.replace(":groupId", groupId);
    router.push(url, "root");
  };

  const handleLeaveGroup = (groupId: string) => {
    // TODO: Implement
  };

  return (
    <IonPage>
      <Header title="Rewards" />

      <IonContent className="ion-padding" color="light">
        <RewardsTopBar {...routerProps}>
          <PageSearchBar searchEnabled={false} reloadEnabled={false} />
        </RewardsTopBar>
        {loadingAllData ? (
          <PageLoadingIndicator />
        ) : (
          <>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonCol size="6">
                  <div className="rewards-summary-item">
                    <div className="rewards-summary-amount">
                      {summary?.invitesCount || 0}
                    </div>
                    <div className="rewards-summary-description">
                      Succesful Invites
                    </div>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div className="rewards-summary-item">
                    <div className="rewards-summary-amount">
                      {summary?.mintsAmount || 0}
                    </div>
                    <div className="rewards-summary-description">Mints</div>
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <div className="rewards-summary-item">
                    <div className="rewards-summary-amount">
                      {summary?.rewardsCount || 0}
                    </div>
                    <div className="rewards-summary-description">Rewards</div>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div className="rewards-summary-item">
                    <div className="rewards-summary-amount">
                      {summary?.ethEarned || "0.00"}
                    </div>
                    <div className="rewards-summary-description">
                      ETH Earned
                    </div>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonCol>
                  <div className="rewards-collective-card">
                    <div className="rewards-collective-card-title">
                      My Collectives | {myCollectives?.length}
                    </div>

                    {myCollectives?.map((group, index) => (
                      <div key={index}>
                        <IonRow className="ion-justify-content-between ion-align-items-center">
                          <div className="rewards-collective-card-group-name">
                            {group.name}{" "}
                          </div>
                          <div className="rewards-collective-card-group-actions">
                            <GenerateInviteBtn groupId={group.id} /> |{" "}
                            <IonText
                              color="primary"
                              style={{ pointer: "cursor" }}
                              onClick={() => handleManageNavigation(group.id)}
                            >
                              Manage
                            </IonText>
                          </div>
                        </IonRow>

                        <IonRow className="ion-justify-content-between ion-align-items-center">
                          <div className="rewards-collective-card-group-address">
                            {shortenAddress(group.publicAddress || "")}
                          </div>
                          <div>
                            <IonLabel className="rewards-collective-card-group-data">
                              <IonIcon src="/assets/icons/people-tile.svg"></IonIcon>
                              {group.memberCount}
                            </IonLabel>
                            <IonLabel className="rewards-collective-card-group-data">
                              <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>
                              {group.mintCount}
                            </IonLabel>
                          </div>
                        </IonRow>
                      </div>
                    ))}
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <div className="rewards-collective-card">
                    <div className="rewards-collective-card-title">
                      Member of Collectives | {memberOfCollectives?.length}
                    </div>

                    {memberOfCollectives?.map((group, index) => (
                      <div key={index}>
                        <IonRow className="ion-justify-content-between ion-align-items-center">
                          <div className="rewards-collective-card-group-name">
                            {group.name}{" "}
                          </div>
                          <div className="rewards-collective-card-group-actions">
                            <GenerateInviteBtn groupId={group.id} /> |{" "}
                            <IonText
                              color="primary"
                              style={{ pointer: "cursor" }}
                              onClick={() => handleLeaveGroup(group.id)}
                            >
                              Leave
                            </IonText>
                          </div>
                        </IonRow>

                        <IonRow className="ion-justify-content-between ion-align-items-center">
                          <div className="rewards-collective-card-group-address">
                            {shortenAddress(group.publicAddress || "")}
                          </div>
                          <div>
                            <IonLabel className="rewards-collective-card-group-data">
                              <IonIcon src="/assets/icons/people-tile.svg"></IonIcon>
                              {group.memberCount}
                            </IonLabel>
                            <IonLabel className="rewards-collective-card-group-data">
                              <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>
                              {group.mintCount}
                            </IonLabel>
                          </div>
                        </IonRow>
                      </div>
                    ))}
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Summary;
