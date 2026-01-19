import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuthContext } from "@/contexts/auth";

import { TransactionService } from "../services/transaction";
import { getUserBalanceQueryKey } from "./users";

export const createTransactionMutationKey = ["createTransaction"];

export const useCreateTransaction = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: (data) => TransactionService.create(data),
    onSuccess: () => {
      toast.success("Transacao criada com sucesso!");
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
      });
    },
    onError: () => {
      toast.error("Erro ao criar transacao. Tente novamente.");
    },
  });
};

export const getTransactionsQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ["getTransactions", userId];
  }
  return ["getTransactions", userId, from, to];
};

export const useGetTransactions = ({ from, to }) => {
  const { user } = useAuthContext();
  return useQuery({
    queryKey: getTransactionsQueryKey({ userId: user.id, from, to }),
    queryFn: () => TransactionService.getAll({ from, to }),
  });
};
