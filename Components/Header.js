import { StyleSheet, Text, View, StatusBar } from "react-native";
import { navigationRef } from "../rootNavigation";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [isHome, setIsHome] = useState(true);
  useEffect(() => {
    const routeName = navigationRef.current?.getCurrentRoute()
      ? navigationRef.current?.getCurrentRoute().name
      : "Home";
    setIsHome(routeName === "Home");
  }, [navigationRef.current?.getCurrentRoute()]);

  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      {isHome ? (
        <View>
          <Text>làm cái quần què gì đó cho home page cũng được</Text>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Header;
