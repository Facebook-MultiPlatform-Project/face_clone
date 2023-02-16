import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React from "react";
// import { AntIcon } from "react-native-vector-icons/AntDesign";
import { Icon, Image } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { upPostApi } from "../apis/Post/upPostApi";
import { Video } from "expo-av";
import { useSelector } from "react-redux";
import { constant } from "../utils/constant";
import Toast from "react-native-toast-message";

const CreatePost = ({ route, navigation }) => {
  const [content, setContent] = useState(null);
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState({});
  const [mood, setMood] = useState(null);
  const [loading, setLoading] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  const user = useSelector((state) => state.user.user);

  const updateMood = (value) => {
    setMood(value);
  };

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
    if (loading) return;
    if (video.uri) alert("Chỉ được up 4 ảnh hoặc 1 video");
    else if (image.length < 4) uploadImage();
    else alert("Chỉ dược up tối đa 4 ảnh!!!");
  };
  const handleUploadVideo = async () => {
    if (loading) return;
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
  const handleDropImage = (idx) => {
    let newImageList = image.filter((item, index) => index !== idx);
    setImage(newImageList);
  };
  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
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
    if (mood) {
      data.append("status", mood);
    }

    const res = upPostApi.post(data);
    res
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "Đăng bài thành công!!!",
          visibilityTime: 1000,
        });
        navigation.navigate("facebook");
      })
      .catch((err) =>
        Toast.show({
          type: "error",
          text1: err.message,
          visibilityTime: 1000,
        })
      )
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        width: windowWidth,
      }}
    >
      {loading && (
        <ActivityIndicator
          style={{
            position: "absolute",
            top: "49%",
            left: "48%",
            zIndex: 9999,
          }}
          size="large"
        ></ActivityIndicator>
      )}
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
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{user.name}</Text>
            <Text style={{ fontSize: 16, lineHeight: 24 }}>
              {mood &&
                ` - Đang ${
                  constant.EMOJI.find((item) => item.value === mood).img
                } cảm thấy ${
                  constant.EMOJI.find((item) => item.value === mood).text
                }.`}
            </Text>
          </View>
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
          <View>
            <Video
              source={{ uri: video.uri }}
              style={{ width: "100%", height: 300, bottom: 0 }}
              useNativeControls
            ></Video>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 100,
                // backgroundColor: "red",
                position: "absolute",
                right: 3,
                top: 3,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setVideo([]);
                }}
                // style={{ borderRadius: 100 }}
              >
                <Icon type="material" name="cancel"></Icon>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ height: 0 }}></View>
        )}
        {image[0] || video.uri ? (
          <SafeAreaView style={{ minHeight: 380, maxHeight: 570 }}>
            <FlatList
              data={image}
              numColumns={2}
              keyExtractor={(e) => e.uri}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <Image
                      source={{ uri: item.uri }}
                      containerStyle={{
                        aspectRatio: 1,
                        width: "100%",
                        height: 150,
                        flex: 1,
                      }}
                    />
                    <View
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 100,
                        // backgroundColor: "red",
                        position: "absolute",
                        right: 3,
                        top: 3,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          // console.log(index);
                          handleDropImage(index);
                        }}
                        // style={{ borderRadius: 100 }}
                      >
                        <Icon type="material" name="cancel"></Icon>
                      </TouchableOpacity>
                    </View>
                  </View>
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
            if (loading) return;
            navigation.navigate("listEmoji", {
              updateData: updateMood,
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
