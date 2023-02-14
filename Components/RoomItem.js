import * as React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { navigation } from "../rootNavigation";

const RoomItem = ({ item }) => {
  const userID = 2;
  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate();
      }}
      style={{
        flexDirection: "row",
        width: "100%",
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
          source={{ uri: item.uri }}
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
            fontWeight:
              item.isRead || userID === item.idsender ? "300" : "bold",
            position: "absolute",
            top: 5,
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: "#5b5b5b",
            fontWeight:
              item.isRead || userID === item.idsender ? "300" : "bold",
            position: "absolute",
            bottom: 10,
          }}
        >
          {userID === item.idsender ? `Bạn: ${item.chat}` : item.chat}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RoomItem;
