import {
  Text,
  View,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const fake_cmt = [
  {
    comment: "acsd",
    userName: "Username",
  },
  {
    comment: "acsd",
    userName: "Username",
  },
  {
    comment: "acsd",
    userName: "Username",
  },
  {
    comment: "acsd",
    userName: "Username",
  },
  {
    comment: "acsd",
    userName: "Username",
  },
  {
    comment: "acsd",
    userName: "Username",
  },
  {
    comment: "acsd",
    userName: "Username",
  },
  {
    comment: "acsd",
    userName: "Username",
  },
  {
    comment: "acsd",
    userName: "Username",
  },
  {
    comment: "acsd",
    userName: "Username",
  },
  {
    comment: "acsd",
    userName: "Username",
  },
  {
    comment: "acsd",
    userName: "Username",
  },
  {
    comment: "acsd",
    userName: "Username",
  },
];

const CommentPage = (props) => {
  const handleSendMeassage = async () => {};

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
        // onPress={onPress}
        >
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "bold", paddingLeft: 20 }}>
          sth
        </Text>
      </View>
      <ScrollView style={{ width: "100%" }}>
        {fake_cmt.map((item) => {
          return (
            <View>
              <CommentBox userName={item.userName} comment={item.comment} />
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
            backgroundColor: "gray",
            width: "90%",
            borderRadius: 50,
            paddingLeft: 10,
          }}
          placeholder="Enter your comment here"
        />
        <TouchableOpacity
        style={{ padding: 5, width: "10%" }}
        // onPress={onPress}
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

// props.author
// props.comment
// props.avatar
// props.Image
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
      <Avatar.Image size={40} source={require("../assets/icon.png")} />

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

// const styles = StyleSheet.create({});

// function MoreLessText({ children, numberOfLines }) {
//     const [isTruncatedText, setIsTruncatedText] = useState(false)
//     const [showMore, setShowMore] = useState(true)

//     return isTruncatedText ? (
//       <>
//         <Text numberOfLines={showMore ? numberOfLines : 0 } style={{maxWidth:'90%'}}>{children}</Text>
//         <Text onPress={() => setShowMore(!showMore)} style={{color:'gray',fontWeight:'bold'}}>
//           {showMore ? 'Read More' : 'Less'}
//         </Text>
//       </>
//     ) : (
//       <Text
//         style={{maxWidth:'90%'}}
//         onTextLayout={(event) => {
//           const { lines } = event.nativeEvent;
//         //   console.log(lines);
//           setIsTruncatedText(lines?.length > numberOfLines)
//         }}
//       >
//         {children}
//       </Text>
//     )
//   }
