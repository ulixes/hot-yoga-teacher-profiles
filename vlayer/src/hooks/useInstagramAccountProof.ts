import { useEffect, useState } from "react";
import {
  useCallProver,
  useWaitForProvingResult,
  useWebProof,
  useChain,
} from "@vlayer/react";
import { useLocalStorage } from "usehooks-ts";
import { WebProofConfig, ProveArgs } from "@vlayer/sdk";
import { Abi, ContractFunctionName } from "viem";
import { startPage, expectUrl, notarize } from "@vlayer/sdk/web_proof";
import { UseChainError, WebProofError } from "../errors";
import webProofProver from "../../../out/WebProofProver.sol/WebProofProver";

export const useInstagramAccountProof = () => {
  const [error, setError] = useState<Error | null>(null);
  const [instagramHandle] = useLocalStorage("instagramHandle", "");

  // Create dynamic web proof config based on the Instagram handle
  const webProofConfig: WebProofConfig<Abi, string> = {
    proverCallCommitment: {
      address: "0x0000000000000000000000000000000000000000",
      proverAbi: [],
      functionName: "proveInstagram",
      commitmentArgs: [],
      chainId: 1,
    },
    steps: [
      startPage("https://www.instagram.com/", "Go to Instagram login page"),
      expectUrl("https://www.instagram.com/", "Log in to Instagram"),
      expectUrl(`https://www.instagram.com/${instagramHandle.replace('@', '')}/`, `Navigate to your Instagram profile page (@${instagramHandle.replace('@', '')})`),
      notarize(
        `https://www.instagram.com/api/v1/users/web_profile_info/?username=${instagramHandle.replace('@', '')}`,
        "GET",
        "Generate Proof of Instagram profile",
        [
          {
            request: {
              // Redact all request headers for privacy
              headers_except: [],
            },
          },
          {
            response: {
              // Keep necessary response headers
              headers_except: ["Content-Type", "Transfer-Encoding"],
            },
          },
        ],
      ),
    ],
  };

  const {
    requestWebProof,
    webProof,
    isPending: isWebProofPending,
    error: webProofError,
  } = useWebProof(webProofConfig);

  if (webProofError) {
    throw new WebProofError(webProofError.message);
  }

  const { chain, error: chainError } = useChain(
    import.meta.env.VITE_CHAIN_NAME,
  );
  useEffect(() => {
    if (chainError) {
      setError(new UseChainError(chainError));
    }
  }, [chainError]);

  const vlayerProverConfig: Omit<
    ProveArgs<Abi, ContractFunctionName<Abi>>,
    "args"
  > = {
    address: import.meta.env.VITE_PROVER_ADDRESS as `0x${string}`,
    proverAbi: webProofProver.abi,
    chainId: chain?.id,
    functionName: "main",
    gasLimit: Number(import.meta.env.VITE_GAS_LIMIT),
  };

  const {
    callProver,
    isPending: isCallProverPending,
    isIdle: isCallProverIdle,
    data: hash,
    error: callProverError,
  } = useCallProver(vlayerProverConfig);

  if (callProverError) {
    throw callProverError;
  }

  const {
    isPending: isWaitingForProvingResult,
    data: result,
    error: waitForProvingResultError,
  } = useWaitForProvingResult(hash);

  if (waitForProvingResultError) {
    throw waitForProvingResultError;
  }

  const [, setWebProof] = useLocalStorage("instagramWebProof", "");
  const [, setProverResult] = useLocalStorage("instagramProverResult", "");

  useEffect(() => {
    if (webProof) {
      console.log("Instagram webProof", webProof);
      setWebProof(JSON.stringify(webProof));
    }
  }, [JSON.stringify(webProof)]);

  useEffect(() => {
    if (result) {
      console.log("Instagram proverResult", result);
      setProverResult(JSON.stringify(result));
    }
  }, [JSON.stringify(result)]);

  return {
    requestWebProof,
    webProof,
    isPending:
      isWebProofPending || isCallProverPending || isWaitingForProvingResult,
    isCallProverIdle,
    isWaitingForProvingResult,
    isWebProofPending,
    callProver,
    result,
    error,
  };
};