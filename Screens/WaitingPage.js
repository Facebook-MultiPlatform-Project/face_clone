import { View, Image } from "react-native";
import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { UserApi } from "../apis/User/UserApi";
import { useDispatch } from "react-redux";
import { navigation } from "../rootNavigation";
import { addUser } from "../store/user";

const WaitingPage = () => {
  const dispatch = useDispatch();

  const getUserProfile = async () => {
    const token = await SecureStore.getItemAsync("acess_token");
    if (!token) {
      navigation.navigate("login");
      return;
    }
    const userId = await SecureStore.getItemAsync("user_id");
    await UserApi.getInfo(userId)
      .then((res) => {
        dispatch(addUser(res.data.data));
        navigation.navigate("facebook");
      })
      .catch((err) => {
        navigation.navigate("login");
      });
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNftsDgRfyE_JqXOUtp1QjGoJTGqrY8oOARA&usqp=CAU",
        }}
        style={{ width: 70, height: 70 }}
      ></Image>
    </View>
  );
};

export default WaitingPage;
