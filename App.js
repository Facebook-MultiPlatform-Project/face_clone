import { StyleSheet, View, Text } from "react-native";
import CreatePost from "./Screens/CreatePost.js";
import LoginPage from "./Screens/LoginPage.js";
import SignupPage from "./Screens/SignupPage.js";
import * as React from "react";

import { Icon, Badge } from "react-native-elements";

import { navigationRef } from "./rootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Header from "./Components/Header";
import VerifyEmail from "./Screens/VerifyEmail.js";
import HomePage from "./Components/HomePage.js";
import Profile from "./Screens/Profile.js";
import UpdateProfile from "./Screens/UpdateProfile.js";
import BlockList from "./Screens/BlockList.js";
import Notifications from "./Screens/Notifications.js";
import Friends from "./Screens/Friends.js";
import FriendList from "./Screens/FriendList.js";
import Messager from "./Screens/Messager.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Menu from "./Screens/Menu.js";
import CommentPage from "./Screens/Comments.js";
import { useEffect } from "react";
import UpdateDetail from "./Screens/updateDetail";
import ListEmoji from "./Screens/ListEmoji.js";
import { io } from "socket.io-client";
import * as SecureStore from "expo-secure-store";
import { useRef } from "react";
import WaitingPage from "./Screens/WaitingPage.js";
import Search from "./Screens/Search.js";
import Chat from "./Screens/Chat.js";
import { useState } from "react";
import { NotificationApi } from "./apis/Notification/notificationApi.js";
const Stack = createStackNavigator();
const rootStack = createStackNavigator();
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
const Home = () => {
  return (
    <View>
      <HomePage />
    </View>
  );
};
const HomeTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
const FriendTab = () => {
  // return (
  //   <View>
  //     <Text>friendTab</Text>
  //   </View>
  // );
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Friends" component={Friends} />
    </Stack.Navigator>
  );
};
const ProfileTab = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};
const MessengerTab = () => {
  return (
    <View>
      <Text>messengerTab</Text>
    </View>
    // <Stack.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //   }}
    // >
    //   <Stack.Screen name="comment" component={CommentPage} />
    // </Stack.Navigator>
  );
};
const NotificationTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Notification" component={Notifications} />
    </Stack.Navigator>
  );
};
const MenuTab = () => {
  return (
    <View>
      <Menu />
    </View>
  );
};
const Tab = createMaterialTopTabNavigator();
export const MainTab = () => {
  const mainTabNavigationOptions = {
    tabBarStyle: {
      height: 60,
    },
    tabBarShowIcon: true,
    tabBarShowLabel: false,
  };

  const [numOfNotification, setNumOfNotification] = useState(0);
  const [unreadNotificationList, setUnreadNotificationList] = useState([]);
  var access_token = "";
  var socket;
  const setupSocket = async () => {
    try {
      access_token = await SecureStore.getItemAsync("access_token");
      socket = io("https://facebook-api-production.up.railway.app", {
        extraHeaders: {
          Authorization: access_token,
        },
      });
      socket.on("connect", () => {
        console.log("socket connected");
      });
      socket.on("disconnect", () => {
        console.log("socket disconnected");
      });
      socket.on("notification", (notification) => {
        setNumOfNotification((value) => value + 1);
        console.log("socket notification", notification);
      });
      socket.on("error", (err) => {
        console.log("socket error", err);
      });
    } catch (err) {
      console.log("setup socket", err);
    }
  };
  const getUnreadNotification = async () => {
    try {
      const data = await NotificationApi.getAll();
      const list = data.data.data.filter(
        (item) => Boolean(item.read) === false
      );
      setUnreadNotificationList(list);
      setNumOfNotification(list.length);
    } catch (err) {
      console.log("get notification", err);
    }
  };
  const readNotification = async () => {
    try {
      console.log({
        notificationIds: unreadNotificationList.map((item) => item.id),
      });
      await NotificationApi.read({
        notificationIds: unreadNotificationList.map((item) => item.id),
      });
      setUnreadNotificationList([]);
      setNumOfNotification(0);
    } catch (err) {
      console.log("read notification", err.response.data.message);
    }
  };
  useEffect(() => {
    getUnreadNotification();
    setupSocket();
    return () => {
      socket.off("connect");
      socket.off("error");
      socket.off("notification");
    };
  }, []);
  return (
    <>
      <Header></Header>
      <Tab.Navigator
        initialRouteName="HomeTab"
        screenOptions={mainTabNavigationOptions}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="home"
                size={25}
                color={focused ? "#318bfb" : "#ddd"}
              ></Icon>
            ),
          }}
          name="HomeTab"
          component={HomeTab}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ tintColor, focused }) => (
              <View>
                <Icon
                  name="group"
                  size={25}
                  color={focused ? "#318bfb" : "#ddd"}
                ></Icon>
                {/* {numOfFriendRequest.current > 0 && (
                  <Badge
                    value={numOfFriendRequest.current}
                    status="error"
                    containerStyle={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                    }}
                  />
                )} */}
              </View>
            ),
            headerShown: true,
          }}
          name="Friend"
          component={Friends}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ tintColor, focused }) => (
              <View>
                <Icon
                  name="notifications"
                  size={25}
                  color={focused ? "#318bfb" : "#ddd"}
                ></Icon>
                {numOfNotification > 0 && (
                  <Badge
                    value={numOfNotification}
                    status="error"
                    containerStyle={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                    }}
                  />
                )}
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            focus: async (e) => {
              await readNotification();
            },
          })}
          name="Notifications"
          component={NotificationTab}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="menu"
                size={25}
                color={focused ? "#318bfb" : "#ddd"}
              ></Icon>
            ),
          }}
          name="Menu"
          component={MenuTab}
        />
      </Tab.Navigator>
    </>
  );
};

export default function App() {
  const navigationOptions = {
    headerShown: false,
    headerMode: "screen",
  };
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <rootStack.Navigator screenOptions={navigationOptions}>
          <rootStack.Screen component={WaitingPage} name="waiting" />
          <rootStack.Screen component={LoginPage} name="login" />
          <rootStack.Screen component={VerifyEmail} name="verify" />
          <rootStack.Screen component={MainTab} name="facebook" />
          <rootStack.Screen component={ProfileTab} name="pro" />
          <rootStack.Screen component={Profile} name="profile" />
          <rootStack.Screen component={SignupPage} name="signup" />
          <rootStack.Screen component={CreatePost} name="createPost" />
          <rootStack.Screen component={BlockList} name="blockList" />
          <rootStack.Screen component={UpdateProfile} name="updateProfile" />
          <rootStack.Screen component={CommentPage} name="comment" />
          <rootStack.Screen component={UpdateDetail} name="updateDetail" />
          <rootStack.Screen component={ListEmoji} name="listEmoji" />
          <rootStack.Screen component={Messager} name="messager" />
          <rootStack.Screen component={FriendList} name="friendList" />
          <rootStack.Screen component={Search} name="search" />
          <rootStack.Screen component={Chat} name="chat" />
        </rootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
