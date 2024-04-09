import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Footer from "../menus/Footer";
import axios from "axios";
import PostCard from "../menus/PostCard";

const Myposts = () => {
  const [posts, setPosts] = useState([]);

  const getUserPost = async () => {
    try {
      const { data } = await axios.get("/post/get-user-post");
      setPosts(data?.userPosts);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    getUserPost();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts} myPostScreen={true} />
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
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

export default Myposts;
