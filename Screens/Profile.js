import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Post from "../Components/Post";
import { Icon } from "react-native-elements";
import { navigation } from "../rootNavigation";
import { useState } from "react";
import { useEffect } from "react";
import { PostApi } from "../apis/Post/Post";
import { UserApi } from "../apis/User/UserApi";
import { FriendApi } from "../apis/Friend/Friend";
import { constant } from "../utils/constant";
import { SafeAreaView } from "react-native";
import socketClient from "../utils/socketClient";

const Profile = ({ route, navigation }) => {
  const userId = route.params.userId;
  console.log(userId);
  const [listPost, setListPost] = useState([]);
  const [info, setInfo] = useState({});
  const [isFriend, setIsFriend] = useState(false);
  const user = useSelector((state) => state.user.user);
  const getUserInfo = async () => {
    await UserApi.getInfo(userId)
      .then((res) => {
        console.log(res.data);
        setInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListPost = async () => {
    await PostApi.getPostByUser({ author: userId, take: 10, skip: 0 })
      .then((res) => {
        console.log(res);
        setListPost(res.data.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkFriend = async () => {
    await FriendApi.checkFriend(userId)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendRequest = async () => {
    await FriendApi.sendRequest(userId)
      .then((res) => {
        console.log(res.data);
        checkFriend();
        socketClient.emit("request-friend", {
          userId: userId,
          requestId: "1",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setAccept = async () => {
    const data = {
      id: userId,
      isAccept: true,
    };
    await FriendApi.setAccept(data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const cancelAccept = async () => {
    await FriendApi.cancelRequest(userId)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setBlock = async () => {
    const data = {
      userId: userId,
      type: 1,
    };
    await UserApi.setBlock(data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFriend = async () => {
    await FriendApi.removeFriend(userId)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserInfo();
    getListPost();
  }, []);

  return (
    <View style={{ paddingVertical: 10 }}>
      <View
        style={{
          paddingTop: 30,
          paddingHorizontal: 10,
          height: 90,
          paddingBottom: 15,
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
        <TextInput
          placeholder="Tìm kiếm"
          style={{
            borderRadius: 100,
            flex: 1,
            borderWidth: 1,
            borderColor: "#CFCFD5",
            paddingHorizontal: 20,
            paddingVertical: 5,
            marginRight: 15,
          }}
        ></TextInput>
      </View>
      <ScrollView>
        <View style={{ position: "relative", backgroundColor: "#fff" }}>
          <View>
            <Image
              style={{ height: 230, width: "100%" }}
              source={{ uri: info.cover }}
            ></Image>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 50,
              left: 10,
              backgroundColor: "#fff",
              borderRadius: 100,
              width: 150,
              height: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 140,
                width: 140,
                borderRadius: 100,
              }}
              source={{ uri: info.avatar }}
            ></Image>
          </View>
          <View
            style={{
              marginTop: 50,
              marginBottom: 10,
              paddingHorizontal: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "700" }}>{info.name}</Text>
            {userId === user.id && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate({ name: "updateProfile" });
                }}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 4,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#3982E4",
                }}
              >
                <Icon name="edit" type="material" color="#fff"></Icon>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: 10,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
        >
          <View>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Bạn bè</Text>
            <Text>244 người bạn</Text>
          </View>
          <View>
            <View
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                flexDirection: "row",
                gap: 10,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((item) => {
                return (
                  <TouchableOpacity>
                    <View
                      style={{
                        marginBottom: 5,
                      }}
                    >
                      <Image
                        style={{ width: 115, height: 115, borderRadius: 10 }}
                        source={{
                          uri: "https://source.unsplash.com/random?sig=10",
                        }}
                      ></Image>
                      <Text
                        style={{
                          marginLeft: 5,
                          marginTop: 5,
                          overflow: "hidden",
                          fontSize: 16,
                          fontWeight: "600",
                        }}
                      >
                        Nobita
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View>
              <TouchableOpacity
                style={{
                  width: "100%",
                  marginTop: 10,
                  paddingVertical: 5,
                  borderRadius: 8,
                  backgroundColor: "#e4e4e4",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  Xem tất cả bạn bè
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Post />
          <Post />
          <Post />
          <Post />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
