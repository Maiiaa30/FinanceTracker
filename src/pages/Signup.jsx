import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
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
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
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
          <div className="relative">
            <Input
              type={passwordIsVisible ? "text" : "password"}
              placeholder="Escreva sua palavra passe"
            />
            <Button
              className="text-muted-foreground absolute top-0 right-0 bottom-0 my-auto mr-1 h-8 w-8"
              variant="ghost"
              onClick={() => setPasswordIsVisible((prev) => !prev)}
            >
              {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
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
