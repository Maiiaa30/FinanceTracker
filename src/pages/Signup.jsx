import { Link } from "react-router";

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
import { Input } from "@/components/ui/input";

const SignupPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-125">
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>Coloque os seus dados abaixo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Escreva seu nome" />
          <Input placeholder="Escreva seu sobrenome" />
          <Input type="email" placeholder="Escreva seu email" />
          <PasswordInput placeholder={"Escreva a sua password"} />
          <PasswordInput placeholder={"Confirme a sua password"} />
          <div className="items-top flex space-x-2">
            <Checkbox id="terms" />
            <div className="grid gap-1.5 leading-none">
              <label
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
                .
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar conta</Button>
        </CardFooter>
      </Card>
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
