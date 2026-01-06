import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import z from "zod";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/auth";
import { api } from "@/lib/axios";

const loginSchema = z.object({
  email: z.email({ message: "Email invalido" }),
  password: z.string().trim().min(6, {
    message: "A password deve ter pelo menos 6 caracteres",
  }),
});

const LoginPage = () => {
  const { user: userTest } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (variables) => {
      const response = await api.post("/users/login", {
        email: variables.email,
        password: variables.password,
      });
      return response.data;
    },
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const init = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!accessToken || !refreshToken) return;
      try {
        const response = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        console.error("Erro ao acessar o localStorage:", error);
      }
    };
    init();
  }, []);

  const handleSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        const accessToken = loggedUser.tokens.accessToken;
        const refreshToken = loggedUser.tokens.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setUser(loggedUser);
        toast.success("Login realizado com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao fazer login. Verifique suas credenciais.");
      },
    });
  };

  if (user) {
    return <h1>Ola, {user.email}</h1>;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <h1>Ola {userTest}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-125">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Entre na sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
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
            </CardContent>
            <CardFooter>
              <Button className="w-full cursor-pointer">Login</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Nao tem conta?</p>
        <Button variant="link" asChild>
          <Link to="/signup">Crie agora</Link>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
