import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Footer from "../menus/Footer";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const Account = () => {
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;
  const [name, setName] = useState("");
  const [email, setEmail] = useState(state?.user.email);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const { name } = state.user;
    setName(name);
  }, []);

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put("/auth/update-user", {
        name,
        password,
        email,
      });
      let UD = JSON.stringify(data);
      setState({ ...state, user: UD?.updatedUser });
      alert(data && data.message);
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoTitle}>User Information</Text>
        <View style={styles.userInfoItem}>
          <Text style={styles.userInfoLabel}>Name:</Text>
          <Text style={styles.userInfoText}>{state?.user.name}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.userInfoLabel}>Email:</Text>
          <Text style={styles.userInfoText}>{state?.user.email}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.userInfoLabel}>Joined:</Text>
          <Text style={styles.userInfoText}>{state?.user.createdAt}</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Update Profile</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    marginTop: 30,
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfoLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  userInfoText: {
    fontSize: 16,
  },
  formContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Account;
