import {
  ConnectWalletStep,
  MintStep,
  ProveStep,
  SuccessStep,
  WelcomeScreen,
  HandleInputStep,
  InstallExtension,
} from "../components";

export type Step = {
  kind: STEP_KIND;
  path: string;
  backUrl?: string;
  component: React.ComponentType;
  title: string;
  description: string;
  headerIcon?: string;
  index: number;
};

export enum STEP_KIND {
  WELCOME,
  HANDLE_INPUT,
  VERIFY_INSTAGRAM,
  CONNECT_WALLET,
  MINT,
  INSTALL_EXTENSION,
  SUCCESS,
}
export const steps: Step[] = [
  {
    path: "",
    kind: STEP_KIND.WELCOME,
    component: WelcomeScreen,
    title: "Hot Yoga Teacher Verification",
    description:
      "Welcome! Create your verified hot yoga teacher profile. We'll help you prove ownership of your Instagram account and create your professional profile.",
    headerIcon: "/nft-illustration.svg",
    index: 0,
  },
  {
    path: "enter-handle",
    kind: STEP_KIND.HANDLE_INPUT,
    backUrl: "",
    component: HandleInputStep,
    title: "Enter Instagram Handle",
    description:
      "Enter your Instagram handle (e.g., @coolhandle). You'll prove ownership in the next step.",
    index: 1,
  },
  {
    path: "verify-instagram",
    kind: STEP_KIND.VERIFY_INSTAGRAM,
    backUrl: "/enter-handle",
    component: ProveStep,
    title: "Verify Instagram Ownership",
    description:
      "Open vlayer browser extension and log into your Instagram account to prove ownership of your handle.",
    index: 2,
  },
  {
    path: "install-extension",
    kind: STEP_KIND.INSTALL_EXTENSION,
    component: InstallExtension,
    backUrl: "/enter-handle",
    title: "Install Extension",
    description: `Install vlayer browser extension to verify your Instagram account.`,
    index: 2,
  },
  {
    path: "connect-wallet",
    kind: STEP_KIND.CONNECT_WALLET,
    backUrl: "/verify-instagram",
    component: ConnectWalletStep,
    title: "Connect Wallet",
    description:
      "Great! Now connect your wallet to create your teacher profile NFT.",
    index: 3,
  },
  {
    path: "create-profile",
    kind: STEP_KIND.MINT,
    backUrl: "/connect-wallet",
    component: MintStep,
    title: "Create Teacher Profile",
    description: `Create your verified hot yoga teacher profile NFT with your proven Instagram handle.`,
    index: 4,
  },
  {
    path: "success",
    kind: STEP_KIND.SUCCESS,
    component: SuccessStep,
    title: "Profile Created!",
    description: "",
    headerIcon: "/success-illustration.svg",
    index: 5,
  },
];
