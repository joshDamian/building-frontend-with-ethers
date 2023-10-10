import { FC } from "react";

interface ConnectWalletProps {
  connectWallet: () => Promise<void>;
}

const ConnectWallet: FC<ConnectWalletProps> = ({ connectWallet }) => {
  return (
    <div>
      <button onClick={connectWallet} className="px-5 py-3 bg-blue-500 rounded-md">
        Connect Wallet
      </button>
    </div>
  );
};

export { ConnectWallet };
