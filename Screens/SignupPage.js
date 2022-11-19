import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Icon, Input } from "react-native-elements";

const LoginPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const checkHidePass = () => {
    return hidePassword ? (
      <Icon
        style={styles.icon}
        name="eye-off-outline"
        type="ionicon"
        color="#919194"
        onPress={() => setHidePassword(!hidePassword)}
      ></Icon>
    ) : (
      <Icon
        style={styles.icon}
        name="eye-outline"
        type="ionicon"
        color="#919194"
        onPress={() => setHidePassword(!hidePassword)}
      ></Icon>
    );
  };
  return (
    <View style={styles.container}>
      <View style={[styles.dont_shadow, styles.circle]}></View>
      <View style={[styles.shadow, styles.circle]}></View>
      <View style={styles.form}>
        <Text style={styles.title}>SIGN UP</Text>
        <View style={styles.row}>
          <Icon name="person-outline" type="ionicon" />
          <Text style={{ padding: 4, fontSize: 17 }}>Name</Text>
        </View>
        <View style={[styles.row, { justifyContent: "space-around" }]}>
          <View style={[styles.form_item, { width: "45%" }]}>
            <Input
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            ></Input>
          </View>
          <View style={[styles.form_item, { width: "45%" }]}>
            <Input
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            ></Input>
          </View>
        </View>
        <View style={styles.form_item}>
          <Input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            leftIcon={
              <Icon
                style={styles.icon}
                name="mail-outline"
                type="ionicon"
              ></Icon>
            }
          ></Input>
        </View>
        <View style={styles.form_item}>
          <Input
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            leftIcon={
              <Icon style={styles.icon} name="key" type="ionicon"></Icon>
            }
            rightIcon={checkHidePass()}
            secureTextEntry={hidePassword}
          ></Input>
        </View>
        <View style={styles.form_item}>
          <Input
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            leftIcon={
              <Icon
                style={styles.icon}
                name="checkmark-circle-outline"
                type="ionicon"
              ></Icon>
            }
            rightIcon={checkHidePass()}
            secureTextEntry={hidePassword}
          ></Input>
        </View>
        <TouchableOpacity style={styles.signup_button}>
          <Text style={styles.signup_text}>SIGN UP</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text>Already have an account?</Text>
          <Text style={styles.signup}>SIGN IN</Text>
        </View>
      </View>
      <KeyboardAvoidingView behavior={"position"}></KeyboardAvoidingView>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E7E7E7",
  },
  circle: {
    width: 250,
    height: 250,
    position: "absolute",
    borderRadius: 200,
  },
  dont_shadow: {
    zIndex: 10,
    backgroundColor: "#252F6B",
    top: -180,
    left: 60,
  },
  shadow: {
    zIndex: 9,
    backgroundColor: "#C3CBCF",
    top: -170,
    left: 100,
  },
  form: {
    marginTop: 120,
    padding: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 40,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  row: {
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
  },
  title: {
    color: "#252F6B",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    marginTop: 10,
  },
  form_item: {
    color: "#919194",
    height: 55,
    marginBottom: 2,
  },
  signup_button: {
    marginBottom: 20,
    marginTop: 30,
    borderRadius: 8,
    backgroundColor: "#252F6B",
    padding: 10,
  },
  signup_text: {
    color: "#f5f5f5",
    fontWeight: "600",
    fontSize: 17,
    textAlign: "center",
  },
  forgot: {
    color: "#252F6B",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  signup: {
    color: "#252F6B",
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 5,
  },
});