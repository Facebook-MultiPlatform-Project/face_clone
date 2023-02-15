import {
  StyleSheet,
  Text,
  View,
  FlatList,
  LogBox,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import { Icon, Image } from "react-native-elements";
import { useEffect } from "react";
import { navigation } from "../rootNavigation";
import { useSelector } from "react-redux";
import { PostApi } from "../apis/Post/Post";
import { constant } from "../utils/constant";
import { Video } from "expo-av";

const Post = ({ id, onDelete }) => {
  const [postData, setPostData] = useState({});
  const [author, setAuthor] = useState({});
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };
  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 2);
  }, []);

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
            <Text style={{ fontWeight: "600", fontSize: 17 }}>
              {author.name}
            </Text>
            {postData.status && (
              <Text style={{ fontSize: 15 }}>{` - Đang ${
                constant.EMOJI.find((item) => item.value === postData.status)
                  .img
              } cảm thấy ${
                constant.EMOJI.find((item) => item.value === postData.status)
                  .text
              }.`}</Text>
            )}
          </View>
          {user.id === author.id && (
            <View
              style={{
                marginLeft: "auto",
                flex: 1,
                flexDirection: "row-reverse",
              }}
            >
              <TouchableOpacity onPress={onDelete}>
                <Icon name="close" type="material"></Icon>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("editPost", { data: postData })}
              >
                <Icon name="edit" type="material"></Icon>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("detailPost", { postId: id });
          }}
        >
          <View style={styles.content}>
            <View style={[styles.description]}>
              <Text
                style={{ fontSize: 16 }}
                onTextLayout={onTextLayout}
                numberOfLines={textShown ? undefined : 2}
              >
                {postData.content}
              </Text>
              {lengthMore ? (
                <Text
                  onPress={toggleNumberOfLines}
                  style={{ lineHeight: 21, marginTop: 5 }}
                >
                  {textShown ? "Ẩn bớt..." : "Xem thêm..."}
                </Text>
              ) : null}
            </View>
            {postData.medias[0] && postData.medias[0].type === "0" ? (
              <SafeAreaView style={{ maxHeight: 570 }}>
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
              </SafeAreaView>
            ) : (
              <View style={{ height: 10 }}></View>
            )}
            {postData.medias[0] && postData.medias[0].type === "1" ? (
              <Video
                source={{ uri: postData.medias[0].name }}
                style={{ width: "100%", height: 300, bottom: 0 }}
                useNativeControls
              ></Video>
            ) : (
              <View style={{ height: 0 }}></View>
            )}
          </View>
        </TouchableOpacity>
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
              onPress={() => {
                navigation.navigate("comment", { postId: postData.id });
              }}
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
    marginVertical: 5,
    paddingHorizontal: 5,
  },
});
