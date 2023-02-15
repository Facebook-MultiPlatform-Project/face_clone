import { View, Text, TouchableOpacity, Image } from "react-native";
import * as SecureStore from "expo-secure-store";
import { logoutApi } from "../apis/Auth/logoutApi";
import { UserApi } from "../apis/User/UserApi";
import { navigation } from "../rootNavigation";
import { useEffect, useState } from "react";
import { Icon } from "react-native-elements";

const Shortcut = (props) => {
  const { name, des, iconName, iconType } = props;
  return (
    <View style={{ width: "50%" }}>
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
    </View>
  );
};

const Menu = () => {
  const [user, setUser] = useState();
  const getUserInfo = async () => {
    try {
      const data = await UserApi.getProfile();
      setUser(data.data.data);
    } catch (err) {
      console.log(err);
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
    }
  };
  return (
    <View style={{ padding: 16 }}>
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
            onPress={handleLogOut}
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
      </View>
    </View>
  );
};

export default Menu;
