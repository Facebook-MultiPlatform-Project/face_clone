import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Input } from "react-native-elements";
import { navigation } from "../rootNavigation";
import { verifyApi } from "../apis/Auth/verifyApi";
import Toast from "react-native-toast-message";

const VerifyEmail = ({ route }) => {
  const email = route.params.email;
  const [verifyCode, setVerifyCode] = useState("");
  const [errVerify, setErrVerify] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    if (verifyCode.length < 6) {
      setErrVerify("code must be 6 character");
      return false;
    } else setErrVerify(null);
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsSubmitting(true);
      const data = {
        email,
        verifyCode,
      };
      const res = verifyApi.post(data);
      res
        .then((response) => {
          console.log(response.data);
          Toast.show({
            type: "success",
            text1: "Xác thực thành công!!!",
            visibilityTime: 1000,
          });
          navigation.navigate("login");
        })
        .catch((err) => {
          console.log("verify email", err);
          setErrVerify("err");
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Xác thực tài khoản</Text>
        <View style={styles.form_item}>
          <Input
            style={styles.input}
            placeholder="Mã xác thực"
            value={verifyCode}
            onChangeText={(text) => setVerifyCode(text)}
            keyboardType="numeric"
            maxLength={6}
            secureTextEntry={true}
            errorMessage={errVerify}
          ></Input>
        </View>

        <TouchableOpacity
          disabled={isSubmitting}
          style={styles.login}
          onPress={handleSubmit}
        >
          <Text style={styles.login_text}>Xác thực</Text>
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
    backgroundColor: "#FFF",
  },
  form: {
    marginTop: 200,
    padding: 20,
    backgroundColor: "#fff",
    height: "50%",
  },
  title: {
    // color: "#00008b",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
  },
  form_item: {
    color: "#919194",
  },
  login: {
    marginBottom: 20,
    marginTop: 30,
    borderRadius: 8,
    backgroundColor: "#008000",
    padding: 10,
  },
  login_text: {
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
    marginTop: "auto",
    marginBottom: 20,
  },
});
