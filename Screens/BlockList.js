import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";

const BlockList = () => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: 40,
          paddingHorizontal: 15,
          paddingBottom: 15,
          borderBottomColor: "#bababa",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontSize: 18,
          }}
        >
          Chặn
        </Text>
      </View>
      <View
        style={{
          padding: 15,
        }}
      >
        <View
          style={{
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Người bị chặn
          </Text>
          <Text
            style={{
              fontSize: 14,
            }}
          >
            Một khi bạn đã chặn ai đó, họ sẽ không xem được nội dung bạn tự đăng
            trên dòng thời gian mình, gắn thẻ bạn, mời bạn tham gia sự kiện hoặc
            nhóm, bắt đầu cuộc trò chuyện với bạn hay thêm bạn làm bạn bè. Điều
            này không bao gồm các ứng dụng, trò chơi hay nhóm mà cả bạn và người
            này đều tham gia.
          </Text>
        </View>
        <ScrollView
          style={{
            borderBottomColor: "#bababa",
            borderBottomWidth: 1,
          }}
        >
          {[1, 2, 3].map((item) => {
            return (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 10,
                  }}
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRtdBb_F-5FEyDOX0h9cz3lBnUb39fNIW8zg&usqp=CAU",
                  }}
                ></Image>
                <Text style={{ fontSize: 16, flex: 1 }}>Nobi Nobita</Text>
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
                  }}
                >
                  <Text style={{ fontSize: 16, color: "#bababa" }}>
                    BỎ CHẶN
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default BlockList;
