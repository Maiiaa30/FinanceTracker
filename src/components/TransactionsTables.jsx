import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { ExternalLinkIcon } from "lucide-react";
import { useSearchParams } from "react-router";

import { useGetTransactions } from "@/api/hooks/transactions";

import EditTransactionButton from "./EditTransactionButton";
import TransactionTypeBadge from "./TrabsactionTypeBadge";
import { Button } from "./ui/button";
import { DataTable } from "./ui/data-table";
import { ScrollArea } from "./ui/scroll-area";

const columns = [
  {
    accessorKey: "name",
    header: "Titulo",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type.toLowerCase()} />;
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) => {
      return format(new Date(transaction.date), "dd 'de' MMMM 'de' yyyy", {
        locale: pt,
      });
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) => {
      return new Intl.NumberFormat("pt-pt", {
        style: "currency",
        currency: "EUR",
      }).format(transaction.amount);
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => {
      return <EditTransactionButton transaction={transaction} />;
    },
  },
];

const TransactionsTable = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const { data: transactions } = useGetTransactions({ from, to });
  return (
    <>
      <h2 className="text-2xl font-bold">Transações</h2>
      <ScrollArea className="h-115 max-h-115 rounded-md border">
        <DataTable columns={columns} data={transactions || []} />
      </ScrollArea>
    </>
  );
};

export default TransactionsTable;
