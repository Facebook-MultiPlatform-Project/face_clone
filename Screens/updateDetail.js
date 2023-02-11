import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button, Icon, Input } from "react-native-elements";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { parseTime } from "../utils";
import { useEffect } from "react";
import { UserApi } from "../apis/User/UserApi";

const UpdateDetail = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const [gender, setGender] = useState(0);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [birthday, setBirthday] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setBirthday(currentDate);
  };
  const getUserInfo = async () => {
    await UserApi.getInfo(user.id)
      .then((res) => {
        console.log("data", res.data.data);
        const data = res.data.data;
        setName(data.name || "");
        setGender(data.gender);
        setBirthday(
          data.birthday !== "0000-00-00" ? new Date(data.birthday) : new Date()
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateProfile = async () => {
    const data = {
      name,
      gender: gender.toString(),
      birthday,
    };
    await UserApi.updateProfile(data)
      .then((res) => {
        console.log(res.data);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = () => {
    if (name !== "") {
      updateProfile();
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: 40,
          paddingHorizontal: 15,
          paddingBottom: 15,
          borderBottomColor: "#bababa",
          borderBottomWidth: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ marginRight: 10 }}
        >
          <Icon type="material" name="arrow-back"></Icon>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
          }}
        >
          Chỉnh sửa thông tin cá nhân
        </Text>
      </View>
      <View>
        <View>
          <Input
            label="Tên hiển thị"
            value={name}
            onChangeText={(value) => setName(value)}
          ></Input>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, marginRight: 10 }}>Giới tính:</Text>
          <Picker
            selectedValue={gender}
            style={{
              width: 100,
              height: 40,
              borderWidth: 1,
              borderColor: "#000",
            }}
            onValueChange={(itemValue) => {
              setGender(itemValue);
            }}
          >
            <Picker.Item label="Nữ" value={0} />
            <Picker.Item label="Nam" value={1} />
          </Picker>
        </View>
        <View
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, marginRight: 10 }}>Ngày sinh:</Text>
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{
              width: 150,
              height: 30,
              borderColor: "#9c9c9c",
              borderWidth: 1,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 16, lineHeight: 30 }}>
              {parseTime(birthday, "{y}/{m}/{d}")}
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={birthday}
              onChange={onChange}
            />
          )}
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: 40,
            backgroundColor: "#00008B",
            borderRadius: 10,
          }}
          onPress={onSubmit}
        >
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
            Lưu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateDetail;
