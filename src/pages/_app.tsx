import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useEffect, useState } from "react";

const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [
    alchemyProvider({ apiKey: "avlryM1nsSpO_VL9RX64Tpiadd0Qmsac" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Squirrels NFT",
  projectId: "48de3ac2c5979f55e5faf761cc190f64",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      ) : null}
    </>
  );
};

export default api.withTRPC(MyApp);
