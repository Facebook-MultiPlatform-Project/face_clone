import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Post from "../Components/Post";
import { Icon } from "react-native-elements";
import { navigation } from "../rootNavigation";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <View style={{ paddingVertical: 10 }}>
      <ScrollView>
        <View style={{ position: "relative", backgroundColor: "#fff" }}>
          <View>
            <Image
              style={{ height: 230, width: "100%" }}
              source={{ uri: "https://source.unsplash.com/random?sig=10" }}
            ></Image>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 50,
              left: 10,
              backgroundColor: "#fff",
              borderRadius: 100,
              width: 150,
              height: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 140,
                width: 140,
                borderRadius: 100,
              }}
              source={{ uri: "https://source.unsplash.com/random?sig=10" }}
            ></Image>
          </View>
          <View
            style={{
              marginTop: 50,
              marginBottom: 10,
              paddingHorizontal: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "700" }}>
              Nobita Kirama
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate({ name: "updateProfile" });
              }}
              style={{
                height: 30,
                width: 30,
                borderRadius: 4,
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#3982E4",
              }}
            >
              <Icon name="edit" type="material" color="#fff"></Icon>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: 10,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
        >
          <View>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Bạn bè</Text>
            <Text>244 người bạn</Text>
          </View>
          <View>
            <View
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                flexDirection: "row",
                gap: 10,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((item) => {
                return (
                  <TouchableOpacity>
                    <View
                      style={{
                        marginBottom: 5,
                      }}
                    >
                      <Image
                        style={{ width: 115, height: 115, borderRadius: 10 }}
                        source={{
                          uri: "https://source.unsplash.com/random?sig=10",
                        }}
                      ></Image>
                      <Text
                        style={{
                          marginLeft: 5,
                          marginTop: 5,
                          overflow: "hidden",
                          fontSize: 16,
                          fontWeight: "600",
                        }}
                      >
                        Nobita
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View>
              <TouchableOpacity
                style={{
                  width: "100%",
                  marginTop: 10,
                  paddingVertical: 5,
                  borderRadius: 8,
                  backgroundColor: "#e4e4e4",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  Xem tất cả bạn bè
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Post />
          <Post />
          <Post />
          <Post />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
