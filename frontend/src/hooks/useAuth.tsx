import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  ICognitoUserPoolData,
} from "amazon-cognito-identity-js";
import React, { createContext, useContext, useEffect, useState } from "react";

const poolData: ICognitoUserPoolData = {
  UserPoolId: import.meta.env.VITE_USER_POOL_ID,
  ClientId: import.meta.env.VITE_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

interface UseAuth {
  isLoading: boolean;
  isAuthenticated: boolean;
  username: string;
  signUp: (
    username: string,
    email: string,
    password: string
  ) => Promise<Result>;
  confirmSignUp: (username: string, code: string) => Promise<any>;
}

interface Result {
  success: boolean;
  message: string;
}

type Props = {
  children?: React.ReactNode;
};

const authContext = createContext({} as UseAuth);

export const ProvideAuth: React.FC<Props> = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = (): UseAuth => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser) {
      setIsLoading(false);
    } else {
      currentUser.getSession((error: Error, session: null) => {
        if (error) {
          console.error(error);
          setIsLoading(false);
          return;
        }
        setUsername(currentUser.getUsername());
        setIsAuthenticated(true);
        setIsLoading(false);
      });
    }
  }, []);

  const signUp = async (username: string, email: string, password: string) => {
    const dataEmail = {
      Name: "email",
      Value: email,
    };

    const dataUsername = {
      Name: "nickname",
      Value: username,
    };

    const attributeList = [
      new CognitoUserAttribute(dataUsername),
      new CognitoUserAttribute(dataEmail),
    ];
    try {
      userPool.signUp(username, password, attributeList, [], (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
      return { success: true, message: "SIGNUP SUCCESS" };
    } catch (error) {
      return {
        success: false,
        message: "SIGNUP FAIL",
      };
    }
  };

  const confirmSignUp = async (username: string, code: string) => {
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    try {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(result);
        return { success: true, message: "CONFIRM SUCCESS" };
      });
    } catch (error) {
      return {
        success: false,
        message: "CONFIRM FAIL",
      };
    }
  };

  return {
    isLoading,
    isAuthenticated,
    username,
    signUp,
    confirmSignUp,
  };
};
