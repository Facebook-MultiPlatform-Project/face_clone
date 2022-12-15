import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Icon, Input } from "react-native-elements";
import { EMAIL_REGEX } from "../common/regex";
import { signupApi } from "../apis/Auth/signupApi";
import axios from "axios";
import { navigation } from "../rootNavigation";

const LoginPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");

  const [hidePassword, setHidePassword] = useState(true);
  const [activeSignup, setActiveSignup] = useState(false);

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
  const isValid = () => {
    if (!firstName) {
      setErrFirstName("Required");
    } else {
      setErrFirstName("");
    }
    if (!lastName) {
      setErrLastName("Required");
    } else {
      setErrLastName("");
    }
    if (!email) {
      setErrEmail("Required");
    } else {
      setErrEmail("");
    }
    if (!password) {
      setErrPassword("Required");
    } else {
      setErrPassword("");
    }
    if (!confirmPassword) {
      setErrConfirmPassword("Required");
    } else {
      if (password !== confirmPassword) {
        setErrConfirmPassword("Do not match password");
      } else {
        setErrConfirmPassword("");
      }
    }
    if (!EMAIL_REGEX.test(email)) {
      setErrEmail("Invalid Email");
      return false;
    }
    if (firstName && lastName && email && password && confirmPassword)
      return true;
    else return false;
  };
  const handleSignup = async () => {
    if (isValid()) {
      setActiveSignup(true);
      const name = firstName + " " + lastName;
      const data = {
        email: email,
        name: name,
        password: password,
      };
      console.log(data);
      const res = signupApi.post(data);
      res
        .then((response) => {
          console.log("res:", response.data);
          navigation.navigate("verify");
          setActiveSignup(false);
        })
        .catch((err) => {
          console.log("err:", err);
          setErrConfirmPassword("err network");
          setActiveSignup(false);
        });
    }
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
              errorMessage={errFirstName}
              onChangeText={(text) => setFirstName(text)}
            ></Input>
          </View>
          <View style={[styles.form_item, { width: "45%" }]}>
            <Input
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              errorMessage={errLastName}
              onChangeText={(text) => setLastName(text)}
            ></Input>
          </View>
        </View>
        <View style={styles.form_item}>
          <Input
            style={styles.input}
            placeholder="Email"
            value={email}
            errorMessage={errEmail}
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
            errorMessage={errPassword}
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
            errorMessage={errConfirmPassword}
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
        <TouchableOpacity
          disabled={activeSignup}
          style={styles.signup_button}
          onPress={handleSignup}
        >
          <Text style={styles.signup_text}>SIGN UP</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={styles.signup}>SIGN IN</Text>
          </TouchableOpacity>
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
    marginBottom: 10,
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
