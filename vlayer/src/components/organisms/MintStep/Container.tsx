import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useBalance,
} from "wagmi";

import { useLocalStorage } from "usehooks-ts";
import { useInstagramAccountProof } from "../../../hooks/useInstagramAccountProof";

import webProofProofVerifier from "../../../../../out/WebProofVerifier.sol/WebProofVerifier";
import { MintStepPresentational } from "./Presentational";
import { ensureBalance } from "../../../utils/ethFaucet";
import { AlreadyMintedError } from "../../../errors";

export const MintStep = () => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [mintedHandle, setMintedHandle] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  // Using mintingError state to throw error in useEffect because ErrorBoundary does not catch errors from async functions like handleMint
  const [mintingError, setMintingError] = useState<Error | null>(null);
  const [proverResult] = useLocalStorage("instagramProverResult", "");
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { writeContract, data: txHash, error } = useWriteContract();
  const { status } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const {
    callProver,
    isPending: isProverPending,
    result: proverResultFromHook,
    error: proverError,
  } = useInstagramAccountProof();

  // Check for stored webProof and call prover when wallet is connected
  useEffect(() => {
    const storedWebProof = localStorage.getItem("instagram_webproof");
    if (storedWebProof && address && !proverResult && !isGeneratingProof) {
      setIsGeneratingProof(true);
      const webProof = JSON.parse(storedWebProof);
      void callProver([webProof, address]);
    }
  }, [address, proverResult, callProver, isGeneratingProof]);

  // Handle prover result
  useEffect(() => {
    if (proverResultFromHook) {
      setIsGeneratingProof(false);
      // Clean up stored webProof since we now have the prover result
      localStorage.removeItem("instagram_webproof");
    }
  }, [proverResultFromHook]);

  // Handle prover error
  useEffect(() => {
    if (proverError) {
      setIsGeneratingProof(false);
      setMintingError(proverError);
    }
  }, [proverError]);

  useEffect(() => {
    if (proverResult) {
      const result = JSON.parse(proverResult) as Parameters<
        typeof writeContract
      >[0]["args"];
      if (!result || !Array.isArray(result) || typeof result[1] !== "string") {
        throw new Error(
          "Serialized prover result from local storage is invalid",
        );
      }
      setMintedHandle(result[1]);
    }
    modalRef.current?.showModal();
  }, [proverResult]);

  const handleMint = async () => {
    setIsMinting(true);
    if (!proverResult) {
      return;
    }

    const proofData = JSON.parse(proverResult) as Parameters<
      typeof writeContract
    >[0]["args"];
    console.log("proofData", proofData);
    const writeContractArgs: Parameters<typeof writeContract>[0] = {
      address: import.meta.env.VITE_VERIFIER_ADDRESS as `0x${string}`,
      abi: webProofProofVerifier.abi,
      functionName: "verify",
      args: proofData,
    };

    try {
      await ensureBalance(address as `0x${string}`, balance?.value ?? 0n);
    } catch (error) {
      setMintingError(error as Error);
    }

    writeContract(writeContractArgs);
  };

  useEffect(() => {
    if (status === "success") {
      setIsMinting(false);
      void navigate(`/success?tx=${txHash}&handle=${mintedHandle}`);
    }
  }, [status, txHash, mintedHandle, navigate]);

  useEffect(() => {
    if (error) {
      setIsMinting(false);
      if (error.message.includes("Instagram handle already verified") || error.message.includes("Address already has a teacher profile")) {
        throw new AlreadyMintedError();
      } else if (error.message.includes("User rejected the request")) {
        console.log("User rejected the tx in the wallet");
      } else {
        throw new Error(error.message);
      }
    }
  }, [error]);

  useEffect(() => {
    if (mintingError) {
      setIsMinting(false);
      throw mintingError;
    }
  }, [mintingError]);

  return (
    <MintStepPresentational
      handleMint={() => void handleMint()}
      isMinting={isMinting}
      isGeneratingProof={isGeneratingProof || isProverPending}
      hasProof={!!proverResult}
    />
  );
};
