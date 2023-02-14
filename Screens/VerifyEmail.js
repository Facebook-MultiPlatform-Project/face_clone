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
import { navigation } from "../rootNavigation";
import { verifyApi } from "../apis/Auth/verifyApi";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [errMail, setErrMail] = useState("");
  const [errVerify, setErrVerify] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    if (email === "") {
      setErrMail("Required");
      if (verifyCode.length < 6) {
        setErrVerify("code must be 6 character");
        return false;
      } else setErrVerify(null);
      return false;
    } else setErrMail(null);
    if (!EMAIL_REGEX.test(email)) {
      setErrMail("Invalid Email");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsSubmitting(true);
      const data = {
        email: email,
        verifyCode: verifyCode,
      };
      const res = verifyApi.post(data);
      res
        .then((response) => {
          console.log(response);
          alert("verify success, please login");
          navigation.navigate("login");
        })
        .catch((err) => {
          console.log('verify email', err)
          setErrVerify("err");
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.circle_top, styles.circle]}></View>
      <View style={[styles.circle_bottom, styles.circle]}></View>
      <View style={[styles.shadow, styles.shadow_top]}></View>
      <View style={[styles.shadow, styles.shadow_bottom]}></View>
      <View style={styles.form}>
        <Text style={styles.title}>Verify Email</Text>
        <View style={styles.form_item}>
          <Input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            errorMessage={errMail}
            leftIcon={
              <Icon
                style={styles.icon}
                name="mail"
                type="ionicon"
                color="#919194"
              ></Icon>
            }
          ></Input>
        </View>
        <View style={styles.form_item}>
          <Input
            style={styles.input}
            placeholder="Verify Code"
            value={verifyCode}
            onChangeText={(text) => setVerifyCode(text)}
            keyboardType="numeric"
            maxLength={6}
            secureTextEntry={true}
            errorMessage={errVerify}
            leftIcon={
              <Icon
                style={styles.icon}
                name="key"
                type="ionicon"
                color="#919194"
              ></Icon>
            }
          ></Input>
        </View>

        <TouchableOpacity
          disabled={isSubmitting}
          style={styles.login}
          onPress={handleSubmit}
        >
          <Text style={styles.login_text}>Verify</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView behavior={"position"}></KeyboardAvoidingView>
    </View>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#E7E7E7",
  },
  circle: {
    zIndex: 10,
    width: 250,
    height: 250,
    position: "absolute",
    borderRadius: 200,
    backgroundColor: "#252F6B",
    shadowColor: "#252F6B",
  },
  shadow: {
    zIndex: 9,
    width: 250,
    height: 250,
    position: "absolute",
    borderRadius: 200,
    backgroundColor: "#C3CBCF",
  },
  circle_bottom: {
    bottom: -150,
    left: 10,
  },
  circle_top: {
    top: -100,
    right: -50,
  },
  shadow_top: {
    top: -80,
    right: -30,
  },
  shadow_bottom: {
    bottom: -130,
    left: 30,
  },
  form: {
    marginTop: 200,
    padding: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 40,
    height: "50%",
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
  title: {
    color: "#252F6B",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 40,
    marginTop: 20,
  },
  form_item: {
    color: "#919194",
  },
  login: {
    marginBottom: 20,
    marginTop: 30,
    borderRadius: 8,
    backgroundColor: "#252F6B",
    padding: 10,
  },
  login_text: {
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
    marginTop: "auto",
    marginBottom: 20,
  },
  signup: {
    color: "#252F6B",
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 5,
  },
});
