import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, Modal, Portal, Provider } from "react-native-paper";
import { Divider } from "react-native-elements";
import { FriendApi } from "../apis/Friend/Friend";
import { navigation } from "../rootNavigation";
import { UserApi } from "../apis/User/UserApi";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
const FriendList = () => {
  const [showUnfirendModal, setShowUnfriendModal] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [friends, setfriends] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const onRefresh = () => {
    setRefreshing(true);
    getListFriend();
  };
  async function getListFriend() {
    const data = await FriendApi.getListFriend();
    setfriends(data.data.data);
    setRefreshing(false);
  }
  async function handleUnfriend(id) {
    setRefreshing(true);
    const x = await FriendApi.removeFriend(id);
    getListFriend();
    setShowUnfriendModal(false);
  }

  async function handleBlock(id) {
    setRefreshing(true);
    const body = {
      userId: id,
      type: 1,
    };
    const x = await UserApi.setBlock(body);
    getListFriend();
    setShowBlockModal(false);
  }

  useEffect(() => {
    setRefreshing(true);
    getListFriend();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getListFriend();
    }, [])
  );
  return (
    // <Provider>
    <View
      style={{
        width: "100%",
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <View
        className="navi"
        style={{
          width: "100%",
          height: 40,
          borderBottomColor: "black",
          borderBottomWidth: 0.4,
          paddingLeft: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          paddingBottom: 2,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ paddingLeft: 10, fontSize: 30, fontWeight: "bold" }}>
            {"Bạn bè "}
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "red" }}>
            {friends.length}
          </Text>
        </View>
      </View>
      <Divider orientation="horizontal" width={1} />
      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {friends.length > 0 ? (
          friends.map((item) => {
            return (
              <FriendsItems
                avatar={item.avatar}
                name={item.name}
                id={item.id}
                callBack={getListFriend}
                unfriendModal={() => {
                  setSelectedID(item.id);
                  setShowUnfriendModal(true);
                }}
                blockModal={() => {
                  setSelectedID(item.id);
                  setShowBlockModal(true);
                }}
              />
            );
          })
        ) : (
          <Text style={{ paddingLeft: 10, fontSize: 20 }}>
            {"Bạn không có người bạn nào :>"}
          </Text>
        )}
      </ScrollView>
      {/* <Portal> */}
      <Modal
        visible={showUnfirendModal}
        onDismiss={() => {
          setShowUnfriendModal(false);
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
              Bạn có thực sự muốn huỷ kết bạn
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
                  handleUnfriend(selectedID);
                }}
              >
                <Text style={{ color: "white" }}>Tiếp tục</Text>
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
                  setShowUnfriendModal(false);
                }}
              >
                <Text>Huỷ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showBlockModal}
        onDismiss={() => {
          setShowBlockModal(false);
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
              Bạn sẽ không thấy bài viết người bị chặn
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
                  handleBlock(selectedID);
                }}
              >
                <Text style={{ color: "white" }}>Tiếp tục</Text>
              </TouchableOpacity>
              <View style={{ width: 30 }}></View>
              <TouchableOpacity
                style={{
                  // backgroundColor: "#DC3535",
                  backgroundColor: "#d3d3d3",
                  padding: 10,
                  borderRadius: 10,
                  width: "30%",
                  justifyContent: "center", //Centered horizontally
                  alignItems: "center", //Centered vertically
                  flex: 1,
                }}
                onPress={() => {
                  setShowBlockModal(false);
                }}
              >
                <Text>Huỷ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FriendList;

const FriendsItems = ({ avatar, name, id, unfriendModal, blockModal }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        maxWidth: "100%",
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 3,
      }}
      onPress={() => {
        navigation.navigate("profile", {
          userId: id,
        });
      }}
    >
      <View>
        <Avatar.Image
          size={70}
          source={{
            uri: avatar,
          }}
        />
      </View>
      <View style={{ width: 30 }}></View>
      <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              flex: 1,
              flexWrap: "wrap",
              maxWidth: "100%",
              fontSize: 20,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              // backgroundColor: "#DC3535",
              backgroundColor: "#0084FF",
              padding: 10,
              borderRadius: 10,
              width: "50%",
              justifyContent: "center", //Centered horizontally
              alignItems: "center", //Centered vertically
              flex: 1,
            }}
            onPress={() => {
              unfriendModal();
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "white",
              }}
            >
              Huỷ kết bạn
            </Text>
          </TouchableOpacity>
          <View style={{ width: 5 }}></View>
          <TouchableOpacity
            style={{
              backgroundColor: "#d3d3d3",
              padding: 10,
              borderRadius: 10,
              width: "50%",
              justifyContent: "center", //Centered horizontally
              alignItems: "center", //Centered vertically
              flex: 1,
            }}
            onPress={() => {
              // handleBlock(id);
              blockModal();
            }}
          >
            <Text
              style={{
                fontSize: 15,
              }}
            >
              Chặn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
