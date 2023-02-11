import { StyleSheet, View, Text } from "react-native";
import CreatePost from "./Screens/CreatePost.js";
import LoginPage from "./Screens/LoginPage.js";
import SignupPage from "./Screens/SignupPage.js";
import * as React from "react";

import { Icon } from "react-native-elements";

import { navigationRef } from "./rootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Header from "./Components/Header";
import VerifyEmail from "./Screens/VerifyEmail.js";
import HomePage from "./Components/HomePage.js";
import Profile from "./Screens/Profile.js";
// import Noti from './Screens/Notifications.js'
// import Friends from './Screens/Friends.js'
import UpdateProfile from "./Screens/UpdateProfile.js";
import BlockList from "./Screens/BlockList.js";

import { Provider } from "react-redux";
import { store } from "./store/store.js";

import Menu from "./Screens/Menu.js";
import CommentPage from "./Screens/Comments.js";
import { useEffect } from "react";
import UpdateDetail from "./Screens/updateDetail";
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
  return (
    <View>
      <Text>friendTab</Text>
    </View>
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
    <View>
      <Text>notificationTab</Text>
    </View>
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
              <Icon
                name="notifications"
                size={25}
                color={focused ? "#318bfb" : "#ddd"}
              ></Icon>
            ),
          }}
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
        </rootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
