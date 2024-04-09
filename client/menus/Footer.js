import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5
          name="home"
          size={24}
          style={styles.iconStyle}
          color={route.name === "Home" && "red"}
        ></FontAwesome5>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
        <FontAwesome5
          name="plus"
          size={24}
          style={styles.iconStyle}
          color={route.name === "Posts" && "red"}
        ></FontAwesome5>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Myposts")}>
        <FontAwesome5
          name="list"
          size={24}
          style={styles.iconStyle}
          color={route.name === "Myposts" && "red"}
        ></FontAwesome5>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <FontAwesome5
          name="user-alt"
          size={24}
          style={styles.iconStyle}
          color={route.name === "Account" && "red"}
        ></FontAwesome5>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 2,
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
  },
});

export default Footer;
