import {
  StyleSheet,
  Text,
  View,
  FlatList,
  LogBox,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Icon, Image } from "react-native-elements";
import { useEffect } from "react";
import { navigation } from "../rootNavigation";
import { useSelector } from "react-redux";
import { PostApi } from "../apis/Post/Post";

const Post = ({ id }) => {
  const [postData, setPostData] = useState({});
  const [author, setAuthor] = useState({});

  const [full, setFull] = useState(false);
  const user = useSelector((state) => state.user.user);

  const getPostData = async () => {
    await PostApi.getPost(id)
      .then((res) => {
        setPostData(res.data.data);
        setAuthor(res.data.data.author);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const likePost = async () => {
    await PostApi.likePost(id)
      .then((res) => {
        getPostData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    getPostData();
  }, []);

  return (
    postData.id && (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("profile", {
                userId: author.id,
              });
            }}
          >
            <View style={styles.avatar}>
              <Image
                source={{
                  uri: author.avatar,
                }}
                containerStyle={styles.avatar_img}
              ></Image>
            </View>
          </TouchableOpacity>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: "500" }}>{author.name}</Text>
          </View>
          <View style={{ marginLeft: "auto" }}>
            <Icon name="ellipsis-horizontal" type="ionicon"></Icon>
          </View>
        </View>
        <View style={styles.content}>
          <View style={[styles.description]}>
            <Text>{postData.content}</Text>
          </View>
          <SafeAreaView style={{ minHeight: 380, maxHeight: 570 }}>
            {postData.medias[0] && postData.medias[0].type === "0" && (
              <FlatList
                data={postData.medias}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={(e) => e.id}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.name }}
                    containerStyle={{
                      aspectRatio: 1,
                      width: "100%",
                      height: 150,
                      flex: 1,
                    }}
                  />
                )}
              />
            )}
            {}
          </SafeAreaView>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 10,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "500" }}>{postData.numLikes} likes</Text>
            <Text style={{ fontWeight: "500" }}>
              {postData.numComments} Bình luận
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 5,
            }}
          >
            {postData.is_liked ? (
              <TouchableOpacity style={styles.button}>
                <Icon color="#4292FF" name="thumb-up" type="material" />
                <Text style={{ marginLeft: 10, color: "#4292FF" }}>Thích</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={likePost}>
                <Icon type="material" name="thumb-up" color="#000"></Icon>
                <Text style={{ marginLeft: 10 }}>Thích</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.button}
              // onPress={() => {
              //   navigation.navigate("comment");
              // }}
            >
              <Icon type="primary" name="chat-bubble"></Icon>
              <Text style={{ marginLeft: 10 }}>Bình luận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    height: 50,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar_img: {
    width: 40,
    height: 40,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: "#bababa",
  },
  description: {
    marginBottom: 5,
  },
});
