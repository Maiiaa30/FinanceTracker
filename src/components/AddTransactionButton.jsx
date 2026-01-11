import { zodResolver } from "@hookform/resolvers/zod";
import { PiggyBankIcon, PlusIcon, TrendingUpIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import z from "zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { DatePicker } from "./ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: "O nome deve ter no minimo 2 caracteres",
  }),
  amount: z.number().min(0.01, "O valor e obrigatorio"),
  date: z.date("A data e obrigatoria"),
  type: z.enum(["EARNING", "EXPENSE", "INVESTMENT"], "O tipo e obrigatorio"),
});

const AddTransactionButton = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      date: new Date(),
      type: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon />
            Nova Transacao
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Transacao</DialogTitle>
            <DialogDescription>
              Insira as informacoes da sua nova transacao aqui.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da transacao" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <NumericFormat
                        placeholder="Valor da transacao"
                        thousandSeparator="."
                        decimalSeparator=","
                        suffix=" €"
                        allowNegative={false}
                        customInput={Input}
                        {...field}
                        onChange={() => {}}
                        onValueChange={(values) => {
                          field.onChange(values.floatValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-4">
                        <Button
                          variant={
                            field.value === "EARNING" ? "secondary" : "outline"
                          }
                          onClick={() => field.onChange("EARNING")}
                          value="EARNING"
                          type="button"
                          size="lg"
                        >
                          <TrendingUpIcon className="text-green-500" />
                          Ganho
                        </Button>
                        <Button
                          variant={
                            field.value === "EXPENSE" ? "secondary" : "outline"
                          }
                          onClick={() => field.onChange("EXPENSE")}
                          value="EXPENSE"
                          type="button"
                          size="lg"
                        >
                          <TrendingUpIcon className="text-red-500" />
                          Gasto
                        </Button>
                        <Button
                          variant={
                            field.value === "INVESTMENT"
                              ? "secondary"
                              : "outline"
                          }
                          onClick={() => field.onChange("INVESTMENT")}
                          value="INVESTMENT"
                          type="button"
                          size="lg"
                        >
                          <PiggyBankIcon className="text-blue-500" />
                          Investimento
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="reset" variant="secondary" className="w-full">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full">
                  Adicionar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTransactionButton;
