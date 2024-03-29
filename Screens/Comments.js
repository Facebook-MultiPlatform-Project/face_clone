import {
  Text,
  View,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAllComment } from "../apis/Comment/getComment";
import { postComment } from "../apis/Comment/postComment";
import { Keyboard } from "react-native";
import { getTimeDisplay, timeSince } from "../utils/index";
import socketClient from "../utils/socketClient";

// import Dât
const CommentPage = ({ route, navigation }) => {
  const postID = route.params.postId;
  const [data, setData] = useState([]);
  const [numComments, setNumComments] = useState(data.length);
  const [cmt, setCmt] = useState("");
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef();

  const onRefresh = () => {
    setData([]);
    setPage(1);
    getData(page);
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentSizeHeight = event.nativeEvent.contentSize.height;
    const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
    const threshold = 0.5;
    if (offsetY + layoutMeasurementHeight >= contentSizeHeight * threshold) {
      handleLoadMore();
    }
  };
  const handleLoadMore = () => {
    if (!isLoading) {
      setIsLoading(true);
      setPage(page + 1);
      getData(page);
      setIsLoading(false)
    }
  };
  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  
  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      );
    } else {
      return null;
    }
  };
  async function getData(page) {
    const param = {
      postId: postID,
      take: 10*page,
      skip: 0,
    };
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
    postComment
      .post(param)
      .then((res) => {
        socketClient.emit("comment", {
          postId: postID,
          commentId: res.data.data.id,
        });
      })
      .catch((e) => console.log(e));
    // console.log(res);
    getData(page);
    setCmt("");
    Keyboard.dismiss();
    onPressTouch();
  };

  useEffect(() => {
    getData(page);
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
      <ScrollView
        style={{ width: "100%" }}
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
      >
        {data?.map((item) => {
          return (
            <View>
              <CommentBox
                userName={item.user.name}
                comment={item.content}
                avatar={item.user.avatar}
                time={item.createdAt}
              />
            </View>
          );
        })}
        {renderFooter()}
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
        <Text style={{ paddingRight: 10, fontSize: 10, opacity: 0.5 }}>
          {getTimeDisplay(props.time)}
        </Text>
        {/* {console.log(props)} */}
        <Text style={{ flex: 1, flexWrap: "wrap", maxWidth: "100%" }}>
          {props.comment}
        </Text>
      </View>
    </View>
  );
};
