import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const UpdateProfile = () => {
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
          Chỉnh sửa trang cá nhân
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            paddingVertical: 15,
            borderBottomColor: "#bababa",
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 18,
              }}
            >
              Ảnh đại diện
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  color: "#3982E4",
                }}
              >
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Image
              style={{
                width: 150,
                height: 150,
                borderRadius: 150,
              }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRtdBb_F-5FEyDOX0h9cz3lBnUb39fNIW8zg&usqp=CAU",
              }}
            ></Image>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 15,
            borderBottomColor: "#bababa",
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 18,
              }}
            >
              Ảnh bìa
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  color: "#3982E4",
                }}
              >
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 15,
            }}
          >
            <Image
              style={{
                width: "100%",
                height: 200,
                borderRadius: 8,
              }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRtdBb_F-5FEyDOX0h9cz3lBnUb39fNIW8zg&usqp=CAU",
              }}
            ></Image>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 15,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 18,
              }}
            >
              Thông tin cá nhân
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  color: "#3982E4",
                }}
              >
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 15,
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}
            >
              <Text style={{ fontSize: 16, width: 100, fontWeight: "600" }}>
                Tên hiển thị:
              </Text>
              <Text style={{ fontSize: 16 }}>Nobi Nobita</Text>
            </View>
            <View
              style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}
            >
              <Text style={{ fontSize: 16, width: 100, fontWeight: "600" }}>
                Giới tính:
              </Text>
              <Text style={{ fontSize: 16 }}>Nam</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontSize: 16, width: 100, fontWeight: "600" }}>
                Ngày sinh:
              </Text>
              <Text style={{ fontSize: 16 }}>01/01/2001</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UpdateProfile;
