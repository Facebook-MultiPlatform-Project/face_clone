import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  RefreshControl,
  BackHandler,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { logoutApi } from "../apis/Auth/logoutApi";
import { UserApi } from "../apis/User/UserApi";
import { navigation } from "../rootNavigation";
import { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

const Shortcut = (props) => {
  const { name, des, iconName, iconType } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(des);
      }}
      style={{ width: "50%" }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 16,
          margin: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onTouchEnd={() => {
          if (name === "Friends") navigation.navigate(des);
        }}
      >
        <Icon name={iconName} type={iconType} size={25} color="#06f"></Icon>
        <Text
          style={{
            color: "#333",
            fontWeight: "600",
            fontSize: 18,
            marginTop: 8,
          }}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Menu = () => {
  const [user, setUser] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModalExit, setShowModalExit] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getUserInfo();
    // if (userId === user.id) {
    //   getListFriend();
    // }
  };

  const getUserInfo = async () => {
    try {
      const data = await UserApi.getProfile();
      setUser(data.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  const handleLogOut = async () => {
    try {
      await logoutApi.logout();
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("refresh_token");
      navigation.navigate("login");
    } catch (err) {
      console.log(err);
    } finally {
      setShowModal(false);
    }
  };
  return (
    <ScrollView
      style={{ padding: 16, height: "100%" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <Text style={{ color: "#000", fontWeight: "700", fontSize: 30 }}>
          Menu
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 10,
          alignItems: "center",
        }}
        onTouchEnd={() =>
          navigation.navigate("profile", { userId: user && user.id })
        }
      >
        <View>
          <Image
            source={{
              uri: user && user.avatar,
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              marginRight: 10,
            }}
          ></Image>
        </View>
        <View>
          <Text style={{ color: "#333", fontWeight: "600", fontSize: 24 }}>
            {user && user.name}
          </Text>
          <Text style={{ color: "#777", fontWeight: "600", fontSize: 18 }}>
            See your profile
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: "#aaa",
          borderBottomWidth: 1,
          marginTop: 10,
          marginBottom: 10,
        }}
      />
      <View>
        <Text
          style={{
            color: "#333",
            fontWeight: "600",
            fontSize: 24,
            marginBottom: 10,
          }}
        >
          All shortcuts
        </Text>
      </View>
      <View style={{ display: "flex" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Shortcut
            name="Friends"
            iconName="user-friends"
            iconType="font-awesome-5"
            des="friendList"
          ></Shortcut>
          <Shortcut
            name="Shortcut 2"
            iconName="user-friends"
            iconType="font-awesome-5"
          ></Shortcut>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Shortcut
            name="Shortcut 3"
            iconName="user-friends"
            iconType="font-awesome-5"
          ></Shortcut>
          <Shortcut
            name="Shortcut 4"
            iconName="user-friends"
            iconType="font-awesome-5"
          ></Shortcut>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#ccc", borderRadius: 10, padding: 10 }}
            onPress={() => navigation.navigate("blockList")}
          >
            <Text
              style={{
                color: "#333",
                fontWeight: "600",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Block list
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#ccc", borderRadius: 10, padding: 10 }}
            onPress={() => navigation.navigate("changePassword")}
          >
            <Text
              style={{
                color: "#333",
                fontWeight: "600",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Change password
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#ccc", borderRadius: 10, padding: 10 }}
            onPress={() => {
              setShowModal(true);
            }}
          >
            <Text
              style={{
                color: "#333",
                fontWeight: "600",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Log out
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#ccc", borderRadius: 10, padding: 10 }}
            onPress={() => {
              setShowModalExit(true);
            }}
          >
            <Text
              style={{
                color: "#333",
                fontWeight: "600",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Exit app
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={showModal}
        transparent
        onDismiss={() => {
          setShowModal(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // width: windowWidth / 1.05,
            // height: windowHeight / 5,
            // backgroundColor:'red'
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              borderRadius: 10,
              backgroundColor: "white",
              width: windowWidth / 1.05,
              height: windowHeight / 5,
              display: "flex",
              flexDirection: "column",
              padding: 15,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>
              Bạn có muốn đăng xuất
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // padding: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  // backgroundColor: "#DC3535",
                  backgroundColor: "#0084FF",
                  borderRadius: 10,
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
                onPress={handleLogOut}
              >
                <Text style={{ color: "white" }}>Đăng xuất</Text>
              </TouchableOpacity>
              <View style={{ width: 30 }}></View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#d3d3d3",
                  padding: 10,
                  borderRadius: 10,
                  width: "30%",
                  justifyContent: "center", //Centered horizontally
                  alignItems: "center", //Centered vertically
                  flex: 1,
                }}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <Text>Huỷ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showModalExit}
        transparent
        onDismiss={() => {
          setShowModalExit(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              borderRadius: 10,
              backgroundColor: "white",
              width: windowWidth / 1.05,
              height: windowHeight / 5,
              display: "flex",
              flexDirection: "column",
              padding: 15,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>
              Bạn có muốn đóng ứng dụng
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // padding: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  // backgroundColor: "#DC3535",
                  backgroundColor: "#0084FF",
                  borderRadius: 10,
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
                onPress={() => {
                  BackHandler.exitApp();
                  setShowModalExit(false);
                  navigation.navigate("waiting", { reset: true });
                }}
              >
                <Text style={{ color: "white" }}>Exit</Text>
              </TouchableOpacity>
              <View style={{ width: 30 }}></View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#d3d3d3",
                  padding: 10,
                  borderRadius: 10,
                  width: "30%",
                  justifyContent: "center", //Centered horizontally
                  alignItems: "center", //Centered vertically
                  flex: 1,
                }}
                onPress={() => {
                  setShowModalExit(false);
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Menu;
