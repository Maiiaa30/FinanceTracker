import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

import PasswordInput from "@/components/passwordsInputs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const signupSchema = z.object({
  firstName: z.string().trim().min(1, {
    message: "O nome e obrigatorio",
  }),
  lastName: z.string().trim().min(1, {
    message: "O sobrenome e obrigatorio",
  }),
  email: z.email({ message: "Email invalido" }),
  password: z.string().trim().min(6, {
    message: "A password deve ter pelo menos 6 caracteres",
  }),
  passwordConfirmation: z.string().trim().min(6, {
    message: "A confirmacao de password deve ter pelo menos 6 caracteres",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "Voce deve concordar com os termos de servico",
  }),
});

const SignupPage = () => {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },
  });

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-125">
            <CardHeader>
              <CardTitle>Criar conta</CardTitle>
              <CardDescription>Coloque os seus dados abaixo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primeiro Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Escreva seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Escreva seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Escreva seu email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={"Escreva a sua password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme a sua password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={"Confirme a sua password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="items-top flex space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="terms"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel
                        htmlFor="terms"
                        className="text-muted-foreground text-xs opacity-75"
                      >
                        Ao clicar em criar conta, voce concorda com{" "}
                        <a href="#" className="text-white underline">
                          Termos de Servico
                        </a>{" "}
                        e{" "}
                        <a href="#" className="text-white underline">
                          Politica de Privacidade
                        </a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Criar conta</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ja tem conta?</p>
        <Button variant="link" asChild>
          <Link to="/login">Faca login</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;
