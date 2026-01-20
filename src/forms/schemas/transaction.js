import z from "zod";

export const createTransactionFormSchema = z.object({
  name: z.string().trim().min(2, {
    message: "O nome deve ter no minimo 2 caracteres",
  }),
  amount: z.number().min(0.01, "O valor e obrigatorio"),
  date: z.date("A data e obrigatoria"),
  type: z.enum(["EARNING", "EXPENSE", "INVESTMENT"], "O tipo e obrigatorio"),
});

export const updateTransactionFormSchema = createTransactionFormSchema.extend({
  id: z.string().uuid(),
});
