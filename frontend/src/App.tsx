import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Invite from "./pages/Invite";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import React from "react";
/* Theme variables */
import "./theme/variables.css";
import "./theme/main.css";
import SideBarMenu from "./components/SideBarMenu";
import TabsMenu from "./components/TabsMenu";
import Discover from "./pages/Discover";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { baseGoerli } from "wagmi/chains";
import ProtectedRoute from "./components/ProtectedRoute";
import Challenge from "./pages/Mint/Challenge";
import Rewards from "./pages/Rewards";
import { useSignInWallet } from "./hooks/useSignInWallet";
import { isPlatform } from "@ionic/react";
import OnboardingModal from "./components/OnboardingModal";
import Mint from "./pages/Mint/Mint";
import Challenges from "./pages/Mint/Challenges";

import Group from "./pages/Mint/Group";

setupIonicReact({
  mode: "ios",
  platform: {
    /** The default `desktop` function returns false for devices with a touchscreen.
     * This is not always wanted, so this function tests the User Agent instead.
     **/
    desktop: (win) => {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          win.navigator.userAgent
        );
      return !isMobile;
    },
  },
});

// 1. Get projectId
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

// 2. Create wagmiConfig
const metadata = {
  name: "Group Mints",
  description: "Liquality Group Mints",
  url: "https://liquality.io",
  icons: [
    "https://uploads-ssl.webflow.com/63e610c62d73bd54e8ee8455/63e610c62d73bd46ffee8583_Liquality_logo.svg",
  ],
};

const chains = [baseGoerli];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });
const App: React.FC = () => {
  const routerOutlet = (
    <IonRouterOutlet id="main-content">
      {/* Routes not requiring authentication */}
      <Route path="/login" render={() => <Login />} exact />
      <Route path="/invite/:inviteLink" render={() => <Invite />} />
      <Route path="/discover" render={() => <Discover />} exact />
      <Route path="/rewards" render={() => <Rewards />} exact />

      <Route path="/mint" component={Mint} />
      <Route path="/mint/:groupId" component={Group} />
      <Route path="/challenges" render={() => <Challenges />} exact />
      <Route path="/challenge/:id" render={() => <Challenge />} exact />

      {/* Default route (not requiring authentication) */}
      <Route exact path="/">
        <Redirect to="/discover" />
      </Route>

      {/* Protected routes, needs auth */}
      <ProtectedRoute>
        <Route path="/settings" render={() => <Settings />} exact />
      </ProtectedRoute>
    </IonRouterOutlet>
  );

  const AppContent = () => {
    if (isPlatform("desktop")) {
      return (
        <IonSplitPane when="md" contentId="main-content">
          <IonReactRouter>
            <SideBarMenu />
            {routerOutlet}
          </IonReactRouter>
        </IonSplitPane>
      );
    }
    return (
      <IonReactRouter>
        <TabsMenu>{routerOutlet}</TabsMenu>
      </IonReactRouter>
    );
  };
  const Main = () => {
    /*     useSignInWallet();
     */ return (
      <IonApp>
        <AppContent />
        <OnboardingModal />
      </IonApp>
    );
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <Main />
    </WagmiConfig>
  );
};

export default App;
