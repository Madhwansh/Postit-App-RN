import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import axios from "axios";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import EditModal from "../components/EditModal";
import { useState } from "react";

const PostCard = ({ posts, myPostScreen }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});
  //prompt delete
  const handleDeletePrompt = (id) => {
    Alert.alert("Attention", "Are you sure want to delete this Post ?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel press");
        },
      },
      {
        text: "Delete",
        onPress: () => {
          handleDeletePost(id);
        },
      },
    ]);
  };

  const handleDeletePost = async (id) => {
    try {
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      alert(data?.message);
      navigation.push("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Total Post {posts.length}</Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {posts?.map((post, i) => (
        <View key={i} style={styles.card}>
          {myPostScreen && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ marginHorizontal: 20 }}>
                <FontAwesome5
                  name="pen"
                  size={15}
                  color={"red"}
                  onPress={() => {
                    setPost(post), setModalVisible(true);
                  }}
                />
              </Text>
              <Text style={{}}>
                <FontAwesome5
                  name="trash"
                  size={15}
                  color={"red"}
                  onPress={() => handleDeletePrompt(post?._id)}
                />
              </Text>
            </View>
          )}
          <Text style={styles.title}>{post?.title}</Text>
          <View style={styles.separator} />
          <Text style={styles.description}>{post?.description}</Text>
          <View style={styles.footer}>
            <FontAwesome5 name="user" size={15} style={styles.icon}>
              {post?.postedBy?.name}
            </FontAwesome5>
            <Text style={styles.date}>
              <FontAwesome5 name="clock" size={15} style={styles.icon}>
                {moment(post?.createdAt).format("DD:MM:YYYY")}
              </FontAwesome5>
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 3,
    marginVertical: 10,
    padding: 15,
  },
  heading: {
    fontWeight: "500",
    fontSize: 20,
    color: "#000000",
    textAlign: "center",
    marginBottom: 10,
  },
  separator: {
    borderBottomColor: "#dcdcdc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  date: {
    fontSize: 14,
    color: "#808080",
  },
});

export default PostCard;
