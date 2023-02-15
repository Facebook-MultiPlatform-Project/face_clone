import * as React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { navigation } from "../rootNavigation";

const OnlineItem = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("chat", { userId: item.id });
      }}
      style={{
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
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
      <Text style={{ height: 36, maxWidth: 60 }}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default OnlineItem;
