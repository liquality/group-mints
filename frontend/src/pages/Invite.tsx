import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonSpinner,
  useIonRouter,
} from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
import { useEffect, useState } from "react";
import InvitesService from "@/services/Invites";
import { shortenAddress } from "@/utils/adddress";
import { useAccount, useNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { pathConstants } from "@/utils/routeNames";
import { useSignInWallet } from "@/hooks/useSignInWallet";
import ContractService from "@/services/ContractService";
export interface InvitePageProps
  extends RouteComponentProps<{
    id?: string;
    code?: string;
  }> {}

const Invite: React.FC<InvitePageProps> = ({ match }) => {
  const { id, code } = match.params;
  const [invite, setInvite] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<boolean>(false);
  const router = useIonRouter();
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const { user } = useSignInWallet();
  const claimInviteAvailable = invite && user && address;
  const { chains, chain } = useNetwork();

  useEffect(() => {
    setLoading(true);
    if (id) {
      (async () => {
        const result = await InvitesService.getInvite(id);
        setInvite(result);
      })();
    } else if (code) {
      (async () => {
        const result = await InvitesService.getInviteByCode(code);
        setInvite(result);
      })();
    }
    setLoading(false);
  }, [id, code]);

  console.log(invite, "wats invite?");
  async function handleConnect() {
    setProcessing(true);
    if (claimInviteAvailable) {
      try {
        await ContractService.joinCollective(
          invite.code,
          invite.groupPublicAddress,
          invite.groupWalletAddress,
          invite.groupNonceKey
        );
        await InvitesService.claim(invite.id, address!);
        const url = pathConstants.collective.mints.replace(
          ":groupId",
          invite.groupId
        );
        console.log(url, "wats url?");
        router.push(url);
      } catch (error) {
        console.log(error, "Error adding member");
      }
    }
    setProcessing(false);
  }

  useEffect(() => {
    if (user) {
      //TODO: Imo not great UX to auto-join, so commented out for now
      //handleConnect();
    }
  }, [user]);

  async function onConnect() {
    if (invite) {
      setProcessing(true);
      if (address) {
        //TODO: Imo not great UX to auto-join, so commented out for now
        //await handleConnect();
      } else {
        await open();
      }
    }
    setProcessing(false);
  }

  function enterWithoutConnecting() {
    router.push("/");
  }

  return (
    <IonPage>
      <IonContent
        fullscreen={true}
        className="ion-padding invite-page invite-page-link"
      >
        <IonGrid className="invite-content">
          <IonRow className="ion-margin-top">
            <IonCol size="12" className="ion-padding ion-text-center">
              <h1 className="title">
                MyCollective<span className="tech">.tech</span>
              </h1>
              <div className="subtitle">Discover, Mint & Earn with Friends</div>
            </IonCol>
          </IonRow>
          {loading ? (
            <IonRow>
              <IonCol size="12" className="ion-padding ion-text-center">
                <IonSpinner name="circular"></IonSpinner>
              </IonCol>
            </IonRow>
          ) : invite ? (
            <>
              <IonRow className="ion-margin-top">
                <IonCol size="12" className="ion-padding ion-text-center">
                  <IonIcon
                    className="greetings-icon"
                    src="./assets/icons/congrats.svg"
                  />
                  <h1 className="greetings">Congrats!</h1>
                  <div className="message">
                    <small>
                      <b>{shortenAddress(invite.userAddress)}</b>
                    </small>{" "}
                    invited you to join
                  </div>
                </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-center">
                <IonCol size="12" className="ion-padding ion-margin">
                  <div className="invite-group-details">
                    <h3 className="group-name">{invite.groupName}</h3>
                    <p className="group-desc">{invite.groupDescription}</p>
                  </div>
                </IonCol>
              </IonRow>
              <IonRow></IonRow>
            </>
          ) : (
            <IonRow>
              <IonCol size="12" className="ion-padding ion-text-center">
                <div className="subtitle">
                  Not valid invite found, please check and try again.
                </div>
              </IonCol>
            </IonRow>
          )}

          {loading ? null : (
            <>
              <IonRow className="ion-margin-top">
                <IonCol size="12" className="ion-text-center">
                  <IonButton
                    disabled={processing}
                    shape="round"
                    fill="solid"
                    className="invite-action-btn"
                    onClick={claimInviteAvailable ? handleConnect : onConnect}
                  >
                    {processing ? (
                      <IonSpinner name="circular"></IonSpinner>
                    ) : claimInviteAvailable ? (
                      "Confirm Invite"
                    ) : (
                      "Connect"
                    )}
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="ion-text-center">
                  <IonButton
                    disabled={processing}
                    fill="clear"
                    className="invite-clear-btn"
                    onClick={enterWithoutConnecting}
                  >
                    Continue Without Connecting
                  </IonButton>
                  <div className="invite-footer-text">
                    You can see NFTs but won’t join.
                  </div>
                </IonCol>
              </IonRow>
            </>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Invite;
