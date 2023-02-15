import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import Post from "./Post";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { navigation } from "../rootNavigation";
import { Image } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { useState } from "react";
import { PostApi } from "../apis/Post/Post";
import { useEffect } from "react";

const HomePage = () => {
  const user = useSelector((state) => state.user.user);
  const [listPost, setListPost] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    getListPost();
  };

  const deletePost = async (id) => {
    setRefreshing(true);
    await PostApi.deletePost(id);
    getListPost();
  };

  const getListPost = async () => {
    setRefreshing(true);
    await PostApi.getAll()
      .then((res) => {
        setListPost(res.data.data.map((item) => item.id));
      })
      .then((err) => {
        console.log(err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };
  useEffect(() => {
    getListPost();
  }, [user]);
  return (
    <View>
      <SafeAreaView>
        <ScrollView
          horizontal={false}
          style={{ display: "flex", flexDirection: "column" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: "#fff",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("profile", { userId: user.id });
              }}
            >
              <Image
                source={{
                  uri: user.avatar,
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  marginRight: 10,
                }}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("createPost");
              }}
            >
              <TextInput
                placeholder="Bạn đang nghĩ gì..."
                style={{
                  borderRadius: 100,
                  width: 240,
                  borderWidth: 1,
                  borderColor: "#CFCFD5",
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  marginRight: 15,
                }}
              ></TextInput>
              <Icon type="ionicon" name="images" color={"#58C472"}></Icon>
            </TouchableOpacity>
          </View>
          {listPost[0] &&
            listPost.map((item) => {
              return (
                <Post
                  id={item}
                  key={item}
                  onDelete={() => {
                    deletePost(item);
                  }}
                />
              );
            })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
