import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

//provider

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  let token = state && state.token;
  //axios set

  axios.defaults.baseURL = "http://192.168.29.51:8080/api/v1";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //initial local storage data
  useEffect(() => {
    const loadlocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);
      setState({ ...state, user: loginData?.user, token: loginData?.token });
    };
    loadlocalStorageData();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
