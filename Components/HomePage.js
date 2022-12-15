import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import Post from "./Post";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { navigation } from "../rootNavigation";

const HomePage = () => {
  return (
    <View>
      <ScrollView
        horizontal={false}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("createpost");
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontWeight: "500",
              fontSize: 15,
            }}
          >
            Create Post
          </Text>
        </TouchableOpacity>

        <Post />
        <Post />
        <Post />
        <Post />
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
