import React, { useContext } from "react";
import { UserProvider, UserContext } from "./context";
import logger from "./logger";
import "./index.css";
import AdminApp from "./apps/admin/AdminApp";
import UserApp from "./apps/user/UserApp";
import PublicApp from "./apps/public/PublicApp";

global.error = (ex) => {
  logger.error(ex);
  alert(ex.message);
};

function App() {
  const { user } = useContext(UserContext);

  if (user && user.role === "user") {
    return <UserApp />;
  }

  if (user && user.role === "admin") {
    return <AdminApp />;
  }

  return <PublicApp />;
}

function Wrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
export default Wrapper;
