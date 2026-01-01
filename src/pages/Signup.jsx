import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <Input type="password" placeholder="Escreva sua palavra passe" />
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
