import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  useCreateTransaction,
  useUpdateTransaction,
} from "@/api/hooks/transactions";

import {
  createTransactionFormSchema,
  updateTransactionFormSchema,
} from "../schemas/transaction";

export const useCreateTransactionForm = ({ onSuccess, onError }) => {
  const { mutateAsync: createTransaction } = useCreateTransaction();

  const form = useForm({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      name: "",
      amount: 0,
      date: new Date(),
      type: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data) => {
    try {
      await createTransaction(data);
      onSuccess();
    } catch (error) {
      console.error("Erro ao criar transacao:", error);
      onError();
    }
  };

  return { form, onSubmit };
};

export const useUpdateTransactionForm = ({
  transaction,
  onSuccess,
  onError,
}) => {
  const { mutateAsync: updateTransaction } = useUpdateTransaction();

  const form = useForm({
    resolver: zodResolver(updateTransactionFormSchema),
    defaultValues: {
      id: transaction?.id,
      name: transaction?.name,
      amount: parseFloat(transaction?.amount),
      date: transaction?.date ? new Date(transaction.date) : new Date(),
      type: transaction?.type,
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data) => {
    await updateTransaction(data);
    try {
      onSuccess();
    } catch (error) {
      console.error("Erro ao criar transacao:", error);
      onError();
    }
  };

  return { form, onSubmit };
};
