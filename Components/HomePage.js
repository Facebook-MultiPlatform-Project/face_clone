import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
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
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const onRefresh = () => {
    // setListPost([]);
    setPage(1);
    getListPost();
  };

  const deletePost = async (id) => {
    setRefreshing(true);
    await PostApi.deletePost(id);
    getListPost();
  };

  const getListPost = async () => {
    const params = { take: 10 * page, skip: 0 };
    await PostApi.getAll(params)
      .then((res) => {
        setListPost(res.data.data.map((item) => item.id));
      })
      .then((err) => {
        console.log(err);
      })
      .finally(() => {
        setRefreshing(false);
        setIsLoading(false);
      });
  };
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentSizeHeight = event.nativeEvent.contentSize.height;
    const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
    const threshold = 0.5;
    if (offsetY + layoutMeasurementHeight >= contentSizeHeight * threshold) {
      handleLoadMore();
    }
  };

  const handleLoadMore = () => {
    console.log("vaoday");
    if (!isLoading) {
      setIsLoading(true);
      setPage(page + 1);
      getListPost();
    }
  };

  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    setRefreshing(true);
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
          onScroll={handleScroll}
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
          {renderFooter()}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
