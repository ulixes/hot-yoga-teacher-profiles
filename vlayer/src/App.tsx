import { steps } from "./utils/steps";
import { ProofProvider } from "@vlayer/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components/layout/Layout";
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider, createConfig } from '@privy-io/wagmi';
import { Chain, http } from "viem";
import { ErrorBoundary } from "react-error-boundary";
import { AppErrorBoundaryComponent } from "./components/layout/ErrorBoundary";
import { getChainSpecs } from "@vlayer/sdk";

const queryClient = new QueryClient();

let chain = null;

try {
  chain = getChainSpecs(import.meta.env.VITE_CHAIN_NAME);
} catch {
  // In case of wrong chain name in env, we set chain variable to whatever.
  // Thanks to this, the app does not crash here, but later with a proper error handling.
  console.error("Wrong chain name in env: ", import.meta.env.VITE_CHAIN_NAME);
  chain = {
    id: "wrongChain",
    name: "Wrong chain",
    nativeCurrency: {},
    rpcUrls: { default: { http: [] } },
  } as unknown as Chain;
}

const chains: [Chain, ...Chain[]] = [chain];

const wagmiConfig = createConfig({
  chains,
  transports: {
    [chain.id]: http(),
  },
});

const App = () => {
  return (
    <div id="app">
      <PrivyProvider
        appId={import.meta.env.VITE_PRIVY_APP_ID || "your-privy-app-id"}
        config={{
          loginMethods: ['email', 'google', 'discord'],
          appearance: {
            theme: 'light',
            accentColor: '#F97316',
            logo: '/favicon.png',
          },
          embeddedWallets: {
            createOnLogin: 'users-without-wallets',
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <ProofProvider
              config={{
                proverUrl: import.meta.env.VITE_PROVER_URL,
                wsProxyUrl: import.meta.env.VITE_WS_PROXY_URL,
                notaryUrl: import.meta.env.VITE_NOTARY_URL,
                token: import.meta.env.VITE_VLAYER_API_TOKEN,
              }}
            >
              <BrowserRouter>
                <ErrorBoundary FallbackComponent={AppErrorBoundaryComponent}>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      {steps.map((step) => (
                        <Route
                          key={step.path}
                          path={step.path}
                          element={<step.component />}
                        />
                      ))}
                    </Route>
                  </Routes>
                </ErrorBoundary>
              </BrowserRouter>
            </ProofProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </PrivyProvider>
    </div>
  );
};

export default App;
