import proverSpec from "../out/WebProofProver.sol/WebProofProver";
import registrySpec from "../out/ProfileRegistry.sol/ProfileRegistry";
import {
  deployVlayerContracts,
  writeEnvVariables,
  getConfig,
} from "@vlayer/sdk/config";

const config = getConfig();

const { prover, verifier } = await deployVlayerContracts({
  proverSpec,
  verifierSpec: registrySpec,
});

await writeEnvVariables(".env", {
  VITE_PROVER_ADDRESS: prover,
  VITE_REGISTRY_ADDRESS: verifier,
  VITE_CHAIN_NAME: config.chainName,
  VITE_PROVER_URL: config.proverUrl,
  VITE_JSON_RPC_URL: config.jsonRpcUrl,
  VITE_CLIENT_AUTH_MODE: config.clientAuthMode,
  VITE_VLAYER_API_TOKEN: config.token,
  VITE_NOTARY_URL: config.notaryUrl,
  VITE_WS_PROXY_URL: config.wsProxyUrl,
  VITE_GAS_LIMIT: config.gasLimit,
  VITE_PRIVY_APP_ID: process.env.PRIVY_APP_ID || "",
});
