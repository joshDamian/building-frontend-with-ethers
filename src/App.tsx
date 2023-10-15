import { useState } from "react";
import { ConnectWallet } from "./components/ConnectWallet";
import { ExploreEthers } from "./components/ExploreEthers";

// utils for interacting with ethers
import { connectWallet } from "./lib/ethers/connectWallet";
import { getBalance } from "./lib/ethers/getBalance";
import { transferEth } from "./lib/ethers/transferEth";
import { deployContract } from "./lib/ethers/deployContract";
import { transferToken } from "./lib/ethers/transferToken";

function App() {
  const [account, setAccount] = useState<string>();

  const connect = async () => {
    try {
      const account = await connectWallet();
      setAccount(account);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      alert("Something went wrong");
    }
  };

  const logout = () => {
    setAccount(undefined);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        {account ? (
          <ExploreEthers
            account={account}
            logout={logout}
            transferDeployedToken={transferToken}
            deployTokenContract={deployContract}
            transferEth={transferEth}
            getBalance={getBalance}
          />
        ) : null}
        {!account ? <ConnectWallet connectWallet={connect} /> : null}
      </div>
    </div>
  );
}

export default App;
