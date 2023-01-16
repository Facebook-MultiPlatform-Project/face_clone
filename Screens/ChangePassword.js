import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import Toolbar from "../Components/Toolbar";
import { navigation } from "../rootNavigation";
import { Icon } from "react-native-elements";
import { useState } from "react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [errCurrentPassword, setErrCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errNewPassword, setErrNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    if (currentPassword === "") {
      setErrCurrentPassword("Enter a valid password and try again.");
      setErrNewPassword("");
      setErrConfirmPassword("");
      return false;
    }
    if (newPassword === "") {
      setErrCurrentPassword("");
      setErrNewPassword("Please enter a new password.");
      setErrConfirmPassword("");
      return false;
    }
    if (confirmPassword === "" || newPassword != confirmPassword) {
      setErrCurrentPassword("");
      setErrNewPassword("");
      setErrConfirmPassword(
        "You must enter the same password twice in order to confirm it."
      );
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (validate()) {
      //   setIsSubmitting(true);
      //   const res = loginApi.login(data);
      //   res.then(async (res) => {
      //   });
      //   res.catch((err) => {
      //     console.log("err", err);
      //     setErrNewPassword(err.message);
      //     setIsSubmitting(false);
      //   });
    }
  };

  return (
    <View style={{ backgroundColor: "#FFF", minHeight: "100%" }}>
      <Toolbar title="Change Password"></Toolbar>
      <View style={{ padding: 10 }}>
        <Input
          value={currentPassword}
          onChangeText={(text) => setCurrentPassword(text)}
          placeholder="Current password"
          secureTextEntry={true}
          leftIcon={<Icon name="lock" type="evilicon" />}
          errorStyle={{ color: "red" }}
          errorMessage={errCurrentPassword}
        ></Input>
        <Input
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          placeholder="New password"
          secureTextEntry={true}
          leftIcon={<Icon name="key-outline" type="ionicon" />}
          errorStyle={{ color: "red" }}
          errorMessage={errNewPassword}
        ></Input>
        <Input
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder="Re-type new password"
          secureTextEntry={true}
          leftIcon={<Icon name="key-outline" type="ionicon" />}
          errorStyle={{ color: "red" }}
          errorMessage={errConfirmPassword}
        ></Input>
        <TouchableOpacity
          style={{ backgroundColor: "#05F", borderRadius: 10, padding: 10 }}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text
            style={{
              color: "#FFF",
              fontWeight: "600",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Update password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#ccc",
            borderRadius: 10,
            padding: 10,
            marginTop: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              color: "#333",
              fontWeight: "600",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;
