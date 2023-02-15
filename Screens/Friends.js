import {
  Text,
  View,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Button,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar } from "react-native-paper";
import { Divider } from "react-native-elements";
import { FriendApi } from "../apis/Friend/Friend";
import { getTimeDisplay } from "../utils";
import { navigation } from "../rootNavigation";
import { io } from "socket.io-client";
import * as SecureStore from "expo-secure-store";
var access_token = "";
var socket;
const setupSocket = async (getList) => {
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
    socket.on("notification", () => {
      // setRefreshing(true);
      // getListFriendRequest();
      console.log("haha");
      getList();
    });
  } catch (err) {
    console.log("setup socket", err);
  }
};
const Friends = () => {
  const [friendsRequests, setFriendsRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    getListFriendRequest();
  };
  async function getListFriendRequest() {
    const data = await FriendApi.getRequestFriend();
    setFriendsRequests(data.data.data);
    setRefreshing(false);
  }

  useEffect(() => {
    setRefreshing(true);
    setupSocket(getListFriendRequest);
    getListFriendRequest();
    return () => {
      socket.off("connect");
      socket.off("error");
      socket.off("notification");
      socket.off("disconnect");
    };
  }, []);
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ paddingLeft: 10, fontSize: 25, fontWeight: "bold" }}>
          {"Lời mời kết bạn "}
        </Text>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "red" }}>
          {friendsRequests.length}
        </Text>
      </View>
      <Divider orientation="horizontal" width={1} />
      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {friendsRequests.length > 0 ? (
          friendsRequests.map((item) => {
            return (
              <FriendsItems
                avatar={item.avatar}
                name={item.name}
                id={item.id}
                time={item.createAt}
                callBack={getListFriendRequest}
              />
            );
          })
        ) : (
          <Text style={{ paddingLeft: 10 }}>Hiện không có lời mời nào</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Friends;

const FriendsItems = ({ avatar, name, id, time, callBack }) => {
  async function handleAccept(id) {
    const body = {
      id: id,
      isAccept: true,
    };
    socket.emit("accept-friend", {
      userId: id,
      requestId: "1",
    });
    const x = await FriendApi.setAccept(body);
    callBack();
  }

  async function handleDecline(id) {
    const x = await FriendApi.cancelRequest(id);

    callBack();
  }
  return (
    <TouchableOpacity
      style={{
        // backgroundColor: isRead ? "white" : "#BFEAF5",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        maxWidth: "100%",
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 3,
      }}
      onPress={() => {
        navigation.navigate("profile", {
          userId: id,
        });
      }}
    >
      <View>
        <Avatar.Image
          size={70}
          source={{
            uri: avatar,
          }}
        />
        {/* <AvatarItem avatarUrl={avatar} /> */}
      </View>
      <View style={{ width: 30 }}></View>
      <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              flex: 1,
              flexWrap: "wrap",
              maxWidth: "100%",
              fontSize: 20,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text>{getTimeDisplay(time)}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#0084FF",
              padding: 10,
              borderRadius: 10,
              width: "50%",
              justifyContent: "center", //Centered horizontally
              alignItems: "center", //Centered vertically
              flex: 1,
            }}
            onPress={() => {
              handleAccept(id);
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "white",
              }}
            >
              Chấp nhận
            </Text>
          </TouchableOpacity>
          <View style={{ width: 5 }}></View>
          <TouchableOpacity
            style={{
              backgroundColor: "#d3d3d3",
              padding: 10,
              borderRadius: 10,
              width: "50%",
              justifyContent: "center", //Centered horizontally
              alignItems: "center", //Centered vertically
              flex: 1,
            }}
            onPress={() => {
              handleDecline(id);
            }}
          >
            <Text
              style={{
                fontSize: 15,
              }}
            >
              Từ chối
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
