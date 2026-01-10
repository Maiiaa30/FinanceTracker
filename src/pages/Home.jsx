import { PlusIcon } from "lucide-react";
import { Navigate } from "react-router";

import Balance from "@/components/Balance";
import DateSelection from "@/components/DateSelection";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth";

const Home = () => {
  const { user, isInitializing } = useAuthContext();

  if (isInitializing) return null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DateSelection />
            <Button>
              <PlusIcon />
              Nova Transacao
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-[2fr_1fr]">
          <Balance />
        </div>
      </div>
    </>
  );
};

export default Home;
