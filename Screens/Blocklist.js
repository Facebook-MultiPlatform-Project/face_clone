import { useState } from "react";
import { View, Text, Image } from "react-native";
import Toolbar from "../Components/Toolbar";

const BlockItem = (props) => {
  const { name, avatar } = props;
  return (
    <View>
      <View style={{ borderBottomColor: "#CCC", borderBottomWidth: 1 }} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 5,
          paddingTop: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU",
            }}
            style={{
              width: 40,
              height: 40,
              marginRight: 10,
            }}
          ></Image>
          <Text>Luong Hoang</Text>
        </View>
        <Text
          style={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 5,
            borderColor: "#AAA",
            color: "#888",
          }}
        >
          Unblock
        </Text>
      </View>
    </View>
  );
};

const Blocklist = () => {
  const [blocklist, setBlocklist] = useState([]);

  return (
    <View style={{ backgroundColor: "#FFF", minHeight: "100%" }}>
      <Toolbar title="Blocking"></Toolbar>
      <View style={{ padding: 10 }}>
        <Text style={{ color: "#000", fontWeight: "600", fontSize: 18 }}>
          Blocked People
        </Text>
        <Text
          style={{
            color: "#888",
            fontSize: 14,
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          Once you block someone, that person can no longer see things you post
          on your Timeline, tag you, invite you to events or groups, start a
          conversation with you, or add you as a friend. This doesn't include
          apps, games or groups you both participate in.
        </Text>
        <BlockItem />
        <BlockItem />
        <BlockItem />
      </View>
      <View style={{ borderBottomColor: "#CCC", borderBottomWidth: 1 }} />
      {blocklist.length === 0 && (
        <Text
          style={{
            color: "#888",
            fontSize: 16,
            textAlign: "center",
            paddingTop: 20,
          }}
        >
          You haven't blocked anyone yet.
        </Text>
      )}
    </View>
  );
};

export default Blocklist;
