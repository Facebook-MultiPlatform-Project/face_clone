import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import { navigation } from "../rootNavigation";
import OnlineItem from "../Components/OnlineItem";
import RoomItem from "../Components/RoomItem";
import { MessageApi } from "../apis/Message/messageApi";
import socketClient from "../utils/socketClient";

const online = [
  {
    id: 1,
    uri: "https://source.unsplash.com/random?sig=10",
    name: "nobita kirama",
  },
  {
    id: 2,
    uri: "https://source.unsplash.com/random?sig=10",
    name: "nghĩa đần",
  },
  {
    id: 7,
    uri: "https://source.unsplash.com/random?sig=10",
    name: "haha haha",
  },
  {
    id: 3,
    uri: "https://source.unsplash.com/random?sig=10",
    name: "haha haha",
  },
  {
    id: 4,
    uri: "https://source.unsplash.com/random?sig=10",
    name: "haha haha",
  },
  {
    id: 5,
    uri: "https://source.unsplash.com/random?sig=10",
    name: "haha haha",
  },
  {
    id: 6,
    uri: "https://source.unsplash.com/random?sig=10",
    name: "haha haha",
  },
];

const Messager = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);

  const [listRoom, setListRoom] = useState([]);

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      getListRoom();
    });
    return focusHandler;
  }, [navigation]);

  useEffect(() => {
    socketClient.on("new-message", (messobj) => {
      getListRoom();
    });
    return () => {
      socketClient.off("new-message");
    };
  }, [navigation]);

  useEffect(() => {
    socketClient.on("receive-join-room", (roomdto) => {
      socketClient.emit('join-room',{roomId: roomdto.roomId})
      getListRoom()
    });
    return () => {
      socketClient.off("receive-join-room");
    };
  }, [navigation]);

  const getListRoom = async () => {
    try {
      const res = await MessageApi.listRoom();
      setListRoom(res.data.data);
    } catch (error) {}
  };
  return (
    <View style={{ paddingTop: StatusBar.currentHeight }}>
      <View
        style={{
          width: "100%",
          height: 70,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          marginBottom: 5,
          paddingBottom: 5,
        }}
      >
        <View
          style={{
            width: "50%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              backgroundColor: "#dadada",
              padding: 5,
              borderRadius: 100,
              marginRight: 10,
            }}
          >
            <Icon name="arrow-back" size={22} color="black"></Icon>
          </TouchableOpacity>
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>Đoạn chat</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "50%",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              //find user navigate
              console.log("log");
            }}
            style={{
              backgroundColor: "#dadada",
              padding: 5,
              borderRadius: 100,
            }}
          >
            <Icon name="photo-camera" size={27} color="black"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              //messager navigate
              navigation.navigate("messager");
            }}
            style={{
              backgroundColor: "#dadada",
              padding: 5,
              borderRadius: 100,
              marginLeft: 10,
            }}
          >
            <Icon name="pencil" size={26} color="black" type="ionicon"></Icon>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("search", { redirectFromMess: true});
          }}
          style={{
            backgroundColor: "#e2e2e2",
            height: 40,
            width: "90%",
            alignSelf: "center",
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
        >
          <Icon
            type="material"
            name="search"
            style={{ marginRight: 5 }}
            color="#bcbcbc"
          ></Icon>
          <Text style={{ color: "#bcbcbc" }}>Tìm kiếm</Text>
        </TouchableOpacity>
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            width: "100%",
            flexDirection: "row",
            overflow: "scroll",
            paddingHorizontal: 10,
          }}
        >
          {online &&
            online.map((item) => (
              <OnlineItem item={item} key={item.id}></OnlineItem>
            ))}
        </ScrollView>
        <View style={{ marginBottom: 100 }}>
          {listRoom &&
            listRoom.map((item) => (
              <RoomItem item={item} key={item.id}></RoomItem>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Messager;
