import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  RefreshControl,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Post from "../Components/Post";
import { Icon } from "react-native-elements";
import { useState } from "react";
import { useEffect } from "react";
import { PostApi } from "../apis/Post/Post";
import { UserApi } from "../apis/User/UserApi";
import { FriendApi } from "../apis/Friend/Friend";
import { constant } from "../utils/constant";
import { SafeAreaView } from "react-native";
import { io } from "socket.io-client";
import * as SecureStore from "expo-secure-store";
var access_token = "";
var socket;
const setupSocket = async () => {
  try {
    access_token = await SecureStore.getItemAsync("access_token");
    socket = io("https://facebook-api-production.up.railway.app", {
      extraHeaders: {
        Authorization: access_token,
      },
    });
    socket.on("connect", () => {
      console.log("socket connected");
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });
    socket.on("error", (err) => {
      console.log("socket error", err);
    });

    // socket.on("notification", () => {
    //   // setRefreshing(true);
    //   // getListFriendRequest();
    //   // console.log("haha");
    // });
  } catch (err) {
    console.log("setup socket", err);
  }
};
const Profile = ({ route, navigation }) => {
  const userId = route.params.userId;
  const [listPost, setListPost] = useState([]);
  const [listFriend, setListFriend] = useState([]);
  const [listFriendRender, setListFriendRender] = useState([]);
  const [info, setInfo] = useState({});
  const [isFriend, setIsFriend] = useState(false);
  const [status, setStatus] = useState(null);
  const [isSender, setIsSender] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector((state) => state.user.user);

  const windowHeight = Dimensions.get("window").height;
  const scrollHeight = windowHeight - 55;

  const onRefresh = () => {
    getUserInfo();
    getListPost();
    checkFriend();
    if (userId === user.id) {
      getListFriend();
    }
  };

  const getUserInfo = async () => {
    await UserApi.getInfo(userId)
      .then((res) => {
        setInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = () => {
    getUserInfo();
  };

  const getListPost = async () => {
    await PostApi.getPostByUser({ id: userId, take: 10, skip: 0 })
      .then((res) => {
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
        setIsFriend(res.data.data.isFriend);
        setIsSender(res.data.data.isSender);
        setStatus(res.data.data.status);
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
        socket.emit("request-friend", {
          userId: userId,
          requestId: "1",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setAccept = async (isAccept) => {
    const data = {
      id: userId,
      isAccept,
    };
    await FriendApi.setAccept(data)
      .then((res) => {
        console.log(res.data);
        checkFriend();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const cancelRequest = async () => {
    await FriendApi.cancelRequest(userId)
      .then((res) => {
        console.log(res.data);
        checkFriend();
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
        navigation.navigate("facebook");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFriend = async () => {
    await FriendApi.removeFriend(userId)
      .then((res) => {
        checkFriend();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListFriend = async () => {
    await FriendApi.getListFriend()
      .then((res) => {
        setListFriend(res.data.data);
        setListFriendRender(
          res.data.data.length <= 6 ? res.data.data : res.data.data.slice(0, 5)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setupSocket();
    getUserInfo();
    getListPost();
    checkFriend();
    if (userId === user.id) {
      getListFriend();
    }
    return () => {
      socket.off("connect");
      socket.off("error");
      // socket.off("notification");
      socket.off("disconnect");
    };
  }, [userId]);

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
      <SafeAreaView
        style={{
          height: scrollHeight,
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
                top: 140,
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
              <Text style={{ fontSize: 25, fontWeight: "700" }}>
                {info.name}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                {userId === user.id ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate({
                        name: "updateProfile",
                        params: { updateData: handleUpdate },
                      });
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
                ) : isFriend ? (
                  <TouchableOpacity
                    onPress={removeFriend}
                    style={{
                      height: 30,
                      width: 100,
                      borderRadius: 4,
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#3982E4",
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Hủy kết bạn</Text>
                  </TouchableOpacity>
                ) : status !== constant.FRIEND_STATUS.SEND_REQUEST ? (
                  <TouchableOpacity
                    onPress={sendRequest}
                    style={{
                      height: 30,
                      width: 140,
                      borderRadius: 4,
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#3982E4",
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Yêu cầu kết bạn</Text>
                  </TouchableOpacity>
                ) : status === constant.FRIEND_STATUS.SEND_REQUEST &&
                  isSender ? (
                  <TouchableOpacity
                    onPress={cancelRequest}
                    style={{
                      height: 30,
                      width: 100,
                      borderRadius: 4,
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#3982E4",
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Hủy yêu cầu</Text>
                  </TouchableOpacity>
                ) : status === constant.FRIEND_STATUS.SEND_REQUEST &&
                  !isSender ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setAccept(true);
                      }}
                      style={{
                        height: 30,
                        width: 100,
                        borderRadius: 4,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#3982E4",
                      }}
                    >
                      <Text style={{ color: "#fff" }}>Đồng ý</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setAccept(false);
                      }}
                      style={{
                        height: 30,
                        width: 100,
                        borderRadius: 4,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#E4E5EA",
                      }}
                    >
                      <Text style={{ color: "#000" }}>Xóa</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )}
                {userId !== user.id && (
                  <TouchableOpacity
                    onPress={setBlock}
                    style={{
                      marginTop: 10,
                      height: 30,
                      width: 100,
                      borderRadius: 4,
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#E4E5EA",
                    }}
                  >
                    <Text style={{ color: "#000", fontWeight: "500" }}>
                      Chặn
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          {userId === user.id && (
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: 10,
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}
            >
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "700" }}>Bạn bè</Text>
                <Text>{listFriend.length} người bạn</Text>
              </View>
              <View>
                <View
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  {listFriendRender.map((item) => {
                    return (
                      <TouchableOpacity style={{ width: "33%" }} key={item.id}>
                        <View
                          style={{
                            marginBottom: 5,
                            width: "95%",
                          }}
                        >
                          <Image
                            style={{
                              width: "100%",
                              height: 115,
                              borderRadius: 10,
                            }}
                            source={{
                              uri: item.avatar,
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
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View>
                  {listFriend.length > 6 && (
                    <TouchableOpacity
                      style={{
                        width: "100%",
                        marginTop: 10,
                        paddingVertical: 5,
                        borderRadius: 8,
                        backgroundColor: "#e4e4e4",
                      }}
                      onPress={() => {
                        navigation.navigate("friendList");
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 16,
                          fontWeight: "600",
                        }}
                      >
                        Xem tất cả bạn bè
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}
          <View>
            {listPost.map((item) => (
              <Post id={item.id} key={item.id} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
