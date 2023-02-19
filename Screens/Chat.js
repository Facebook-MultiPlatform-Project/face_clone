import React, { useState, useEffect, useRef } from "react";
import { TextInput } from "react-native";
import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Keyboard,
} from "react-native";
import { Icon } from "react-native-elements";
import ChatItem from "../Components/ChatItem";
import { navigation } from "../rootNavigation";
import { MessageApi } from "../apis/Message/messageApi";
import { useSelector } from "react-redux";
import socketClient from "../utils/socketClient";

const Chat = ({ route, navigation }) => {
  const otherId = route.params.otherId || null;

  const user = useSelector((state) => state.user.user);
  const userid = user.id || "ceb34d32-6634-4f3c-bb40-dd44825a8f26";

  const [listMess, setListMess] = useState([]);
  const [message, setMess] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [otherInfo, setOtherInfo] = useState(null);

  const scrollRef = useRef();
  var arr = [];

  useEffect(() => {
    if (otherId) {
      createRoomChat();
    } else {
      navigation.goBack();
    }
  }, []);

  useEffect(() => {
    socketClient.on("new-message", (messobj) => {
      let clone = [...listMess];
      setListMess(clone.concat(messobj));
      onPressTouch();
      return ()=>{
        socketClient.off("new-message");
      }
    });
  }, [listMess]);

  const createRoomChat = async () => {
    try {
      const res = await MessageApi.creatRoom(otherId);
      if (res.data.data.id) {
        setRoomId(res.data.data.id);
        socketClient.emit("join-room", { roomId: res.data.data.id });
        socketClient.emit("request-join-room", {
          roomId: res.data.data.id,
          userId: otherId,
        });
      }

      if (!res.data.success && res.data.data.id) {
        await getListMess(res.data.data.id);
      }
      if (res.data.data.users) {
        getOtherInfo(res.data.data.users);
      }
    } catch (error) {}
  };
  const getListMess = async (roomId) => {
    try {
      const res = await MessageApi.getMessages(roomId);
      setListMess(res.data.data.reverse());
    } catch (error) {}
    onPressTouch();
  };
  const getOtherInfo = (users) => {
    if (users[0].id === userid) {
      setOtherInfo(users[1]);
    } else setOtherInfo(users[0]);
  };

  const onPressTouch = () => {
    scrollRef.current?.scrollToEnd({
      animated: true,
    });
  };

  const handleSendMeassage = () => {
    if (message && message.length > 0) {
      socketClient.emit("send-message", { roomId, message });
      arr = [...listMess];
      setMess("");
      Keyboard.dismiss();
    }
  };
  return (
    <View
      style={{
        paddingTop: StatusBar.currentHeight,
        flex: 1,
      }}
    >
      {/* header chat */}
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
          borderBottomColor: "#bababa",
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            width: "80%",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrow-back" size={25} color="#c90076"></Icon>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginLeft: 5,
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                marginTop: 5,
                marginLeft: 7,
                marginRight: 3,
              }}
            >
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                }}
                source={{ uri: otherInfo && otherInfo.avatar }}
              ></Image>
              <View
                style={{
                  position: "absolute",
                  width: 15,
                  height: 15,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  bottom: 3,
                  right: 3,
                  borderRadius: 100,
                }}
              >
                <View
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: "green",
                    borderRadius: 100,
                  }}
                ></View>
              </View>
            </View>
            <View
              style={{
                width: "70%",
                marginTop: 5,
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: "black",
                  fontWeight: "bold",
                  position: "absolute",
                  top: 5,
                }}
              >
                {otherInfo && otherInfo.name}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#5b5b5b",
                  fontWeight: "300",
                  position: "absolute",
                  bottom: 10,
                }}
              >
                Active
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "20%",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              //messager navigate
              navigation.navigate("messager");
            }}
          >
            <Icon name="info" size={30} color="#c90076"></Icon>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ width: "100%", marginBottom: 20 }} ref={scrollRef}>
        <View style={{ alignItems: "center", marginTop: 10, marginBottom: 30 }}>
          <TouchableOpacity
            style={{
              width: 200,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 20,
              backgroundColor: "#dadada",
            }}
            onPress={() => {
              navigation.navigate("profile", { userId: 123 });
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: "500" }}>
              XEM TRANG CÁ NHÂN
            </Text>
          </TouchableOpacity>
        </View>
        {listMess?.map((item, index) => {
          return (
            <ChatItem
              itemPrev={index === 0 ? null : listMess[index - 1]}
              item={item}
              itemNext={index === listMess.length ? null : listMess[index + 1]}
              key={item.id}
              otherUri={otherInfo && otherInfo.avatar}
            ></ChatItem>
          );
        })}
      </ScrollView>
      <View
        style={{
          width: "100%",
          padding: 3,
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        <TextInput
          style={{
            backgroundColor: "#dadada",
            width: "90%",
            borderRadius: 50,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          placeholder="Nhắn tin"
          onChangeText={(text) => {
            setMess(text);
          }}
          value={message}
        />
        <TouchableOpacity
          style={{ padding: 5, width: "10%" }}
          onPress={handleSendMeassage}
        >
          <Icon name="send" size={30} color="#4267B2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
