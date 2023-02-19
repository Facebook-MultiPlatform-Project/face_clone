import * as React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import { navigation } from "../rootNavigation";

const RoomItem = ({ item }) => {
  const user = useSelector((state) => state.user.user);
  const nameUser = user.name || "pham thao";
  const userID = user.id || "ceb34d32-6634-4f3c-bb40-dd44825a8f26";
  const isRead = item && item.lastMessage && item.lastMessage.read;

  const getNameRoom = () => {
    const name = item && item.name && item.name.split(";");
    return name[0] === nameUser ? name[1] : name[0];
  };
  const getUriRoom = () => {
    const listUsers = item && item.listUsers;
    return listUsers[0].id === userID
      ? listUsers[1].avatar
      : listUsers[0].avatar;
  };
  const getChat = () => {
    const lastMessage = item && item.lastMessage;
    if (!lastMessage) return "Nhắn tin ngay bây giờ";
    if (lastMessage.user.id === userID)
      return `Bạn: ${
        lastMessage.content.length > 20
          ? `${lastMessage.content.slice(0, 20)} ...`
          : lastMessage.content
      }`;
    return lastMessage.content.length > 24
      ? `${lastMessage.content.slice(0, 24)} ...`
      : lastMessage.content;
  };
  const OtherId = () => {
    const listUsers = item && item.listUsers;
    return listUsers[0].id === userID ? listUsers[1].id : listUsers[0].id;
  };
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("chat", { otherId: OtherId() });
      }}
      style={{
        flexDirection: "row",
        width: "100%",
        marginBottom: 4,
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          marginTop: 5,
          marginLeft: 7,
          marginRight: 3,
        }}
      >
        <Image
          style={{
            width: 60,
            height: 60,
            borderRadius: 100,
          }}
          source={{ uri: getUriRoom() }}
        ></Image>
        <View
          style={{
            position: "absolute",
            width: 15,
            height: 15,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            bottom: 3,
            right: 3,
            borderRadius: 100,
          }}
        >
          <View
            style={{
              width: 12,
              height: 12,
              backgroundColor: "green",
              borderRadius: 100,
            }}
          ></View>
        </View>
      </View>
      <View
        style={{
          width: "70%",
          marginTop: 5,
          marginHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            color: "#5b5b5b",
            fontWeight: item.isRead ? "300" : "bold",
            position: "absolute",
            top: 5,
          }}
        >
          {getNameRoom()}
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: "#5b5b5b",
            fontWeight: isRead ? "300" : "bold",
            position: "absolute",
            bottom: 10,
          }}
        >
          {getChat()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RoomItem;
