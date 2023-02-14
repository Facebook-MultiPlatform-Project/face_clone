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
      <View style={styles.form}>
        <Text style={styles.title}>Đăng ký</Text>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={[styles.form_item, { width: "60%" }]}>
            <Input
              style={styles.input}
              placeholder="Họ"
              value={firstName}
              errorMessage={errFirstName}
              onChangeText={(text) => setFirstName(text)}
            ></Input>
          </View>
          <View style={[styles.form_item, { width: "35%" }]}>
            <Input
              style={styles.input}
              placeholder="Tên"
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
          ></Input>
        </View>
        <View style={styles.form_item}>
          <Input
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            errorMessage={errPassword}
            onChangeText={(text) => setPassword(text)}
            rightIcon={checkHidePass()}
            secureTextEntry={hidePassword}
          ></Input>
        </View>
        <View style={styles.form_item}>
          <Input
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            errorMessage={errConfirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            rightIcon={checkHidePass()}
            secureTextEntry={hidePassword}
          ></Input>
        </View>
        <TouchableOpacity
          disabled={activeSignup}
          style={styles.signup_button}
          onPress={handleSignup}
        >
          <Text style={styles.signup_text}>Đăng ký</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={styles.login}>Đăng nhập</Text>
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
    backgroundColor: "#FFF",
  },
  form: {
    flex: 1,
    marginTop: 120,
    padding: 20,
    backgroundColor: "#FFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#00008B",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 40,
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
    backgroundColor: "#008000",
    padding: 10,
  },
  signup_text: {
    color: "#fff",
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
    alignItems: "center",
    marginTop: 20,
  },
  login: {
    color: "#00008B",
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 5,
  },
});
