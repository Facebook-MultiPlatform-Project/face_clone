import {
    Text,
    View,
    ScrollView,
    TextInput,
    StatusBar,
    TouchableOpacity,
    Button
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { Avatar } from "react-native-paper";
  import { Divider } from "react-native-elements";
  const arr = Array.from({ length: 5 }, (v, i) => i);
  const Friends = () => {
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
        <Text style={{ paddingLeft: 20, fontSize: 30, fontWeight: "bold" }}>
          Friends
        </Text>
        <Divider orientation="horizontal" width={1} />
        <ScrollView style={{ width: "100%" }}>
          <FriendsItems isRead={false} />
        </ScrollView>
      </View>
    );
  };
  
  export default Noti;
  
  const FriendsItems = (avatar, content, isRead) => {
      return (
      <View
        style={{
          backgroundColor: isRead ? 'white':"#BFEAF5",
          display: "flex",
          flexDirection: "row",
          paddingLeft: 20,
          maxWidth: "100%",
        }}
      >
        <Avatar.Image size={70} source={require("../assets/icon.png")} />
  
        <View style={{ width: 30 }}></View>
        <View style={{ display: "flex", flexDirection: "column", flex:1 }}>
          <Text
            style={{ flex: 1, flexWrap: "wrap", maxWidth: "100%", fontSize: 20 }}
            numberOfLines={1}
          >Name
          </Text>
          <View style={{display:'row',}}>
            <Button>Ok</Button>
            <Button>Cancel</Button>
          </View>
          {/* <Text style={{fontSize:12,color:'grey'}}>{isRead?'white':"#BFEAF5"}</Text> */}
  
        </View>
        {/* <View style={{ width: 5 }}></View> */}
      </View>
    );
  };
  