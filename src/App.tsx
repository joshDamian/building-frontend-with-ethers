import { useState } from "react";
import { Account } from "./components/Account";
import { ConnectWallet } from "./components/ConnectWallet";

function App() {
  const [account, setAccount] = useState<string>();

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-xl rounded-md shadow-sm bg-slate-200">
        {account ? <Account account={account} logout={() => console.log("logout")} /> : null}
        {!account ? (
          <ConnectWallet
            connectWallet={async () => {
              setAccount("");
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
