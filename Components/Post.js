import {
  StyleSheet,
  Text,
  View,
  FlatList,
  LogBox,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Icon, Image } from "react-native-elements";
import { useEffect } from "react";
// import ScaleImage from "./Image";

const Post = () => {
  const BASE_URI = "https://source.unsplash.com/random?sig=";
  const [likes, setLikes] = useState(100);
  const [comments, setComments] = useState(200);

  const [full, setFull] = useState(false);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image
            source={{
              uri: "https://source.unsplash.com/random?sig=10",
            }}
            containerStyle={styles.avatar_img}
          ></Image>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: "500" }}>Nobi Nobita</Text>
        </View>
        <View style={{ marginLeft: "auto" }}>
          <Icon name="ellipsis-horizontal" type="ionicon"></Icon>
        </View>
      </View>

      <View style={styles.content}>
        <View style={full ? styles.desc_full : styles.desc_short}>
          <Text>
            Tại trận chung kết, các vận động viên đều đã biểu diễn hết sức mình
            để phô ra những ván bóng đẹp mắt làm hài lòng khán giả. Set đấu đầu
            tiên chỉ chứng kiến sự chênh lệch 2 điểm với chiến thắng nghiêng về
            VĐV Nguyễn Trọng Hiếu. Trong khi đó, VĐV Nguyễn Vũ Tuấn cũng đã
            chứng tỏ bản lĩnh khi vươn lên dẫn trước 2-1 ở set thứ 3. Ở 2 set
            đấu cuối cùng kết quả chia đều cho 2 bên với chiến thắng chung cuộc
            dành cho VĐV Nguyễn Vũ Tuấn.
          </Text>
        </View>
        <SafeAreaView style={{ minHeight: 380, maxHeight: 570 }}>
          <FlatList
            data={[...new Array(4)].map((_, i) => i.toString())}
            // style={}
            scrollEnabled={false}
            numColumns={2}
            keyExtractor={(e) => e}
            renderItem={({ item }) => (
              <Image
                source={{ uri: BASE_URI + item }}
                containerStyle={{
                  aspectRatio: 1,
                  width: "100%",
                  height: 150,
                  flex: 1,
                }}
              />
            )}
          />
        </SafeAreaView>
      </View>
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "500" }}>{likes} likes</Text>
          <Text style={{ fontWeight: "500" }}>{comments} Bình luận</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 5,
          }}
        >
          <TouchableOpacity style={styles.button}>
            <Icon name="thumbs-up" type="font-awesome"></Icon>
            <Text style={{ marginLeft: 10 }}>Thích</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="comment" type="font-awesome"></Icon>
            <Text style={{ marginLeft: 10 }}>Bình luận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    height: 50,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar_img: {
    width: 40,
    height: 40,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: "#bababa",
  },
});
