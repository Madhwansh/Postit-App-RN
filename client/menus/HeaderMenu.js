import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderMenu = () => {
  const [state, setState] = useContext(AuthContext);

  const handleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    alert("logged out");
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <FontAwesome5
          name="sign-out-alt"
          color={"red"}
          size={24}
          style={styles.iconStyle}
        ></FontAwesome5>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
  },
});

export default HeaderMenu;
