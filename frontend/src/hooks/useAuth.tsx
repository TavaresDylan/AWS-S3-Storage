import {
  AuthenticationDetails,
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
  confirmSignUp: (username: string, code: string) => Promise<Result>;
  signIn: (username: string, password: string) => Promise<Result>;
  signOut: () => Promise<Result>;
}

export interface Result {
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

  const signUp = async (username: string, email: string, password: string): Promise<Result> => {
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
    return new Promise((resolve, reject) => {
      try {
        userPool.signUp(email, password, attributeList, [], (err, data) => {
          if (err) {
            console.error(err.message);
            reject({
              success: false,
              message: err.name,
            });
          } else {
            resolve({
              success: true,
              message: "SIGNUP SUCCESS",
            });
          }
        });
      } catch (error) {
        return {
          success: false,
          message: "SIGNUP FAIL",
        };
      }
    });
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
      });
      return { success: true, message: "CONFIRM SUCCESS" };
    } catch (error) {
      return {
        success: false,
        message: "CONFIRM FAIL",
      };
    }
  };

  // TODO: if not already confirmed, ask to confirm
  const signIn = async (
    username: string,
    password: string
  ): Promise<Result> => {
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      try {
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (session) => {
            console.log(session);
            setIsAuthenticated(true);
            setUsername(username);
            resolve({ success: true, message: "SIGNIN SUCCESS" });
          },
          onFailure: (err) => {
            console.error(err);
            setIsAuthenticated(false);
            reject({ success: false, message: err.message });
          },
        });
      } catch (error) {
        console.error(error);
        return {
          success: false,
          message: "SIGNIN FAIL",
        };
      }
    });
  };

  const signOut = async () => {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser) {
      return {
        success: true,
        message: "ALREADY SIGNOUT",
      };
    }
    try {
      currentUser.signOut();
      setIsAuthenticated(false);
      setUsername("");
      return { success: true, message: "SIGNOUT SUCCESS" };
    } catch (error) {
      return {
        success: false,
        message: "SIGNOUT FAIL",
      };
    }
  };

  return {
    isLoading,
    isAuthenticated,
    username,
    signUp,
    confirmSignUp,
    signIn,
    signOut,
  };
};
