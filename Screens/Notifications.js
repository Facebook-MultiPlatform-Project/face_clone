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

const NotiItems = ({ avatar, content, isRead, createdAt }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isRead ? "white" : "#BFEAF5",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        maxWidth: "100%",
      }}
    >
      <Avatar.Image
        size={75}
        source={{
          uri: avatar,
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
        <Text
          style={{ flex: 1, flexWrap: "wrap", maxWidth: "100%", fontSize: 16 }}
          numberOfLines={3}
        >
          {content}
        </Text>
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
  const getNotification = async () => {
    try {
      const data = await NotificationApi.getAll();
      setNotificationList[data.data.data];
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
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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
      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {notificationList.length > 0 &&
          notificationList.map((item) => (
            <NotiItems
              isRead={item.read}
              content={item.content}
              avatar={item.avatar}
              createdAt={item.createdAt}
            />
          ))}
        <NotiItems
          isRead={false}
          avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU"
          content="sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
          createdAt="2023-02-13 17:19:25"
        />
        <NotiItems
          isRead={false}
          avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU"
          content="sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
          createdAt="2023-02-13 17:19:25"
        />
        <NotiItems
          isRead={false}
          avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU"
          content="sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
          createdAt="2023-02-13 17:19:25"
        />
        <NotiItems
          isRead={false}
          avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU"
          content="sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
          createdAt="2023-02-13 17:19:25"
        />
      </ScrollView>
    </View>
  );
};

export default Notifications;
