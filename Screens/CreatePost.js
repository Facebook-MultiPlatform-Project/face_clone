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

const CreatePost = () => {
  const [content, setContent] = useState(null);
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState(null);
  const windowWidth = Dimensions.get("window").width;

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
      console.log(result.selected);
      if (result.selected) {
        result.selected.map((item) => {
          console.log(item);
          setImage([...image, item]);
        });
      } else {
        setImage([...image, result]);
      }
    }
  };
  const handleAddImage = () => {
    if (image.length < 4) uploadImage();
    else alert("chỉ dược up tối đa 4 ảnh");
  };
  const handleUploadVideo = async () => {
    await permissionRequest();
    if (permissionRequest()) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Videos",
      });
      console.log(result);
      setVideo(result);
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
        console.log("asdad", res.data);
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
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 10,
          borderBottomColor: "#aaa",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Tạo bài viết
        </Text>
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
              uri: "https://source.unsplash.com/random?sig=10",
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              marginRight: 10,
            }}
          ></Image>
          <Text style={{ fontSize: 15 }}>Nobi Nobita</Text>
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
        {image[0] ? (
          <SafeAreaView style={{ minHeight: 380, maxHeight: 570 }}>
            <FlatList
              data={image}
              // style={}
              numColumns={2}
              keyExtractor={(e) => e}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.uri }}
                  containerStyle={{
                    aspectRatio: 1,
                    width: "100%",
                    height: 150,
                    flex: 1,
                  }}
                />
              )}
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
          onPress={handleUploadVideo}
        >
          <Icon type="material" name="mood" color={"#F8C03E"}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({});
