import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar } from "react-native-paper";
import { Divider } from "react-native-elements";
import { FriendApi } from "../apis/Friend/Friend";
import { StatusBar } from "expo-status-bar";
import { navigation } from "../rootNavigation";
import { UserApi } from "../apis/User/UserApi";
import Icon from "react-native-vector-icons/FontAwesome";
const FriendList = () => {
  const [friends, setfriends] = useState([]);

  async function getListFriend() {
    const data = await FriendApi.getListFriend();
    setfriends(data.data.data);
  }

  useEffect(() => {
    getListFriend();
  }, []);
  return (
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
          height: 30,
          borderBottomColor: "black",
          borderBottomWidth: 1,
          paddingLeft: 10,
          // flex:1,
          flexDirection: "row",
          flexWrap: "wrap",
          paddingBottom: 2,
          //   justifyContent:'center',
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          // style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: "bold" }}>
            {"Bạn bè "}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
            {friends.length}
          </Text>
        </View>
      </View>
      <Divider orientation="horizontal" width={1} />
      <ScrollView style={{ width: "100%" }}>
        {friends.map((item) => {
          return (
            <FriendsItems
              avatar={item.avatar}
              name={item.name}
              id={item.id}
              // time={item.createAt}
              callBack={getListFriend}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FriendList;

const FriendsItems = ({ avatar, name, id }) => {
  async function handleUnfriend(id) {
    // const body = {
    //   'id': id,
    // };
    const x = await FriendApi.removeFriend(id);
    callBack();
  }

  async function handleBlock(id) {
    const body = {
      userId: id,
      type: 1,
      // 'isAccept': true,
    };
    const x = await UserApi.setBlock(body);

    // getListFriendRequest();
    callBack();
  }
  return (
    <TouchableOpacity
      style={{
        // backgroundColor: isRead ? "white" : "#BFEAF5",
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
        {/* <AvatarItem avatarUrl={avatar} /> */}
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
              backgroundColor: "#DC3535",
              padding: 10,
              borderRadius: 10,
              width: "50%",
              justifyContent: "center", //Centered horizontally
              alignItems: "center", //Centered vertically
              flex: 1,
            }}
            onPress={() => {
              handleUnfriend(id);
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
              handleBlock(id);
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

// const AvatarItem = ({ avatarUrl, isActive }) => {
//   const [active, setActive] = useState(false);
//   return (
//     <View>
//       <Avatar.Image
//         size={70}
//         source={
//           { uri: avatarUrl }
//           // "https://storage.googleapis.com/facebook-storage.appspot.com/user%2Favatar%2Fdefault.jpg"
//         }
//       />
//       {/* <View
//         style={{
//           borderRadius: 100,
//           backgroundColor: "green",
//           width: 20,
//           height: 20,
//           position: "absolute",
//           bottom: 1,
//           right: 1,
//           // bottom
//           // size:20
//         }}
//       ></View> */}
//     </View>
//   );
// };
