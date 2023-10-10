import { FC } from "react";

interface AccountProps {
  account: string;
  logout: () => void;
}

const Account: FC<AccountProps> = ({ account, logout }) => {
  return (
    <section className="space-y-4">
      <div>
        <h3>Account</h3>
        <p className="flex items-center space-x-3">
          {account}
          <button type="button" onClick={logout} className="bg-blue-500 text-white py-3 px-5 rounded-md">
            logout
          </button>
        </p>
      </div>
    </section>
  );
};

export { Account };
