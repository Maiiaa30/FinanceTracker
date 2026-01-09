import { Navigate } from "react-router";

import Header from "@/components/Header";
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
      <div className="flex items-center justify-between">
        <h2>Dashboard</h2>
        <div></div>
      </div>
    </>
  );
};

export default Home;
