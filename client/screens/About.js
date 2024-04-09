import { View, Text, StyleSheet } from "react-native";
import React from "react";

import Footer from "../menus/Footer";

const About = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 5,
    marginTop: 30,
  },
});

export default About;
