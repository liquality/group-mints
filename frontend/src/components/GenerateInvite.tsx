import { useSignInWallet } from "@/hooks/useSignInWallet";
import useToast from "@/hooks/useToast";
import InvitesService from "@/services/Invites";
import { handleCopyClick } from "@/utils";
import { IonText } from "@ionic/react";
import { copy } from "ionicons/icons";
import { ReactElement } from "react";

interface InviteProps {
  groupId: string;
  children?: React.ReactNode;
}
const GenerateInviteBtn = (props: InviteProps) => {
  const url =
    import.meta.env.VITE_CLIENT_PRODUCTION_URL || "http://localhost:5173";

  const { presentToast } = useToast();
  const { groupId, children } = props;
  const { user } = useSignInWallet();
  const handleGenerateInvite = async () => {
    presentToast(
      `You generated and copied a invite link! Send it to someone you like :)`,
      "primary",
      copy
    );
    const result = await InvitesService.getInviteByGroupIdAndUserId(
      groupId,
      user.id
    );
    handleCopyClick(`${url}/invite/${result[0].id}`);
  };
  const btn = children ? children : <IonText>Invite</IonText>;
  return { btn, onClick: { handleGenerateInvite } };
};

export default GenerateInviteBtn;
