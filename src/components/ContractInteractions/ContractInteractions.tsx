import { FC, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { getContract } from "../../lib/ethers/contract";
import { Transfer } from "../types";
import { formatEther } from "ethers";

interface ContractInteractionProps {
  deployContract: () => Promise<string>;
  transferToken: (destination: string, amount: number, tokenAddress: string) => Promise<boolean>;
}

const ContractInteraction: FC<ContractInteractionProps> = ({ deployContract, transferToken }) => {
  const [amount, setAmount] = useState<number>(0);
  const [destination, setDestination] = useState<string>("");
  const [deployedTokenAddress, setDeployedTokenAddress] = useLocalStorage("deployedToken", "");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setTransfers] = useLocalStorage<Array<Transfer>>("transfers", []);

  const contract = getContract(deployedTokenAddress);
  const eventName = "Transfer";

  contract.on(eventName, (from, to, value) => {
    const transferEvent = { from, to, value: formatEther(value) };
    setTransfers((prev) => [...prev, transferEvent]);
  });

  return (
    <div className="space-y-6">
      {deployedTokenAddress ? (
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-medium text-gray-700">Deployed Token Contract</h3>
          <div className="p-4 rounded-md border border-slate-300">{deployedTokenAddress}</div>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-medium text-gray-700">Deploy Contract</h3>
          <button
            onClick={async () => {
              const contractAddress = await deployContract();
              setDeployedTokenAddress(contractAddress);
            }}
            type="button"
            className="px-5 py-3 text-white bg-blue-500 rounded-md"
          >
            Deploy an ERC20 Token Contract
          </button>
        </>
      )}

      {deployedTokenAddress && (
        <div>
          <h3 className="mb-2 text-xl font-medium text-gray-700">Transfer Deployed Token</h3>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await transferToken(destination, amount, deployedTokenAddress);
              }}
              className="space-y-3"
            >
              <div>
                <label className="mb-1.5">Amount</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.currentTarget.valueAsNumber)}
                  type="number"
                  className="p-4 w-full rounded-md border border-slate-300"
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
                  className="p-4 w-full rounded-md border border-slate-300"
                  placeholder="Enter wallet address"
                />
              </div>
              <div className="flex justify-end">
                <button className="px-5 py-3 text-white bg-blue-500 rounded-md" type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export { ContractInteraction };
