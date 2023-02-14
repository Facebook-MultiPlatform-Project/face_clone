import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";

const ListEmoji = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: 40,
          paddingHorizontal: 15,
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
            navigation.goBack({ value: 133121 });
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
          Cảm xúc
        </Text>
      </View>
    </View>
  );
};

export default ListEmoji;
