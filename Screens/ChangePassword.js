import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import Toolbar from "../Components/Toolbar";
import { UserApi } from "../apis/User/UserApi";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { changePasswordApi } from "../apis/Auth/changePasswordApi";
import Toast from "react-native-toast-message";

const validationSchema = yup.object().shape({
  currentPassword: yup.string().required(),
  newPassword: yup
    .string()
    .required("Bắt buộc")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu cần tối thiểu 8 ký tự, tối thiểu một ký tự viết hoa, một ký tự thường, một chữ số và một ký tự đặc biệt"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Mật khẩu không khớp"),
});

const InputItem = ({
  name,
  handleChange,
  value,
  placeholder,
  iconName,
  iconType,
  error,
}) => {
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#AAA",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <Icon name={iconName} type={iconType} size={25}></Icon>
        <TextInput
          secureTextEntry={true}
          placeholder={placeholder}
          style={{ flexGrow: 1, marginHorizontal: 10 }}
          onChangeText={handleChange(name)}
          value={value}
        />
      </View>
      {error && <Text style={{ color: "#f00" }}>{error}</Text>}
    </View>
  );
};

const ChangePassword = () => {
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  return (
    <View style={{ backgroundColor: "#FFF", minHeight: "100%" }}>
      <Toolbar title="Đổi mật khẩu"></Toolbar>
      <View style={{ marginTop: 10 }} />
      <View style={{ padding: 10 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          onSubmit={async (values) => {
            try {
              await changePasswordApi.changePassword({
                password: values.currentPassword,
                newPassword: values.newPassword,
              });
              Toast.show({
                type: "success",
                text1: "Đổi mật khẩu thành công!!!",
                visibilityTime: 2000,
              });
            } catch (err) {
              console.log("change password err", err);
              Toast.show({
                type: "success",
                text1: err.response.data.message,
                visibilityTime: 2000,
              });
            }
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View>
              <InputItem
                name="currentPassword"
                handleChange={handleChange}
                value={values.currentPassword}
                iconName="shield"
                iconType="feather"
                placeholder="Mật khẩu hiện tại"
                error={errors.currentPassword}
              />
              <InputItem
                name="newPassword"
                handleChange={handleChange}
                value={values.newPassword}
                iconName="key-outline"
                iconType="ionicon"
                placeholder="Mật khẩu mới"
                error={errors.newPassword}
              />
              <InputItem
                name="confirmPassword"
                handleChange={handleChange}
                value={values.confirmPassword}
                iconName="key-outline"
                iconType="ionicon"
                placeholder="Xác nhận mật khẩu mới"
                error={errors.confirmPassword}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#03F",
                  borderRadius: 10,
                  padding: 10,
                  marginTop: 10,
                }}
                onPress={handleSubmit}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontWeight: "600",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  Cập nhật
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default ChangePassword;
