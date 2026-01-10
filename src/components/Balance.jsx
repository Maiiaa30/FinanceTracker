import { useQuery } from "@tanstack/react-query";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { useSearchParams } from "react-router";

import { useAuthContext } from "@/contexts/auth";
import { UserService } from "@/services/user";

import BalanceItem from "./BalanceItem";

const Balance = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuthContext();
  const { data } = useQuery({
    queryKey: ["balance", user.id],
    queryFn: () => {
      const from = searchParams.get("from");
      const to = searchParams.get("to");
      return UserService.getBalance({ from, to });
    },
  });
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        label={"Saldo"}
        amount={data?.balance}
        icon={<WalletIcon />}
        size={16}
      />
      <BalanceItem
        label={"Ganhos"}
        amount={data?.earnings}
        icon={<TrendingUpIcon className="text-primary" size={16} />}
      />
      <BalanceItem
        label={"Gastos"}
        amount={data?.expenses}
        icon={<TrendingDownIcon className="text-red-500" size={16} />}
      />
      <BalanceItem
        label={"Investimentos"}
        amount={data?.investments}
        icon={<PiggyBankIcon className="text-blue-500" size={16} />}
      />
    </div>
  );
};

export default Balance;
