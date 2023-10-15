import { CONTRACT_ABI } from "../abi";
import { BaseContract } from "ethers";

let contract: BaseContract | undefined;

const DEFAULT_CONTRACT_ADDRESS = "0xED1266D037a13Fe14e81c0a593672275e61A81F0"; // on Polygon

const getContract = (at?: string) => {
  if (contract) return contract;
  contract = new BaseContract(at ?? DEFAULT_CONTRACT_ADDRESS, CONTRACT_ABI);
  return contract;
};

export { getContract };
