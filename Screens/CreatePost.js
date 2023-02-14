import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { Icon, Image } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { upPostApi } from "../apis/Post/upPostApi";
import { Video } from "expo-av";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const CreatePost = ({ route, navigation }) => {
  const [content, setContent] = useState(null);
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState({});
  const windowWidth = Dimensions.get("window").width;
  const user = useSelector((state) => state.user.user);

  const permissionRequest = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(" k có quyền truy cập!!!");
      return false;
    } else return true;
  };
  const uploadImage = async () => {
    await permissionRequest();
    if (permissionRequest()) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
        allowsMultipleSelection: true,
        selectionLimit: 4,
      });
      if (!result.cancelled) {
        if (result.selected) {
          if (result.selected.length + image.length > 4)
            alert("Chỉ có thể up 4 ảnh!!!");
          else {
            const arr = image.concat(result.selected);
            setImage(arr);
          }
        } else {
          const a = image.concat([result]);
          setImage(a);
        }
      }
    }
  };
  const handleAddImage = () => {
    if (video.uri) alert("Chỉ được up 4 ảnh hoặc 1 video");
    else if (image.length < 4) uploadImage();
    else alert("Chỉ dược up tối đa 4 ảnh!!!");
  };
  const handleUploadVideo = async () => {
    if (image[0] || video.uri) alert("Chỉ được up 4 ảnh hoặc 1 video");
    else {
      await permissionRequest();
      if (permissionRequest()) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: "Videos",
        });
        if (!result.cancelled) setVideo(result);
      }
    }
  };
  const handleSubmit = async () => {
    const data = new FormData();
    data.append("content", content);
    for (let i = 0; i < image.length; i++) {
      const upload_body = {
        uri: image[i]["uri"],
        type: `image/${image[i]["uri"].slice(-4) === "jpeg" ? "jpg" : "png"}`,
        name:
          Platform.OS === "ios"
            ? image[i]["filename"]
            : `my_profile${Date.now()}.${
                image[i]["uri"].slice(-4) === "jpeg" ? "jpg" : "png"
              }`,
      };
      data.append("images", upload_body);
    }
    if (video["uri"]) {
      data.append("video", {
        uri: video["uri"],
        type: "video/mp4",
        name:
          Platform.OS === "ios"
            ? image[i]["filename"]
            : `my_profile${Date.now()}.mp4`,
      });
    }
    const res = upPostApi.post(data);
    res
      .then((res) => {
        navigation.navigate("facebook");
      })
      .catch((err) => console.log("err", err));
  };
  return (
    <View
      style={{
        flex: 1,
        width: windowWidth,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 20,
          paddingLeft: 10,
          paddingTop: 40,
          paddingBottom: 10,
          borderBottomColor: "#aaa",
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
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
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Tạo bài viết
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            width: 60,
            height: 30,
            backgroundColor: "#0742e6",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#fff",
              fontWeight: "500",
            }}
          >
            Đăng
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 10, paddingTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
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
          <Text style={{ fontSize: 15 }}>{user.name}</Text>
        </View>
        <View>
          <TextInput
            value={content}
            onChangeText={(text) => setContent(text)}
            placeholder="Bạn đang nghĩ gì..."
            multiline={true}
            style={{ padding: 15, fontSize: 20 }}
          ></TextInput>
        </View>
        {video.uri ? (
          <Video
            source={{ uri: video.uri }}
            style={{ width: "100%", height: 300, bottom: 0 }}
            isLooping
          ></Video>
        ) : (
          <View style={{ height: 0 }}></View>
        )}
        {image[0] || video.uri ? (
          <SafeAreaView style={{ minHeight: 380, maxHeight: 570 }}>
            <FlatList
              data={image}
              numColumns={2}
              keyExtractor={(e) => e.uri}
              renderItem={({ item }) => {
                return (
                  <Image
                    source={{ uri: item.uri }}
                    containerStyle={{
                      aspectRatio: 1,
                      width: "100%",
                      height: 150,
                      flex: 1,
                    }}
                  />
                );
              }}
            ></FlatList>
          </SafeAreaView>
        ) : (
          <></>
        )}
      </View>
      <View
        style={{
          marginTop: "auto",
          paddingVertical: 10,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopWidth: 1,
          borderTopColor: "#aaa",
        }}
      >
        <TouchableOpacity
          style={{
            width: "25%",
            alignItems: "center",
          }}
          onPress={handleAddImage}
        >
          <Icon type="ionicon" name="images" color={"#58C472"}></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "25%",
            alignItems: "center",
          }}
          onPress={handleUploadVideo}
        >
          <Icon type="ionicon" name="videocam" color={"#F23E5C"}></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "25%",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("listEmoji", {
              onGoBack,
            });
          }}
        >
          <Icon type="material" name="mood" color={"#F8C03E"}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({});
