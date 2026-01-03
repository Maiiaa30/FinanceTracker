import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
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
import { api } from "@/lib/axios";

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
  const [user, setUser] = useState(null);

  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (variables) => {
      const response = await api.post("/users", {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      });
      return response.data;
    },
  });

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
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        const accessToken = createdUser.tokens.access_token;
        const refreshToken = createdUser.tokens.refresh_token;
        setUser(createdUser);
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        toast.success("Conta criada com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao criar a conta. Tente novamente.");
      },
    });
  };

  if (user) {
    return <h1>Ola, {user.first_name}</h1>;
  }
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
