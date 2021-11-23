import React, { createContext, useState } from "react";
import logger from "./logger";

const UserContext = createContext();

function getUserFromLocalStorage() {
  try {
    const userFromLocalStorageString = localStorage.getItem("user");

    if (userFromLocalStorageString) {
      const userFromLocalStorage = JSON.parse(userFromLocalStorageString);
      return userFromLocalStorage;
    }
  } catch (ex) {
    logger.error(ex);
  }

  return null;
}

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromLocalStorage());

  return (
    <UserContext.Provider
      value={{
        user,
        setUser(_user) {
          if (_user) {
            return setUser(_user);
          }

          setUser(getUserFromLocalStorage());
        }
      }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
