import { Provider, ethers, parseEther } from "ethers";
import { Signer } from "ethers";
import { FC, useEffect, useState } from "react";

interface AccountProps {
  account: string;
  provider: Provider;
  signer: Signer;
  logout: () => void;
}

const Account: FC<AccountProps> = ({ account, logout, provider, signer }) => {
  const [balance, setBalance] = useState<string>();
  const [amount, setAmount] = useState<number>(0);
  const [destination, setDestination] = useState<string>("");

  useEffect(() => {
    async function getBalance() {
      const balance = await provider.getBalance(account);
      const formattedBalance = ethers.formatEther(balance);
      setBalance(parseFloat(formattedBalance).toFixed(3));
    }

    getBalance();
  }, [account, provider]);

  const transferEth = async (amount: number, destinationWallet: string) => {
    const tx = await signer.sendTransaction({
      to: destinationWallet,
      value: parseEther(`${amount}`), // parseEther converts amount to a bigint => amount * 10**18
    });

    const receipt = await tx.wait();

    if (!receipt) {
      alert("Transaction failed");
      return;
    }

    alert(receipt.hash);
  };

  return (
    <section className="space-y-4 p-5">
      <div>
        <h3 className="text-2xl font-medium mb-2">Account</h3>
        <p className="flex items-center space-x-3">
          <span>{account}</span>
          <button type="button" onClick={logout} className="bg-blue-500 text-white py-3 px-5 rounded-md">
            logout
          </button>
        </p>
      </div>
      <div>
        <h3 className="text-2xl mb-2">Balance</h3>
        <p>{balance ? `${balance} ETH` : "Loading balance..."}</p>
      </div>
      <div>
        <h3 className="text-2xl mb-2">Transfer Eth</h3>
        <div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await transferEth(amount, destination);
            }}
            className="space-y-3"
          >
            <div>
              <label className="mb-1.5">Amount</label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.currentTarget.valueAsNumber)}
                type="number"
                className="w-full border border-slate-300 rounded-md p-4"
                step="0.0001"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="mb-1.5">Destination Wallet</label>
              <input
                value={destination}
                onChange={(e) => setDestination(e.currentTarget.value)}
                type="text"
                className="w-full border border-slate-300 rounded-md p-4"
                placeholder="Enter wallet address"
              />
            </div>
            <div className="flex justify-end">
              <button className="py-3 rounded-md px-5 text-white bg-blue-500" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export { Account };
