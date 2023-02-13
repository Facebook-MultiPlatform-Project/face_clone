import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Toolbar from "../Components/Toolbar";
import { UserApi } from "../apis/User/UserApi";

const BlockItem = ({ name, avatar, userId, getBlockList }) => {
  const handleUnblock = async () => {
    try {
      await UserApi.setBlock({ userId, type: 0 });
      await getBlockList();
    } catch (err) {
      console.log(err);
    }
  };
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
              uri: avatar,
            }}
            style={{
              width: 40,
              height: 40,
              marginRight: 10,
            }}
          ></Image>
          <Text>{name}</Text>
        </View>
        <TouchableOpacity
          style={{ borderWidth: 1, borderRadius: 5, borderColor: "#AAA" }}
          onPress={handleUnblock}
        >
          <Text
            style={{
              padding: 5,
              color: "#888",
            }}
          >
            BỎ CHẶN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BlockList = ({ route, navigation }) => {
  const [blockList, setBlockList] = useState([]);
  const getBlockList = async () => {
    await UserApi.getBlock()
      .then((res) => {
        setBlockList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getBlockList();
  }, []);

  return (
    <View style={{ backgroundColor: "#FFF", minHeight: "100%" }}>
      <Toolbar title="Chặn"></Toolbar>
      <View style={{ padding: 10 }}>
        <Text style={{ color: "#000", fontWeight: "600", fontSize: 18 }}>
          Người bị chặn
        </Text>
        <Text
          style={{
            color: "#888",
            fontSize: 14,
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          Một khi bạn đã chặn ai đó, họ sẽ không xem được nội dung bạn tự đăng
          trên dòng thời gian mình, gắn thẻ bạn, mời bạn tham gia sự kiện hoặc
          nhóm, bắt đầu cuộc trò chuyện với bạn hay thêm bạn làm bạn bè. Điều
          này không bao gồm các ứng dụng, trò chơi hay nhóm mà cả bạn và người
          này đều tham gia.
        </Text>
        {blockList.map((item) => (
          <BlockItem
            userId={"d6ac025d-a37d-469f-879c-27feecc65dfb"}
            name={"Luong Hoang"}
            avatar={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU"
            }
            getBlockList={getBlockList}
          />
        ))}
        <BlockItem
          userId={"d6ac025d-a37d-469f-879c-27feecc65dfb"}
          name={"Luong Hoang"}
          avatar={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU"
          }
          getBlockList={getBlockList}
        />
        <BlockItem
          userId={"d6ac025d-a37d-469f-879c-27feecc65dfb"}
          name={"Luong Hoang"}
          avatar={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU"
          }
          getBlockList={getBlockList}
        />
      </View>
      <View style={{ borderBottomColor: "#CCC", borderBottomWidth: 1 }} />
      {blockList.length === 0 && (
        <Text
          style={{
            color: "#888",
            fontSize: 16,
            textAlign: "center",
            paddingTop: 20,
          }}
        >
          Bạn chưa chặn ai.
        </Text>
      )}
    </View>
  );
};

export default BlockList;
