import { useLocalStorage } from "usehooks-ts";
import { Transfer } from "../types";

const ContractEvents = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [transfers, _] = useLocalStorage<Array<Transfer>>("transfers", []);

  return (
    <section className="flex flex-col gap-5">
      {transfers.map((tran, i) => (
        <div key={i} className="flex flex-col gap-5 p-5 bg-gray-200 rounded-md">
          <h3>Sender: {tran.from}</h3>
          <h3>Receiver: {tran.to}</h3>
          <h3>Amount: {tran.value}</h3>
        </div>
      ))}
    </section>
  );
};

export { ContractEvents };
