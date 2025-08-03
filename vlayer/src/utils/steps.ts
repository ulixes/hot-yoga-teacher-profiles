import {
  ConnectWalletStep,
  PrivyAuthStep,
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
  AUTHENTICATE,
  COMPLETE_PROFILE,
  INSTALL_EXTENSION,
  SUCCESS,
}
export const steps: Step[] = [
  {
    path: "",
    kind: STEP_KIND.WELCOME,
    component: WelcomeScreen,
    title: "Hot Yoga Teacher Platform",
    description:
      "Welcome! Join our verified hot yoga teacher community. We'll help you prove ownership of your Instagram account and create your professional profile.",
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
    path: "authenticate",
    kind: STEP_KIND.AUTHENTICATE,
    backUrl: "/verify-instagram",
    component: PrivyAuthStep,
    title: "Sign In",
    description:
      "Great! Now sign in to create your secure wallet and teacher profile.",
    index: 3,
  },
  {
    path: "create-profile",
    kind: STEP_KIND.COMPLETE_PROFILE,
    backUrl: "/authenticate",
    component: MintStep,
    title: "Complete Teacher Profile",
    description: `Complete your verified hot yoga teacher profile with your proven Instagram handle.`,
    index: 4,
  },
  {
    path: "success",
    kind: STEP_KIND.SUCCESS,
    component: SuccessStep,
    title: "Welcome to the Community!",
    description: "Your hot yoga teacher profile has been created and verified.",
    headerIcon: "/success-illustration.svg",
    index: 5,
  },
];
