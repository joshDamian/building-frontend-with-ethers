import { ComponentProps, FC } from "react";
import { Account } from "../Account";
import { ContractInteraction } from "../ContractInteractions";
import * as Tabs from "@radix-ui/react-tabs";
import { ContractEvents } from "../ContractEvents/ContractEvents";

type AccountProps = ComponentProps<typeof Account>;
type ContractInteractionProps = ComponentProps<typeof ContractInteraction>;

interface ExploreEthersProps {
  logout: AccountProps["logout"];
  getBalance: AccountProps["getBalance"];
  account: AccountProps["account"];
  transferEth: AccountProps["transferEth"];
  deployTokenContract: ContractInteractionProps["deployContract"];
  transferDeployedToken: ContractInteractionProps["transferToken"];
}

const ExploreEthers: FC<ExploreEthersProps> = ({
  account,
  transferEth,
  deployTokenContract,
  transferDeployedToken,
  logout,
  getBalance,
}) => {
  return (
    <Tabs.Root defaultValue="tab1" className="flex flex-col w-[560px] shadow-[0_2px_10px] rounded-md shadow-black/50">
      <Tabs.List className="flex border-b border-gray-600 shrink-0" aria-label="Interact with Ethers.js">
        <Tabs.Trigger
          className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-gray-700 select-none first:rounded-tl-md last:rounded-tr-md hover:text-purple-700 data-[state=active]:text-purple-700 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="tab1"
        >
          Account
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-gray-700 select-none first:rounded-tl-md last:rounded-tr-md hover:text-purple-700 data-[state=active]:text-purple-700 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="tab2"
        >
          Contract Interactions
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-gray-700 select-none first:rounded-tl-md last:rounded-tr-md hover:text-purple-700 data-[state=active]:text-purple-700 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="tab3"
        >
          Events
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="tab1"
      >
        <Account account={account} logout={logout} getBalance={getBalance} transferEth={transferEth} />
      </Tabs.Content>
      <Tabs.Content
        className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="tab2"
      >
        <ContractInteraction deployContract={deployTokenContract} transferToken={transferDeployedToken} />
      </Tabs.Content>
      <Tabs.Content
        className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="tab3"
      >
        <ContractEvents />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export { ExploreEthers };
