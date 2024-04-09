import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import InputDetail from "../components/Form/InputDetail";
import SubmitButton from "../components/Form/SubmitButton";
import axios from "axios";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please fill all field");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      alert(data && data.message);
      navigation.navigate("Login");
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.containerScroll}>
      <View style={styles.container}>
        <Text style={styles.heading}>Register</Text>
        <Text style={styles.subhead}>Kindly Fill The Details</Text>

        <InputDetail
          placeholder="Enter First Name"
          value={name}
          onChangeText={setName}
        />
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
          btnTitle="Register"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <Text style={styles.logintext}>
          Already Registered ? Tap here to{" "}
          <Text
            style={styles.linktext}
            onPress={() => navigation.navigate("Login")}
          >
            login
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

export default Register;
