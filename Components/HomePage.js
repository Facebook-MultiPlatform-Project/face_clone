import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import Post from "./Post";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { navigation } from "../rootNavigation";
import { Image } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { useState } from "react";
import { PostApi } from "../apis/Post/Post";

const HomePage = () => {
  const user = useSelector((state) => state);
  const [listPost, setListPost] = useState([]);

  const getListPost = async () => {
    await PostApi.getAll()
      .then((res) => {
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
  };
  console.log(user);
  return (
    <View>
      <ScrollView
        horizontal={false}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("createPost");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: "#fff",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU",
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                marginRight: 10,
              }}
            ></Image>
            <TextInput
              placeholder="Bạn đang nghĩ gì..."
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
            <Icon type="ionicon" name="images" color={"#58C472"}></Icon>
          </View>
        </TouchableOpacity>

        <Post />
        <Post />
        <Post />
        <Post />
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
