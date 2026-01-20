import queryString from "query-string";

import { protectedApi } from "@/lib/axios";

export const TransactionService = {
  create: async (input) => {
    const response = await protectedApi.post("/transactions/me", input);
    return response.data;
  },
  getAll: async (input) => {
    const queryParams = queryString.stringify({
      from: input.from,
      to: input.to,
    });
    const response = await protectedApi.get(`/transactions/me?${queryParams}`);
    return response.data;
  },
  update: async (input) => {
    const response = await protectedApi.patch(`/transactions/me/${input.id}`, {
      name: input.name,
      amount: input.amount,
      date: input.date,
      type: input.type,
    });
    return response.data;
  },
};
