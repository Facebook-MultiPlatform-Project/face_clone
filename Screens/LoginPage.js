import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Input } from "react-native-elements";
import { loginApi } from "../apis/Auth/loginApi";
import { EMAIL_REGEX } from "../common/regex";
import { getToken } from "../utils/getToken";
import { navigation } from "../rootNavigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/user";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [width, setWidth] = useState(null);
  const [password, setPassword] = useState("");
  const [errMail, setErrMail] = useState("");
  const [errPass, setErrPass] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setWidth(Dimensions.get("window").width);
  }, []);

  const validate = () => {
    if (email === "") {
      setErrMail("Required");
      if (password === "") {
        setErrPass("Required");
        return false;
      } else setErrPass(null);
      return false;
    } else setErrMail(null);
    if (!EMAIL_REGEX.test(email)) {
      setErrMail("Invalid Email");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (validate()) {
      setIsSubmitting(true);
      const data = {
        email: email,
        password: password,
        uuid: "12312313",
      };
      const res = loginApi.login(data);
      res.then(async (res) => {
        const token = getToken(res.headers["set-cookie"][0]);
        await SecureStore.setItemAsync("access_token", token.access_token);
        await SecureStore.setItemAsync("refresh_token", token.refresh_token);
        await SecureStore.setItemAsync("user_id", res.data.data.user.id);
        dispatch(addUser(res.data.data.user));
        setIsSubmitting(false);
        navigation.navigate("facebook");
      });
      res.catch((err) => {
        console.log("err", err);
        setErrMail(err.message);
        setIsSubmitting(false);
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../assets/imgs/Bg_login.jpg")}
          style={{ width: width, height: 200 }}
        ></Image>
      </View>
      <View style={styles.form}>
        <View style={styles.form_item}>
          <Input
            style={styles.input}
            placeholder="Nhập email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            errorMessage={errMail}
          ></Input>
        </View>
        <View style={styles.form_item}>
          <Input
            style={styles.input}
            placeholder="Nhập mật khẩu"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            errorMessage={errPass}
          ></Input>
        </View>

        <TouchableOpacity
          disabled={isSubmitting}
          style={styles.login}
          onPress={handleSubmit}
        >
          <Text style={styles.login_text}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={styles.forgot}>Quên mật khẩu?</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 30,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 0,
              borderWidth: 1,
              borderColor: "#919194",
            }}
          ></View>
          <Text style={{ color: "#919194", paddingHorizontal: 5 }}>OR</Text>
          <View
            style={{
              flex: 1,
              height: 0,
              borderWidth: 1,
              borderColor: "#919194",
            }}
          ></View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={{ width: "100%", height: "100%", alignItems: "center" }}
            onPress={() => {
              navigation.navigate("signup");
            }}
          >
            <Text style={styles.signup}>Đăng ký</Text>
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
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },

  form: {
    marginTop: 80,
    backgroundColor: "#222222",
    padding: 30,
    backgroundColor: "#fff",
  },

  form_item: {
    color: "#919194",
  },
  login: {
    marginBottom: 20,
    marginTop: 30,
    borderRadius: 8,
    backgroundColor: "#00008B",
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
    backgroundColor: "#008000",
    borderRadius: 8,
    paddingVertical: 10,
  },
  signup: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 5,
  },
});
