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
      <Profile />
    </View>
  );
};
const MessengerTab = () => {
  return (
    <View>
      <Text>messengerTab</Text>
    </View>
  );
};
const NotificationTab = () => {
  return (
    <View>
      <Text>notificationTab</Text>
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
    <NavigationContainer ref={navigationRef}>
      <rootStack.Navigator screenOptions={navigationOptions}>
        <rootStack.Screen component={LoginPage} name="login" />
        <rootStack.Screen component={VerifyEmail} name="verify" />
        <rootStack.Screen component={MainTab} name="facebook" />
        <rootStack.Screen component={ProfileTab} name="profile" />
        <rootStack.Screen component={SignupPage} name="signup" />
        <rootStack.Screen component={CreatePost} name="createpost" />
      </rootStack.Navigator>
    </NavigationContainer>
  );
}
