import { useState } from "react";
import { Account } from "./components/Account";
import { ConnectWallet } from "./components/ConnectWallet";
import { Signer, ethers } from "ethers";

function App() {
  const [account, setAccount] = useState<string>();
  const [provider, setProvider] = useState<ethers.BrowserProvider>();
  const [signer, setSigner] = useState<Signer>();

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Install a crypto wallet");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const provider = new ethers.BrowserProvider(window.ethereum as any);
    const signer = await provider.getSigner();

    setProvider(provider);
    setAccount(signer.address);
    setSigner(signer);
  };

  const logout = () => {
    setSigner(undefined);
    setAccount(undefined);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-xl rounded-md shadow-sm bg-slate-200 mx-auto">
        {account && signer && provider ? (
          <Account provider={provider} signer={signer} account={account} logout={logout} />
        ) : null}
        {!account ? <ConnectWallet connectWallet={connectWallet} /> : null}
      </div>
    </div>
  );
}

export default App;
