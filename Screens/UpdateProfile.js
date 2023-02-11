import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { UserApi } from "../apis/User/UserApi";
import { AvatarApi } from "../apis/Avatar/Avatar";
import * as ImagePicker from "expo-image-picker";

const UpdateProfile = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const [avatar, setAvatar] = useState(
    "https://storage.googleapis.com/facebook-storage.appspot.com/user%2Favatar%2Fdefault.jpg"
  );
  const [cover, setCover] = useState(
    "https://storage.googleapis.com/facebook-storage.appspot.com/user%2Fcover%2Fdefault-cover.png"
  );
  const [info, setInfo] = useState({});
  const permissionRequest = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(" k có quyền truy cập!!!");
      return false;
    } else return true;
  };
  const uploadAvatar = async () => {
    await permissionRequest();
    if (permissionRequest()) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
      });
      console.log(result);
      setAvatar(result.uri);
      const data = new FormData();
      const upload_body = {
        uri: result["uri"],
        type: `image/${result["uri"].slice(-4) === "jpeg" ? "jpg" : "png"}`,
        name:
          Platform.OS === "ios"
            ? result["filename"]
            : `my_profile${Date.now()}.${
                result["uri"].slice(-4) === "jpeg" ? "jpg" : "png"
              }`,
      };
      data.append("image", upload_body);
      updateAvatar(data);
    }
  };

  const uploadCover = async () => {
    await permissionRequest();
    if (permissionRequest()) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
      });
      console.log(result);
      setCover(result.uri);
      const data = new FormData();
      const upload_body = {
        uri: result["uri"],
        type: `image/${result["uri"].slice(-4) === "jpeg" ? "jpg" : "png"}`,
        name:
          Platform.OS === "ios"
            ? result["filename"]
            : `my_profile${Date.now()}.${
                result["uri"].slice(-4) === "jpeg" ? "jpg" : "png"
              }`,
      };
      data.append("image", upload_body);
      updateCover(data);
    }
  };

  const updateAvatar = async (data) => {
    await AvatarApi.updateAvatar(data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateCover = async (data) => {
    await AvatarApi.updateCover(data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserInfo = async () => {
    await UserApi.getInfo(user.id)
      .then((res) => {
        console.log("data", res.data.data);
        const data = res.data.data;
        setAvatar(data.avatar);
        setCover(data.cover);
        setInfo(data);
      })
      .catch((err) => {
        console.log(12323, err);
      });
  };
  useEffect(() => {
    getUserInfo();
  }, []);

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
          Chỉnh sửa trang cá nhân
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            paddingVertical: 15,
            borderBottomColor: "#bababa",
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 18,
              }}
            >
              Ảnh đại diện
            </Text>
            <TouchableOpacity onPress={uploadAvatar}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#3982E4",
                }}
              >
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Image
              style={{
                width: 150,
                height: 150,
                borderRadius: 150,
              }}
              source={{
                uri: avatar,
              }}
            ></Image>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 15,
            borderBottomColor: "#bababa",
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 18,
              }}
            >
              Ảnh bìa
            </Text>
            <TouchableOpacity onPress={uploadCover}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#3982E4",
                }}
              >
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 15,
            }}
          >
            <Image
              style={{
                width: "100%",
                height: 200,
                borderRadius: 8,
              }}
              source={{
                uri: cover,
              }}
            ></Image>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 15,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 18,
              }}
            >
              Thông tin cá nhân
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("updateDetail");
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#3982E4",
                }}
              >
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 15,
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}
            >
              <Text style={{ fontSize: 16, width: 100, fontWeight: "600" }}>
                Tên hiển thị:
              </Text>
              <Text style={{ fontSize: 16 }}>{info.name}</Text>
            </View>
            <View
              style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}
            >
              <Text style={{ fontSize: 16, width: 100, fontWeight: "600" }}>
                Giới tính:
              </Text>
              <Text style={{ fontSize: 16 }}>
                {info.gender === 0 ? "Nữ" : "Nam"}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontSize: 16, width: 100, fontWeight: "600" }}>
                Ngày sinh:
              </Text>
              <Text style={{ fontSize: 16 }}>{info.birthday}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UpdateProfile;
