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
    if (webProof && isCallProverIdle) {
      // Store webProof for later use when wallet is connected
      localStorage.setItem("instagram_webproof", JSON.stringify(webProof));
      // Navigate to wallet connection after successful proof
      void navigate("/connect-wallet");
    }
  }, [webProof, isCallProverIdle, navigate]);

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
