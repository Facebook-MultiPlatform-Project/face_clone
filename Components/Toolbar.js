import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { navigation } from "../rootNavigation";

const Toolbar = ({ title }) => {
  return (
    <View>
      <View
        style={{
          paddingTop: 30,
          height: 90,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ paddingLeft: 10 }}
        >
          <Icon type="material" name="arrow-back"></Icon>
        </TouchableOpacity>
        <Text style={{ color: "#000", fontWeight: "600", fontSize: 18 }}>
          {title}
        </Text>
        <TouchableOpacity style={{ paddingRight: 10, opacity: 0 }}>
          <Icon type="material" name="arrow-back"></Icon>
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomColor: "#CCC", borderBottomWidth: 1 }} />
    </View>
  );
};

export default Toolbar;
