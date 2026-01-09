import { Navigate } from "react-router";

import Header from "@/components/Header";
import { useAuthContext } from "@/contexts/auth";

const Home = () => {
  const { user, isInitializing, signOut } = useAuthContext();

  if (isInitializing) return null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
    </>
  );
};

export default Home;
