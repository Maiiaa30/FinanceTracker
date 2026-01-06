import { Navigate } from "react-router";

import { useAuthContext } from "@/contexts/auth";

const Home = () => {
  const { user, isInitializing } = useAuthContext();

  if (isInitializing) return null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <h1>Home</h1>;
};

export default Home;
