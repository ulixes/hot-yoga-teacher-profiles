import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useInstagramAccountProof } from "../../../hooks/useInstagramAccountProof";
import { ProveStepPresentational } from "./Presentational";

export const ProveStep = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const {
    requestWebProof,
    webProof,
    callProver,
    isPending,
    isCallProverIdle,
    result,
    error,
  } = useInstagramAccountProof();

  useEffect(() => {
    console.log("ProveStep state:", { webProof: !!webProof, isCallProverIdle, isPending, error });
    if (webProof && isCallProverIdle) {
      console.log("Instagram webProof received in ProveStep, navigating to wallet connection");
      // Store webProof for later use when wallet is connected
      localStorage.setItem("instagram_webproof", JSON.stringify(webProof));
      // Navigate to wallet connection after successful proof
      void navigate("/connect-wallet");
    }
  }, [webProof, isCallProverIdle, navigate, isPending, error]);

  useEffect(() => {
    if (result) {
      void navigate("/connect-wallet");
    }
  }, [result, navigate]);

  useEffect(() => {
    modalRef.current?.showModal();
  }, []);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return (
    <ProveStepPresentational
      requestWebProof={requestWebProof}
      isPending={isPending}
      disabled={disabled}
      setDisabled={setDisabled}
    />
  );
};
