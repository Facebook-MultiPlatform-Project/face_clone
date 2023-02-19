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
import Messager from "./Screens/Messager.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Menu from "./Screens/Menu.js";
import CommentPage from "./Screens/Comments.js";
import { useEffect } from "react";
import UpdateDetail from "./Screens/updateDetail";
import Notifications from "./Screens/Notifications.js";
import { io } from "socket.io-client";
import * as SecureStore from "expo-secure-store";
import ListEmoji from "./Screens/ListEmoji.js";
import { useRef } from "react";
const Stack = createStackNavigator();
const rootStack = createStackNavigator();

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
  var access_token = "";
  var socket;
  const [numOfNotification, setNumOfNotification] = useState(0);
  const [unreadNotificationList, setUnreadNotificationList] = useState([]);

  const getUnreadNotification = async () => {
    try {
      console.log("get unread notification");
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
      console.log("read notification");
      if (unreadNotificationList.length > 0)
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
    socketClient.on("notification", (notification) => {
      getUnreadNotification();
      console.log("socket notification app.js");
    });
    return () => {
      socketClient.off('notification');
    };
  }, []);

  useEffect(() => {
    getUnreadNotification();
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
              <Icon
                name="group"
                size={25}
                color={focused ? "#318bfb" : "#ddd"}
              ></Icon>
            ),
            headerShown: true,
          }}
          name="Friend"
          component={FriendTab}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="person"
                size={25}
                color={focused ? "#318bfb" : "#ddd"}
              ></Icon>
            ),
            headerShown: true,
          }}
          name="Profile"
          component={ProfileTab}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="email"
                size={25}
                color={focused ? "#318bfb" : "#ddd"}
              ></Icon>
            ),
          }}
          name="Messenger"
          component={MessengerTab}
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
                {numOfNotification.current > 0 && (
                  <Badge
                    value={numOfNotification.current}
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
            focus: (e) => {
              numOfNotification.current = 0;
            },
          })}
          name="Notification"
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
          <rootStack.Screen component={LoginPage} name="login" />
          <rootStack.Screen component={VerifyEmail} name="verify" />
          <rootStack.Screen component={MainTab} name="facebook" />
          <rootStack.Screen component={ProfileTab} name="pro" />
          <rootStack.Screen component={Profile} name="profile" />
          <rootStack.Screen component={SignupPage} name="signup" />
          <rootStack.Screen component={CreatePost} name="createPost" />
          <rootStack.Screen component={BlockList} name="blockList" />
          <rootStack.Screen component={UpdateProfile} name="updateProfile" />
          {/* <rootStack.Screen component={CommentPage} name="comment" /> */}
          <rootStack.Screen component={UpdateDetail} name="updateDetail" />
          <rootStack.Screen component={Messager} name="messager" />
        </rootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
