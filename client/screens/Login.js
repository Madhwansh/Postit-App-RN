import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import InputDetail from "../components/Form/InputDetail";
import SubmitButton from "../components/Form/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

const Login = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(false);
      if (!email || !password) {
        Alert.alert("Kindly Fill all fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("Home");
      console.log("login data==", { email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  //temp function to local storage
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("Local Storage==", data);
  };

  getLocalStorageData();

  return (
    <View style={styles.containerScroll}>
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.subhead}>Kindly Fill The Details</Text>

        <InputDetail
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
        <InputDetail
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <SubmitButton
          btnTitle="Login"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <Text style={styles.logintext}>
          Not Registered ? Tap here to{" "}
          <Text
            style={styles.linktext}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: "black",
    fontWeight: "600",
    fontSize: 30,
    marginBottom: 10,
  },
  subhead: {
    color: "black",
    fontWeight: "300",
    fontSize: 20,
    marginBottom: 20,
  },
  logintext: {
    fontWeight: "600",
    fontSize: 15,
  },
  linktext: {
    fontWeight: "600",
    fontSize: 15,
    color: "red",
  },
});

export default Login;
