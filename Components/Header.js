import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { navigationRef } from "../rootNavigation";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { navigation } from "../rootNavigation";

const HeaderOut = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        height: 40,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          width: "50%",
          fontSize: 25,
          fontWeight: "bold",
          padding: 5,
          color: "#3a7cff",
        }}
      >
        facebook
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "50%",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            //find user navigate
            console.log("log");
          }}
          style={{
            backgroundColor: "#eeeeee",
            padding: 5,
            borderRadius: 100,
          }}
        >
          <Icon name="search" size={27} color="black"></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            //messager navigate
            navigation.navigate("messager");
          }}
          style={{
            backgroundColor: "#eeeeee",
            padding: 5,
            borderRadius: 100,
            marginRight: 10,
            marginLeft: 5,
          }}
        >
          <Icon
            name="facebook-messenger"
            size={27}
            color="black"
            type="material-community"
          ></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Header = () => {
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    const routeName = navigationRef.current?.getCurrentRoute()
      ? navigationRef.current?.getCurrentRoute().name
      : "Home";
    setIsHome(routeName === "Home");
  }, [navigationRef.current?.getCurrentRoute()]);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        paddingTop: StatusBar.currentHeight + 100,
      }}
    >
      {isHome ? <HeaderOut></HeaderOut> : <View></View>}
    </View>
  );
};

export default Header;
