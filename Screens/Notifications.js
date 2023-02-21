import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Avatar } from "react-native-paper";
import { Icon } from "react-native-elements";
import { NotificationApi } from "../apis/Notification/notificationApi";
import { getTimeDisplay } from "../utils";
import { navigation } from "../rootNavigation";
import { useFocusEffect } from "@react-navigation/native";
import socketClient from "../utils/socketClient";

const SECURITY = "0";
const POST = "1";
const REQ_FRIEND = "2";
const ACCEPT_FRIEND = "3";
const COMMENT_POST = "4";
const LIKE_POST = "5";

const NotiItems = ({
  id,
  content,
  userName,
  userAvatar,
  active,
  createdAt,
  type,
  fromPost,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: active ? "white" : "#BFEAF5",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        maxWidth: "100%",
      }}
      onPress={async () => {
        try {
          await NotificationApi.active(id);
          switch (type) {
            case REQ_FRIEND:
            case ACCEPT_FRIEND:
              navigation.navigate("profile", {
                userId: content.slice(7),
              });
              break;
            case COMMENT_POST:
              navigation.navigate("comment", {
                postId: fromPost.postId,
              });
              break;
            default:
          }
        } catch (err) {
          console.log("active notification", err);
        }
      }}
    >
      <Avatar.Image
        size={75}
        source={{
          uri: userAvatar,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          marginLeft: 10,
          marginRight: 20,
        }}
      >
        {type === SECURITY && (
          <Text
            style={{
              flex: 1,
              flexWrap: "wrap",
              maxWidth: "100%",
              fontSize: 16,
              paddingTop: 10,
            }}
            numberOfLines={3}
          >
            <Text>Bạn đã đăng nhập facebook trên 1 thiết bị mới.</Text>
          </Text>
        )}
        {type === REQ_FRIEND && (
          <Text
            style={{
              flex: 1,
              flexWrap: "wrap",
              maxWidth: "100%",
              fontSize: 16,
              paddingTop: 10,
            }}
            numberOfLines={3}
          >
            <Text style={{ fontWeight: "700" }}>{userName}</Text>
            <Text> đã gửi lời mời kết bạn cho bạn.</Text>
          </Text>
        )}
        {type === ACCEPT_FRIEND && (
          <Text
            style={{
              flex: 1,
              flexWrap: "wrap",
              maxWidth: "100%",
              fontSize: 16,
              paddingTop: 10,
            }}
            numberOfLines={3}
          >
            <Text style={{ fontWeight: "700" }}>{userName}</Text>
            <Text> đã chấp nhận lời mời kết bạn của bạn.</Text>
          </Text>
        )}
        {type === COMMENT_POST && (
          <Text
            style={{
              flex: 1,
              flexWrap: "wrap",
              maxWidth: "100%",
              fontSize: 16,
              paddingTop: 10,
            }}
            numberOfLines={3}
          >
            <Text style={{ fontWeight: "700" }}>{userName}</Text>
            <Text> đã bình luận trong bài đăng của bạn.</Text>
          </Text>
        )}
        {type === LIKE_POST && (
          <Text
            style={{
              flex: 1,
              flexWrap: "wrap",
              maxWidth: "100%",
              fontSize: 16,
              paddingTop: 10,
            }}
            numberOfLines={3}
          >
            <Text style={{ fontWeight: "700" }}>{userName}</Text>
            <Text> đã thích bài đăng của bạn.</Text>
          </Text>
        )}
        <Text style={{ fontSize: 14, color: "grey" }}>
          {getTimeDisplay(createdAt)}
        </Text>
      </View>
      <TouchableOpacity style={{ marginBottom: 50 }}>
        <Icon name="dots-three-horizontal" type="entypo" size={20}></Icon>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const Notifications = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   socketClient.on("notification", (notification) => {
  //     getNotification();
  //     console.log("socket notification notification.js");
  //   });
  //   return () => {
  //     socketClient.off('notification');
  //   };
  // }, []);

  const getNotification = async () => {
    try {
      const data = await NotificationApi.getAll();
      console.log("get notification");
      setNotificationList(data.data.data);
    } catch (err) {
      console.log("notification", err);
    }
  };
  useEffect(() => {
    getNotification();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getNotification();
    setRefreshing(false);
  });
  useFocusEffect(
    React.useCallback(() => {
      setRefreshing(true);
      getNotification();
      setRefreshing(false);
    }, [])
  );
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {notificationList.map((item, index) => (
          <NotiItems key={index} {...item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Notifications;
