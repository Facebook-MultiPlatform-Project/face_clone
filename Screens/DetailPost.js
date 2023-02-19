import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Icon, Image } from "react-native-elements";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PostApi } from "../apis/Post/Post";
import { constant } from "../utils/constant";
import { Video } from "expo-av";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";

const DetailPost = ({ navigation, route }) => {
  const id = route.params.postId;
  const width = Dimensions.get("window").width - 20;

  const [postData, setPostData] = useState({});
  const [author, setAuthor] = useState({});
  const user = useSelector((state) => state.user.user);

  const getPostData = async () => {
    await PostApi.getPost(id)
      .then((res) => {
        setPostData(res.data.data);
        console.log(res.data.data);
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
    getPostData();
  }, []);

  return (
    <View style={styles.container}>
      {postData.id && (
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 15,
                borderBottomColor: "#bababa",
                borderBottomWidth: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{ marginRight: 10 }}
              >
                <Icon type="material" name="arrow-back"></Icon>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                Chi tiết bài đăng
              </Text>
            </View>
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
                    constant.EMOJI.find(
                      (item) => item.value === postData.status
                    ).img
                  } cảm thấy ${
                    constant.EMOJI.find(
                      (item) => item.value === postData.status
                    ).text
                  }.`}</Text>
                )}
              </View>
              <View style={{ marginLeft: "auto" }}>
                <Icon name="ellipsis-horizontal" type="ionicon"></Icon>
              </View>
            </View>
            <View style={styles.content}>
              <View style={[styles.description]}>
                <Text style={{ fontSize: 16 }}>{postData.content}</Text>
              </View>
              {postData.medias[0] && postData.medias[0].type === "0" ? (
                <SafeAreaView>
                  <FlatList
                    style={{ width: "100%" }}
                    data={postData.medias}
                    scrollEnabled={false}
                    numColumns={1}
                    keyExtractor={(e) => e.id}
                    renderItem={({ item }) => (
                      <Image
                        source={{ uri: item.name }}
                        containerStyle={{
                          width: "100%",
                          height: width,
                          flex: 1,
                          marginBottom: 10,
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
            <View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "500" }}>
                  {postData.numLikes} likes
                </Text>
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
                  <TouchableOpacity style={styles.button} onPress={likePost}>
                    <Icon color="#4292FF" name="thumb-up" type="material" />
                    <Text style={{ marginLeft: 10, color: "#4292FF" }}>
                      Thích
                    </Text>
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
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

export default DetailPost;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginTop: 30,
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
