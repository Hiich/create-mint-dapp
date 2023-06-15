import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./Button";

export const ConnectWallet = () => {
  return (
    <ConnectButton.Custom>
      {({ openConnectModal }) => {
        return (
          <Button onClick={openConnectModal} title="Connect" signSize="large" />
        );
      }}
    </ConnectButton.Custom>
  );
};
