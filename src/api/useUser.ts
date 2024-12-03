import { useState } from "react";
import { axios_instance } from "../lib/axios";
import { errorToast } from "../lib/toast";

const useUser = () => {
  const [userLoading, setUserLoading] = useState(false);

  const login = async (
    payload: { email: string; password: string },
    callback: any,
  ) => {
    setUserLoading(true);
    try {
      const response = await axios_instance.post("/user/login", payload);

      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message || "Failed to login. Please try again",
        );
        setUserLoading(false);
        return;
      }

      callback(response?.data, null);
    } catch (error) {
      callback(null, error);
    } finally {
      setUserLoading(false);
    }
  };

  const register = async (
    payload: {
      email: string;
      password: string;
      username: string;
    },
    callback: any,
  ) => {
    setUserLoading(true);
    try {
      const response = await axios_instance.post("/user/", payload);
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message || "Failed to register. Please try again",
        );
      }

      callback(response?.data, null);
    } catch (error) {
      callback(null, error);
    } finally {
      setUserLoading(false);
    }
  };

  return {
    userLoading,
    login,
    register,
  };
};

export default useUser;
