import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Footer from "../menus/Footer";
import { useState, useContext } from "react";
import { PostContext } from "../context/postContext";
import axios from "axios";

const Post = ({ navigation }) => {
  const [posts, setPosts] = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handlePost = async () => {
    try {
      if (!title) {
        alert("Please add title");
      }
      if (!description) {
        alert("Please add post description");
      }
      const { data } = await axios.post("/post/create-post", {
        title,
        description,
      });
      setPosts([...posts, data?.post]);
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message || error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, fontWeight: "500" }}>Create a Post</Text>
        </View>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
        />
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline={true}
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button} onPress={handlePost}>
          <Text style={styles.buttonText}>Add Post</Text>
        </TouchableOpacity>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Footer />
        </View>
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
  form: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Post;
