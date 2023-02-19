import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { constant } from "../utils/constant";

const ListEmoji = ({ navigation, route }) => {
  const handleChoose = (value) => {
    route.params.updateData(value);
    navigation.goBack();
  };
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
          Bạn đang cảm thấy thế nào?
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {constant.EMOJI.map((item) => {
          return (
            <View
              key={item.value}
              style={{
                width: "50%",
                borderWidth: 1,
                borderColor: "#bababa",
              }}
            >
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                }}
                onPress={() => {
                  handleChoose(item.value);
                }}
              >
                <Text style={{ fontSize: 30, marginRight: 10 }}>
                  {item.img}
                </Text>
                <Text style={{ fontSize: 16 }}>{item.text}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ListEmoji;
