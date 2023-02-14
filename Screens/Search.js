import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
  StatusBar,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { navigation } from "../rootNavigation";
import { SearchApi } from "../apis/Search/SearchApi";
import Post from "../Components/Post";

const buttonList = [
  { name: "Tất cả", value: 0 },
  { name: "Bài đăng", value: 1 },
  { name: "Người dùng", value: 2 },
];

const Search = () => {
  const [searchInput, setSearchInput] = React.useState("");
  const [searchType, setSearchType] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleChange = (input) => {
    try {
      setSearchInput(input);
    } catch (err) {
      console.log("search err", err);
    }
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log("searchInput", searchInput);
      const res = await SearchApi.search({
        keyword: searchInput,
        searchType: searchType,
        take: 10,
        skip: 0,
      });
      console.log("data", res.data.data);
    } catch (err) {
      console.log("search err", err);
    }
    setIsLoading(false);
  };
  return (
    <View style={{ paddingTop: StatusBar.currentHeight }}>
      <View
        style={{
          paddingBottom: 15,
          borderBottomColor: "#bababa",
          borderBottomWidth: 1,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            paddingTop: 30,
            height: 90,
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
          <TextInput
            placeholder="Tìm kiếm"
            style={{
              borderRadius: 100,
              flex: 1,
              borderWidth: 1,
              borderColor: "#CFCFD5",
              paddingHorizontal: 20,
              paddingVertical: 5,
              marginRight: 15,
            }}
            onChangeText={(text) => handleChange(text)}
            onSubmitEditing={handleSubmit}
            value={searchInput}
          ></TextInput>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {buttonList.map((button) => (
            <TouchableOpacity
              key={button.value}
              style={{
                backgroundColor: searchType === button.value ? "#ccc" : "#fff",
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "#AAA",
                padding: 10,
                marginRight: 6,
              }}
              onPress={() => setSearchType(button.value)}
            >
              <Text
                style={{
                  color: "#333",
                  fontWeight: "600",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                {button.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View
        style={{
          paddingBottom: 15,
        }}
      >
        {isLoading && <Text>Loading...</Text>}
        {!isLoading && <Post />}
      </View>
    </View>
  );
};

export default Search;
