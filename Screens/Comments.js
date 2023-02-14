import {
  Text,
  View,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAllComment } from "../apis/Comment/getComment";
import { postComment } from "../apis/Comment/postComment";
import { Keyboard } from "react-native";
import { navigation } from "../rootNavigation";


const CommentPage = ({ postID = "f46c9a93-0a9b-4133-8a1d-9e4e8115aa72" }) => {
  // postID = "f46c9a93-0a9b-4133-8a1d-9e4e8115aa72";
  const [data, setData] = useState([]);
  const [numComments, setNumComments] = useState(data.length);
  const [cmt, setCmt] = useState("");

  const scrollRef = useRef();

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const param = {
    postId: postID,
    take: 100,
    skip: 0,
  };

  async function getData() {
    const res = await getAllComment.post(param);
    setData(res.data.data);
    setNumComments(res.data.data.length);
  }
  const handleSendMeassage = async (e) => {
    if (cmt === "") return;
    const param = {
      postId: postID,
      content: cmt,
      commentAnsweredId: "c75cdf4c-173a-4c19-bfea-d2bf1494de07",
    };
    console.log(param);
    const res = await postComment.post(param);
    console.log(res);
    getData();
    setCmt("");
    Keyboard.dismiss();
    onPressTouch();
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log(cmt);
  }, [cmt]);
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
        <Text style={{ fontSize: 18, fontWeight: "bold", paddingLeft: 20 }}>
          {numComments + " bình luận"}
          </Text>
        </View>
      <ScrollView style={{ width: "100%" }} ref={scrollRef}>
        {data?.map((item) => {
          return (
            <View>
              <CommentBox
                userName={item.user.name}
                comment={item.content}
                avatar={item.user.avatar}
              />
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          width: "100%",
          padding: 3,
          flexDirection: "row",
          flexWrap: "wrap",
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
          placeholder="Enter your comment here"
          onChangeText={(text) => {
            console.log(text);
            setCmt(text);
          }}
          value={cmt}
        />
        <TouchableOpacity
          style={{ padding: 5, width: "10%" }}
          onPress={handleSendMeassage}
        >
          <Icon
            name="send"
            size={30}
            color="#4267B2"
            // style={{ padding: 5, width: "10%" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentPage;

const CommentBox = (props) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        maxWidth: "90%",
        paddingBottom: 10,
        marginLeft: 10,
      }}
    >
      <Avatar.Image size={40} source={{ uri: props.avatar }} />

      <View
        style={{
          marginLeft: 10,
          backgroundColor: "#E9EBEE",
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          maxWidth: "100%",
          borderRadius: 30,
        }}
      >
        <Text style={{ fontWeight: "bold", paddingRight: 10 }}>
          {props.userName}
        </Text>
        <Text style={{ flex: 1, flexWrap: "wrap", maxWidth: "100%" }}>
          {props.comment}
        </Text>
      </View>
    </View>
  );
};
