import {
  Text,
  View,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar } from "react-native-paper";
import { Divider } from "react-native-elements";
import { FriendApi } from "../apis/Friend/Friend";
import { getTimeDisplay } from "../utils";
import { navigation } from "../rootNavigation";
import { useFocusEffect } from "@react-navigation/native";
import socketClient from "../utils/socketClient";

const Friends = () => {
  const [friendsRequests, setFriendsRequests] = useState([]);

  async function getListFriendRequest() {
    const data = await FriendApi.getRequestFriend();
    setFriendsRequests(data.data.data);
  }
  useEffect(() => {
    getListFriendRequest();
  }, []);
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        // backgroundColor:'red',
        paddingTop: StatusBar.currentHeight,
      }}
    >
      {/* <Text>hello</Text> */}
      {console.log()}
      <Text style={{ paddingLeft: 20, fontSize: 30, fontWeight: "bold" }}>
        Bạn bè
      </Text>
      <Divider orientation="horizontal" width={1} />
      <ScrollView style={{ width: "100%" }}>
        {/* <FriendsItems />
        <FriendsItems /> */}
        {friendsRequests.map((item) => {
          
          return <FriendsItems avatar={item.avatar} name={item.name} />;
        })}
      </ScrollView>
    </View>
  );
};

export default Friends;

const FriendsItems = ({ avatar, name, id, time, callBack }) => {
  async function handleAccept(id) {
    const body = {
      id: id,
      isAccept: true,
    };
    socketClient.emit("accept-friend", {
      userId: id,
      requestId: "1",
    });
    const x = await FriendApi.setAccept(body);
    callBack();
  }

  async function handleDecline(id) {
    const x = await FriendApi.cancelRequest(id);

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
    >
      <View>
        {/* <Avatar.Image
          size={70}
          source={{
            uri: avatar,
          }}
        /> */}
        <AvatarItem avatarUrl={avatar} />
        <View
          style={{
            borderRadius: 100,
            backgroundColor: "green",
            width: 20,
            height: 20,
            position: "absolute",
            bottom: 1,
            right: 1,
            // bottom
            // size:20
          }}
        ></View>
      </View>
      <View style={{ width: 30 }}></View>
      <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Text
          style={{ flex: 1, flexWrap: "wrap", maxWidth: "100%", fontSize: 20 }}
          numberOfLines={1}
        >
          {name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#0084FF",
              padding: 10,
              borderRadius: 10,
              width: "50%",
              justifyContent: "center", //Centered horizontally
              alignItems: "center", //Centered vertically
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "white",
              }}
            >
              Accept
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
          >
            <Text
              style={{
                fontSize: 15,
              }}
            >
              Decline
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={{fontSize:12,color:'grey'}}>{isRead?'white':"#BFEAF5"}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const AvatarItem = ({ avatarUrl, isActive }) => {
  const [active, setActive] = useState(false);
  return (
    <View>
      <Avatar.Image
        size={70}
        source={
          { uri: avatarUrl }
          // "https://storage.googleapis.com/facebook-storage.appspot.com/user%2Favatar%2Fdefault.jpg"
        }
      />
      <View
        style={{
          borderRadius: 100,
          backgroundColor: "green",
          width: 20,
          height: 20,
          position: "absolute",
          bottom: 1,
          right: 1,
          // bottom
          // size:20
        }}
      ></View>
    </View>
  );
};
